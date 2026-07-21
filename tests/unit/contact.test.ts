// Unit tests for netlify/functions/contact.ts. Runs under Node's built-in
// test runner (`node --test`) — no real network call is ever made: the
// Resend client is always injected as a fake via createHandler's overrides.

import { after, before, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../../netlify/functions/contact.ts'

const VALID_BODY = {
  name: 'Jane Doe',
  phone: '(559) 499-4000',
  email: 'jane@example.com',
  description: 'I have a wage and hour question.',
}

const SECRET_API_KEY = 're_test_should_never_leak_1234567890'

const ORIGINAL_ENV = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
}

function setFullEnv() {
  process.env.RESEND_API_KEY = SECRET_API_KEY
  process.env.CONTACT_TO_EMAIL = 'info@ryanlegalpc.com'
  process.env.CONTACT_FROM_EMAIL = 'info@ryanlegalpc.com'
}

function clearEnv() {
  delete process.env.RESEND_API_KEY
  delete process.env.CONTACT_TO_EMAIL
  delete process.env.CONTACT_FROM_EMAIL
}

function postRequest(body: unknown): Request {
  return new Request('https://example.test/.netlify/functions/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

// Captured across every test so the final "no leakage" assertion can check
// everything ever logged or returned, not just one call.
const capturedConsoleErrors: unknown[][] = []
const capturedResponseBodies: string[] = []
let restoreConsoleError: (() => void) | undefined

before(() => {
  const original = console.error
  console.error = (...args: unknown[]) => {
    capturedConsoleErrors.push(args)
  }
  restoreConsoleError = () => {
    console.error = original
  }
})

after(() => {
  restoreConsoleError?.()
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

beforeEach(() => {
  clearEnv()
})

async function readBody(response: Response): Promise<{ status: number; body: unknown; raw: string }> {
  const raw = await response.text()
  capturedResponseBodies.push(raw)
  return { status: response.status, body: raw ? JSON.parse(raw) : undefined, raw }
}

test('GET (unsupported method) returns 405', async () => {
  const handler = createHandler()
  const response = await handler(new Request('https://example.test/x', { method: 'GET' }))
  const { status, body } = await readBody(response)
  assert.equal(status, 405)
  assert.equal((body as { ok: boolean }).ok, false)
})

test('malformed JSON body returns 400', async () => {
  const handler = createHandler()
  const response = await handler(postRequest('{not valid json'))
  const { status, body } = await readBody(response)
  assert.equal(status, 400)
  assert.equal((body as { message: string }).message, 'Invalid request body.')
})

test('missing fields return existing field errors', async () => {
  const handler = createHandler()
  const response = await handler(postRequest({}))
  const { status, body } = await readBody(response)
  assert.equal(status, 400)
  const errors = (body as { errors: Record<string, string[]> }).errors
  assert.ok(errors.name?.length)
  assert.ok(errors.phone?.length)
  assert.ok(errors.email?.length)
  assert.ok(errors.description?.length)
})

test('invalid email returns the correct field error', async () => {
  const handler = createHandler()
  const response = await handler(postRequest({ ...VALID_BODY, email: 'not-an-email' }))
  const { status, body } = await readBody(response)
  assert.equal(status, 400)
  const errors = (body as { errors: Record<string, string[]> }).errors
  assert.ok(errors.email?.some((message) => message.includes('valid email')))
})

test('a filled honeypot field is silently dropped as spam', async () => {
  setFullEnv()
  let called = false
  const handler = createHandler({
    createClient: () => ({
      send: async () => {
        called = true
        return { data: { id: 'unused' }, error: null }
      },
    }),
  })
  const response = await handler(postRequest({ ...VALID_BODY, company: 'Acme Bot Co' }))
  const { status, body } = await readBody(response)
  assert.equal(status, 200)
  assert.deepEqual(body, { ok: true })
  assert.equal(called, false, 'the email client must never be invoked when the honeypot is filled')
})

test('missing Resend configuration fails closed', async () => {
  let called = false
  const handler = createHandler({
    createClient: () => ({
      send: async () => {
        called = true
        return { data: { id: 'unused' }, error: null }
      },
    }),
  })
  const response = await handler(postRequest(VALID_BODY))
  const { status, body } = await readBody(response)
  assert.equal(status, 500)
  assert.equal((body as { message: string }).message, 'The contact form is temporarily unavailable. Please call or email us directly.')
  assert.equal(called, false, 'the email client must never be invoked when required config is missing')
})

test('a successful mocked Resend response returns success', async () => {
  setFullEnv()
  const sendCalls: unknown[] = []
  const handler = createHandler({
    createClient: (apiKey) => {
      assert.equal(apiKey, SECRET_API_KEY)
      return {
        send: async (payload) => {
          sendCalls.push(payload)
          return { data: { id: 'email_123' }, error: null }
        },
      }
    },
  })
  const response = await handler(postRequest(VALID_BODY))
  const { status, body } = await readBody(response)
  assert.equal(status, 200)
  assert.deepEqual(body, { ok: true })
  assert.equal(sendCalls.length, 1)
})

test('a mocked Resend provider error returns the generic temporary-unavailable response', async () => {
  setFullEnv()
  const handler = createHandler({
    createClient: () => ({
      send: async () => ({ data: null, error: { message: 'Domain not verified', name: 'validation_error' } }),
    }),
  })
  const response = await handler(postRequest(VALID_BODY))
  const { status, body, raw } = await readBody(response)
  assert.equal(status, 502)
  const message = (body as { message: string }).message
  assert.equal(message, 'We could not send your message right now. Please try again shortly or call us directly.')
  assert.ok(!raw.includes('Domain not verified'), 'provider error detail must not reach the browser')
  assert.ok(!raw.includes('validation_error'), 'provider error name must not reach the browser')
})

test('the visitor address is passed as replyTo', async () => {
  setFullEnv()
  let captured: { replyTo: string } | undefined
  const handler = createHandler({
    createClient: () => ({
      send: async (payload) => {
        captured = payload as { replyTo: string }
        return { data: { id: 'email_123' }, error: null }
      },
    }),
  })
  await handler(postRequest(VALID_BODY))
  assert.equal(captured?.replyTo, VALID_BODY.email)
})

test('the fixed verified sender is used as from', async () => {
  setFullEnv()
  process.env.CONTACT_FROM_EMAIL = 'info@ryanlegalpc.com'
  let captured: { from: string } | undefined
  const handler = createHandler({
    createClient: () => ({
      send: async (payload) => {
        captured = payload as { from: string }
        return { data: { id: 'email_123' }, error: null }
      },
    }),
  })
  await handler(postRequest(VALID_BODY))
  assert.equal(captured?.from, 'Ryan Legal, PC Website <info@ryanlegalpc.com>')
  // The visitor never controls the sender address.
  assert.ok(!captured?.from.includes(VALID_BODY.email))
})

test('the recipient comes from CONTACT_TO_EMAIL', async () => {
  setFullEnv()
  process.env.CONTACT_TO_EMAIL = 'someone-else@ryanlegalpc.com'
  let captured: { to: string } | undefined
  const handler = createHandler({
    createClient: () => ({
      send: async (payload) => {
        captured = payload as { to: string }
        return { data: { id: 'email_123' }, error: null }
      },
    }),
  })
  await handler(postRequest(VALID_BODY))
  assert.equal(captured?.to, 'someone-else@ryanlegalpc.com')
})

test('no API key appears in browser output or captured logs', () => {
  for (const raw of capturedResponseBodies) {
    assert.ok(!raw.includes(SECRET_API_KEY), `response body leaked the API key: ${raw}`)
  }
  for (const args of capturedConsoleErrors) {
    const serialized = args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')
    assert.ok(!serialized.includes(SECRET_API_KEY), `console.error leaked the API key: ${serialized}`)
  }
})
