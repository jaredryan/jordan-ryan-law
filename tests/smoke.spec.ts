import { expect, test } from '@playwright/test'

const routes: { path: string; heading: string }[] = [
  { path: '/', heading: 'Direct access to one attorney' },
  { path: '/expertise', heading: 'Where Ryan Legal focuses' },
  { path: '/about', heading: 'Russell K. Ryan' },
  { path: '/contact', heading: 'Start with a conversation' },
  { path: '/payment', heading: 'LawPay' },
]

for (const route of routes) {
  test(`${route.path} loads with no console errors`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })

    const response = await page.goto(route.path)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator('h1')).toContainText(route.heading)
    expect(consoleErrors).toEqual([])
  })
}

test('404 page renders for an unknown route', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toContainText('Page not found')
})

test('primary navigation reaches every page', async ({ page }) => {
  await page.goto('/')
  const menuToggle = page.locator('[data-menu-toggle]')

  for (const route of routes.slice(1)) {
    // On narrow viewports the wide-bar nav is hidden entirely and replaced
    // by the mobile disclosure nav (two separate DOM trees, not one nav
    // repositioned by CSS) — open the toggle and use whichever is visible.
    if (await menuToggle.isVisible()) {
      await menuToggle.click()
    }
    // Scope to <header> so the (always-visible-by-CSS-definition) footer
    // link with the same href never satisfies the :visible filter instead.
    const link = page.locator('header').locator(`a[href="${route.path}"]:visible`).first()
    await link.click()
    await expect(page).toHaveURL(new RegExp(`${route.path}$`))
  }
})

test('contact form renders required fields (no submission — avoid sending real email)', async ({ page }) => {
  await page.goto('/contact')
  for (const field of ['name', 'phone', 'email', 'description']) {
    await expect(page.locator(`#${field}`)).toBeVisible()
  }
  await expect(page.locator('#contact-submit')).toBeVisible()
})

test('mobile menu toggles the primary nav', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.locator('[data-menu-toggle]')
  const nav = page.locator('[data-menu]')

  await expect(toggle).toBeVisible()
  await expect(nav).toBeHidden()

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(nav).toBeVisible()
})
