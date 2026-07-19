// Minimal, native mobile-menu toggle. No framework required.
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
const menu = document.querySelector<HTMLElement>('[data-menu]')

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!isOpen))
    menu.toggleAttribute('data-open', !isOpen)
  })

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) return
    if (toggle.contains(event.target) || menu.contains(event.target)) return
    toggle.setAttribute('aria-expanded', 'false')
    menu.removeAttribute('data-open')
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false')
      menu.removeAttribute('data-open')
      toggle.focus()
    }
  })
}
