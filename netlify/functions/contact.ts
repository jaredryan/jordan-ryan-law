// Netlify Function (modern fetch-style API): accepts a web-standard Request,
// returns a web-standard Response. Sends through Resend — see
// docs/legacy-content-inventory.md for the SendGrid -> Resend migration.

import { Resend } from 'resend'
import validator from 'validator'
import { z } from 'zod'

const SENDER_DISPLAY_NAME = 'Ryan Legal, PC Website'

const ContactSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  phone: z
    .string()
    .min(1, 'Please enter your phone number.')
    .refine((value) => validator.isMobilePhone(value, 'en-US'), 'Please enter a valid phone number.'),
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .refine((value) => validator.isEmail(value), 'Please enter a valid email.'),
  description: z.string().min(1, 'Please tell us about your concern.'),
})

type ContactFields = z.infer<typeof ContactSchema>

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildTextBody({ name, phone, email, description }: ContactFields): string {
  return [
    'New consultation request from the Ryan Legal, PC website.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    '',
    'Message:',
    description,
  ].join('\n')
}

function buildHtmlBody({ name, phone, email, description }: ContactFields): string {
  return [
    '<p>New consultation request from the Ryan Legal, PC website.</p>',
    '<ul>',
    `<li><strong>Name:</strong> ${escapeHtml(name)}</li>`,
    `<li><strong>Phone:</strong> ${escapeHtml(phone)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(email)}</li>`,
    '</ul>',
    '<p><strong>Message:</strong></p>',
    `<p>${escapeHtml(description).replace(/\n/g, '<br />')}</p>`,
  ].join('')
}

// Minimal surface of the Resend SDK's Emails client that this handler
// depends on, so tests can inject a fake without mocking the module.
interface EmailSendResult {
  data: { id: string } | null
  error: { message: string; name?: string } | null
}
interface EmailClient {
  send(payload: {
    from: string
    to: string
    replyTo: string
    subject: string
    text: string
    html: string
  }): Promise<EmailSendResult>
}

export function createHandler(
  overrides: { createClient?: (apiKey: string) => EmailClient } = {},
): (req: Request) => Promise<Response> {
  const createClient = overrides.createClient ?? ((apiKey: string) => new Resend(apiKey).emails)

  return async function handler(req: Request): Promise<Response> {
    if (req.method !== 'POST') {
      return jsonResponse({ ok: false, message: 'Method not allowed.' }, 405)
    }

    let payload: unknown
    try {
      payload = await req.json()
    } catch {
      return jsonResponse({ ok: false, message: 'Invalid request body.' }, 400)
    }

    const parsed = ContactSchema.safeParse(payload)
    if (!parsed.success) {
      return jsonResponse({ ok: false, errors: z.flattenError(parsed.error).fieldErrors }, 400)
    }

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL
    if (!apiKey || !toEmail || !fromEmail) {
      if (!apiKey) console.error('Contact form submitted, but RESEND_API_KEY is not configured.')
      if (!toEmail) console.error('Contact form submitted, but CONTACT_TO_EMAIL is not configured.')
      if (!fromEmail) console.error('Contact form submitted, but CONTACT_FROM_EMAIL is not configured.')
      return jsonResponse({ ok: false, message: 'The contact form is temporarily unavailable. Please call or email us directly.' }, 500)
    }

    const fields = parsed.data

    try {
      const client = createClient(apiKey)
      const { error } = await client.send({
        from: `${SENDER_DISPLAY_NAME} <${fromEmail}>`,
        to: toEmail,
        replyTo: fields.email,
        subject: 'New Consultation Request — Ryan Legal, PC Website',
        text: buildTextBody(fields),
        html: buildHtmlBody(fields),
      })

      if (error) {
        // Log the detail server-side only — never forward Resend's internal
        // error body to the visitor.
        console.error('Resend error while sending contact form email:', error)
        return jsonResponse({ ok: false, message: 'We could not send your message right now. Please try again shortly or call us directly.' }, 502)
      }

      return jsonResponse({ ok: true }, 200)
    } catch (error) {
      console.error('Unexpected error while sending contact form email via Resend:', error)
      return jsonResponse({ ok: false, message: 'We could not send your message right now. Please try again shortly or call us directly.' }, 502)
    }
  }
}

export default createHandler()
