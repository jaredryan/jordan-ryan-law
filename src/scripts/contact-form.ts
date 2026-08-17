// Minimal, native contact-form handling. No framework required.
//
// Talks to netlify/functions/contact.ts via the /api/contact redirect
// (see netlify.toml). Response contract:
//   200 { ok: true }
//   400 { ok: false, errors: { [field]: string[] } }
//   4xx/5xx { ok: false, message: string }

export {}

interface ContactErrorResponse {
  ok: false
  errors?: Record<string, string[]>
  message?: string
}

interface ContactSuccessResponse {
  ok: true
}

const form = document.querySelector<HTMLFormElement>('#contact-form')
const submitButton = document.querySelector<HTMLButtonElement>('#contact-submit')
const status = document.querySelector<HTMLParagraphElement>('#contact-status')

const fieldNames = ['name', 'phone', 'email', 'description'] as const

function clearErrors() {
  for (const field of fieldNames) {
    const input = form?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${field}`)
    const errorEl = form?.querySelector<HTMLParagraphElement>(`#${field}-error`)
    input?.removeAttribute('aria-invalid')
    if (errorEl) {
      errorEl.hidden = true
      errorEl.textContent = ''
    }
  }
}

function showFieldErrors(errors: Record<string, string[]>) {
  for (const field of fieldNames) {
    const messages = errors[field]
    if (!messages || messages.length === 0) continue
    const input = form?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${field}`)
    const errorEl = form?.querySelector<HTMLParagraphElement>(`#${field}-error`)
    input?.setAttribute('aria-invalid', 'true')
    if (errorEl) {
      errorEl.hidden = false
      errorEl.textContent = messages[0] ?? ''
    }
  }
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!submitButton || !status) return

  clearErrors()
  submitButton.disabled = true
  submitButton.textContent = 'Sending…'
  status.dataset.state = ''
  status.textContent = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
    })

    const data = (await response.json()) as ContactSuccessResponse | ContactErrorResponse

    if (response.ok && data.ok) {
      status.dataset.state = 'success'
      status.textContent = 'Thank you — your message has been sent. We will be in touch soon.'
      form.reset()
    } else if (!data.ok && data.errors) {
      showFieldErrors(data.errors)
      status.dataset.state = 'error'
      status.textContent = 'Please fix the highlighted fields and try again.'
    } else {
      status.dataset.state = 'error'
      status.textContent = (!data.ok && data.message) || 'Something went wrong. Please try again shortly.'
    }
  } catch {
    status.dataset.state = 'error'
    status.textContent = 'Something went wrong. Please check your connection and try again.'
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Submit'
  }
})
