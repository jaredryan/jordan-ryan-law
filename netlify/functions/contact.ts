// Netlify Function (modern fetch-style API): accepts a web-standard Request,
// returns a web-standard Response. Rebuilt from the old Next.js Server
// Action — same validation rules and SendGrid template, see
// docs/legacy-content-inventory.md for what changed and why.

import sgMail from '@sendgrid/mail'
import validator from 'validator'
import { z } from 'zod'

const SENDGRID_TEMPLATE_ID = 'd-f0a05944301b4a1d8ef0f727f0a0191f'
const FROM_ADDRESS = 'info@ryanlegalpc.com'

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

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req: Request): Promise<Response> {
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

  const apiKey = process.env.SENDGRID_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !toEmail) {
    if (!apiKey) console.error('Contact form submitted, but SENDGRID_API_KEY is not configured.')
    if (!toEmail) console.error('Contact form submitted, but CONTACT_TO_EMAIL is not configured.')
    return jsonResponse({ ok: false, message: 'The contact form is temporarily unavailable. Please call or email us directly.' }, 500)
  }

  const { name, phone, email, description } = parsed.data

  try {
    sgMail.setApiKey(apiKey)
    await sgMail.send({
      to: toEmail,
      from: FROM_ADDRESS,
      replyTo: email,
      subject: 'Consultation Request from Ryan Legal Website',
      templateId: SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: { name, phone, email, description },
    })

    return jsonResponse({ ok: true }, 200)
  } catch (error) {
    // Log the detail server-side only — never forward SendGrid's internal
    // error body to the visitor.
    console.error('SendGrid error while sending contact form email:', error)
    return jsonResponse({ ok: false, message: 'We could not send your message right now. Please try again shortly or call us directly.' }, 502)
  }
}
