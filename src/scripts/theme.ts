// Theme toggle controller. The FOUC-safe initial theme is already set on
// <html data-theme> by the inline boot script in BaseLayout.astro before
// this module loads — this file only handles the click interaction and
// keeps every [data-theme-toggle] button on the page (header + mobile menu
// each render one) in sync with the current theme.

const STORAGE_KEY = 'theme'

function currentTheme(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function syncToggleButtons(theme: 'light' | 'dark') {
  const isDark = theme === 'dark'
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(isDark))
    const label = button.querySelector('[data-theme-toggle-label]')
    if (label) label.textContent = isDark ? 'Dark' : 'Light'
    const sr = button.querySelector('[data-theme-toggle-sr]')
    if (sr) sr.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme'
  })
}

function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Explicit preference just won't persist across visits — the page
    // still reflects the choice for this session.
  }
  syncToggleButtons(theme)
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark')
  })
})

syncToggleButtons(currentTheme())
