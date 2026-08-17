// Right-side drawer nav. No framework required.
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
const drawer = document.querySelector<HTMLElement>('[data-menu]')
const backdrop = document.querySelector<HTMLElement>('[data-menu-backdrop]')
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]')

if (toggle && drawer && backdrop) {
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true')
    drawer.removeAttribute('inert')
    drawer.setAttribute('data-open', '')
    backdrop.setAttribute('data-open', '')
    document.body.style.overflow = 'hidden'
    drawer.querySelector<HTMLElement>(focusableSelector)?.focus()
  }

  const close = (returnFocus = true) => {
    toggle.setAttribute('aria-expanded', 'false')
    drawer.removeAttribute('data-open')
    backdrop.removeAttribute('data-open')
    drawer.setAttribute('inert', '')
    document.body.style.overflow = ''
    if (returnFocus) toggle.focus()
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      close()
    } else {
      open()
    }
  })

  closeBtn?.addEventListener('click', () => close())
  backdrop.addEventListener('click', () => close())

  document.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return

    if (event.key === 'Escape') {
      close()
      return
    }

    if (event.key === 'Tab') {
      const focusables = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector))
      const first = focusables.at(0)
      const last = focusables.at(-1)
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })
}
