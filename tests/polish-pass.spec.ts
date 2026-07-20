import { expect, test } from '@playwright/test'

test('Home: quote is final (no draft flag), consultation band and footer brand mark render', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('blockquote')).toContainText('The best measure of my work is that clients stay')
  await expect(page.getByText(/draft quotation/i)).toHaveCount(0)

  const closeSection = page.locator('.close-section')
  await expect(closeSection).toBeVisible()
  await expect(closeSection.getByRole('heading', { name: 'Request a Consultation' })).toBeVisible()
  await expect(closeSection.getByRole('link', { name: 'Get in touch' })).toBeVisible()

  await expect(page.locator('.site-footer__brand-mark')).toHaveAttribute('src', '/footer-logo-white.webp')
})

test('Home: footer sits flush against the consultation band (no margin gap)', async ({ page }) => {
  await page.goto('/')
  const gap = await page.evaluate(() => {
    const close = document.querySelector('.close-section')
    const footer = document.querySelector('.site-footer')
    if (!close || !footer) return null
    return footer.getBoundingClientRect().top - close.getBoundingClientRect().bottom
  })
  expect(gap).toBe(0)
})

test('Header brand mark uses logo-white.webp', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-header__brand-mark')).toHaveAttribute('src', '/logo-white.webp')
})

test('About: waiting-room photo break sits between Crystal and Litigation Record', async ({ page }) => {
  await page.goto('/about')
  const figure = page.locator('.about-photo-break')
  await expect(figure).toBeVisible()
  await expect(figure.locator('img')).toHaveAttribute('src', '/waiting-room.webp')

  const order = await page.evaluate(() => {
    const crystal = document.getElementById('crystal')
    const photo = document.querySelector('.about-photo-break')
    const record = document.getElementById('litigation-record')
    if (!crystal || !photo || !record) return null
    const pos = crystal.compareDocumentPosition(photo)
    const pos2 = photo.compareDocumentPosition(record)
    return {
      photoAfterCrystal: !!(pos & Node.DOCUMENT_POSITION_FOLLOWING),
      recordAfterPhoto: !!(pos2 & Node.DOCUMENT_POSITION_FOLLOWING),
    }
  })
  expect(order).toEqual({ photoAfterCrystal: true, recordAfterPhoto: true })
})

test('404 page shows the branded compact layout', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  await expect(page.getByText('The page may have moved, or the address may be incorrect.')).toBeVisible()
  const homeLink = page.getByRole('link', { name: 'Return Home' })
  await expect(homeLink).toBeVisible()
  await expect(page.locator('.notfound__mark--light')).toHaveAttribute('src', '/r-mark-transparent.webp')
  await expect(page.locator('.notfound__mark--light')).toBeVisible()
  await expect(page.locator('.notfound__mark--dark')).toHaveAttribute('src', '/r-mark-transparent-on-dark.webp')
  await expect(page.locator('.notfound__mark--dark')).toBeHidden()

  await homeLink.focus()
  await expect(homeLink).toBeFocused()
})

test('404 page footer sits flush against the compact content (no margin gap)', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  const gap = await page.evaluate(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('.site-footer')
    if (!main || !footer) return null
    return footer.getBoundingClientRect().top - main.getBoundingClientRect().bottom
  })
  expect(gap).toBe(0)
})

test('Footer/header brand links expose correct accessible names, About applies the narrow measure to prose sections only', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('footer').getByRole('link', { name: 'Ryan Legal, PC — Home', exact: true })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: 'Ryan Legal, PC', exact: true })).toBeVisible()

  await page.goto('/about')
  // Training (prose) and the Bar Admissions subgroup (short one-column list) should be capped narrow;
  // Credentials (multi-column grid) and Court Admissions (multi-column list) should stay at the wide editorial measure.
  const trainingMaxWidth = await page.locator('#training').evaluate((el) => getComputedStyle(el).maxWidth)
  const credentialsMaxWidth = await page.locator('#credentials').evaluate((el) => getComputedStyle(el).maxWidth)
  const courtAdmissionsHeading = page.locator('#admissions h3', { hasText: 'Court Admissions' })
  const courtAdmissionsMaxWidth = await courtAdmissionsHeading.evaluate((el) => getComputedStyle(el).maxWidth)
  expect(trainingMaxWidth).not.toBe('none')
  expect(credentialsMaxWidth).toBe('none')
  expect(courtAdmissionsMaxWidth).toBe('none')
})

test('Header/footer decorative marks use alt="", and on-navy focus rings resolve to gold in both themes', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-header__brand-mark')).toHaveAttribute('alt', '')
  await expect(page.locator('.site-footer__brand-mark')).toHaveAttribute('alt', '')

  const GOLD = 'rgb(253, 182, 19)'
  const headerBrand = page.locator('header').getByRole('link', { name: 'Ryan Legal, PC', exact: true })
  const footerCta = page.locator('footer').getByRole('link', { name: 'Schedule a Consultation' })

  // Light theme: the sitewide default --focus-ring is dark navy (near-invisible on the
  // navy header/footer) — .on-navy must override it to gold, including on the gold CTA button.
  await headerBrand.focus()
  await expect(headerBrand).toHaveCSS('outline-color', GOLD)
  await footerCta.focus()
  await expect(footerCta).toHaveCSS('outline-color', GOLD)

  // Dark theme's sitewide default is already gold, so on-navy should still resolve to the same gold.
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  })
  await headerBrand.focus()
  await expect(headerBrand).toHaveCSS('outline-color', GOLD)
})

test('Keyboard reaches the header brand link right after the skip link', async ({ page, browserName }) => {
  // WebKit doesn't include plain links in the default Tab order (matches real
  // Safari's "Full Keyboard Access" default) — this is a browser/engine
  // difference to work around in the test, not a site bug. The mobile-emulated
  // "Mobile Safari" project uses this engine and isn't Tab-key-driven anyway.
  test.skip(browserName === 'webkit', 'WebKit does not Tab to plain links by default')
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('header').getByRole('link', { name: 'Ryan Legal, PC', exact: true })).toBeFocused()
})

test('Every footer link is individually focusable', async ({ page }) => {
  await page.goto('/')
  const footerLinks = page.locator('footer a')
  const count = await footerLinks.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i++) {
    await footerLinks.nth(i).focus()
    await expect(footerLinks.nth(i)).toBeFocused()
  }
})

test('Mobile menu: Escape closes it and returns focus to the toggle button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.locator('[data-menu-toggle]')
  const nav = page.locator('[data-menu]')

  await toggle.click()
  await expect(nav).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(toggle).toBeFocused()
})

test('Consultation section is not .on-navy and uses its own theme-aware focus color', async ({ page }) => {
  await page.goto('/')
  const closeSection = page.locator('.close-section')
  await expect(closeSection).not.toHaveClass(/on-navy/)

  const cta = closeSection.getByRole('link', { name: 'Get in touch' })
  await cta.focus()
  await expect(cta).toHaveCSS('outline-color', 'rgb(237, 235, 227)') // ivory, light-theme gold button on navy

  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  })
  await cta.focus()
  await expect(cta).toHaveCSS('outline-color', 'rgb(138, 90, 0)') // gold-ink, dark-theme navy button on ivory
})

test('Home practice-area links underline correctly, including a wrapped title', async ({ page }) => {
  await page.goto('/')
  const singleLine = page.locator('.practice-grid__item h3 a', { hasText: 'Health Care' })
  const wrapped = page.locator('.practice-grid__item h3 a', { hasText: 'Business Transactions and Finance' })

  for (const link of [singleLine, wrapped]) {
    await expect(link).toHaveCSS('text-decoration-line', 'underline')
    // Default state: underline is present but transparent (no layout-affecting property changes on hover/focus).
    const restColor = await link.evaluate((el) => getComputedStyle(el).textDecorationColor)
    expect(restColor).toBe('rgba(0, 0, 0, 0)')
    await link.focus()
    await expect(link).toHaveCSS('text-decoration-color', 'rgb(253, 182, 19)')
  }
})

test('Expertise page H1 reads "Areas of Practice" while the navbar keeps "Expertise"', async ({ page }) => {
  await page.goto('/expertise')
  await expect(page.locator('h1')).toHaveText('Areas of Practice')
  // A plain DOM/text locator rather than getByRole: at mobile widths the nav
  // (both the desktop bar and the closed disclosure menu) is display:none,
  // which removes it from the accessibility tree entirely — getByRole would
  // report "not found" there even though the label text itself is unaffected.
  await expect(page.locator('header a[href="/expertise"]').first()).toHaveText('Expertise')
})
