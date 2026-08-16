import { expect, test } from '@playwright/test'

test('Home: consultation band and footer brand mark render', async ({ page }) => {
  await page.goto('/')
  const closeSection = page.locator('.closing-band')
  await expect(closeSection).toBeVisible()
  await expect(
    closeSection.getByRole('heading', { name: 'Move your next transaction forward with confidence.' }),
  ).toBeVisible()
  await expect(closeSection.getByRole('link', { name: 'Request a consultation' })).toBeVisible()

  await expect(page.locator('.site-footer__brand-mark')).toHaveAttribute('src', '/footer-logo-white-300.webp')
})

test('Home: footer sits flush against the consultation band (no margin gap)', async ({ page }) => {
  await page.goto('/')
  const gap = await page.evaluate(() => {
    const close = document.querySelector('.closing-band')
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

test('Footer/header brand links expose correct accessible names', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.locator('footer').getByRole('link', { name: 'Jordan Ryan Law, PLLC — Home', exact: true }),
  ).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: 'Jordan Ryan Law, PLLC', exact: true })).toBeVisible()
})

test('Header/footer decorative marks use alt=""', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-header__brand-mark')).toHaveAttribute('alt', '')
  await expect(page.locator('.site-footer__brand-mark')).toHaveAttribute('alt', '')
})

test('On-navy focus rings resolve to the lighter steel accent in both themes', async ({ page }) => {
  await page.goto('/')

  // Light theme: the sitewide default --focus-ring (base accent) only reaches
  // ~2.4:1 against the fixed navy header/footer — .on-navy must override it
  // to the lighter --accent-on-navy shade, including on the filled CTA button.
  const headerBrand = page.locator('header').getByRole('link', { name: 'Jordan Ryan Law, PLLC', exact: true })
  const footerCta = page.locator('footer').getByRole('link', { name: 'Schedule a Consultation' })
  await headerBrand.focus()
  await expect(headerBrand).toHaveCSS('outline-color', 'rgb(77, 125, 196)') // --accent-on-navy
  await footerCta.focus()
  await expect(footerCta).toHaveCSS('outline-color', 'rgb(247, 245, 239)') // --nav-footer-text, avoids ring-on-button same-hue blur

  // Dark theme: --accent-on-navy resolves to the same lightened --accent used
  // sitewide there, since that shade already clears contrast against navy.
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  })
  await headerBrand.focus()
  await expect(headerBrand).toHaveCSS('outline-color', 'rgb(111, 151, 214)') // dark-theme --accent
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
  await expect(page.locator('header').getByRole('link', { name: 'Jordan Ryan Law, PLLC', exact: true })).toBeFocused()
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

test('About: section-nav rail active-state updates on click', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/about')
  const railLinks = page.locator('.section-nav-rail a')
  await expect(railLinks).toHaveCount(4)
  await expect(railLinks.first()).toHaveAttribute('aria-current', 'location')
  await railLinks.nth(2).click()
  await expect(railLinks.nth(2)).toHaveAttribute('aria-current', 'location')
  await expect(railLinks.first()).not.toHaveAttribute('aria-current', 'location')
})

test('Home and About closing bands: flush footer, correct CTA copy, and excluded from the rail/scroll-spy', async ({
  page,
}) => {
  const ctaLabel = (path: string) => (path === '/' ? 'Request a consultation' : 'Talk with Jordan')
  for (const path of ['/', '/about']) {
    await page.goto(path)
    const band = page.locator('.closing-band')
    await expect(band).toBeVisible()
    const cta = band.getByRole('link', { name: ctaLabel(path) })
    await expect(cta).toHaveAttribute('href', '/contact')

    const gap = await page.evaluate(() => {
      const closing = document.querySelector('.closing-band')
      const footer = document.querySelector('.site-footer')
      if (!closing || !footer) return null
      return footer.getBoundingClientRect().top - closing.getBoundingClientRect().bottom
    })
    expect(gap).toBe(0)

    // The closing band carries no id, so scroll-spy (which only ever tracks
    // ids referenced by a `.section-nav-rail a[href="#..."]` link) has
    // nothing to observe there.
    await expect(band).not.toHaveAttribute('id', /.+/)
  }

  // About's rail still lists exactly its 4 original sections (no extra item for the band).
  await page.goto('/about')
  await expect(page.locator('.section-nav-rail li')).toHaveCount(4)
})

test("Closing-band CTA focus rings use the theme-aware band-focus color, not the on-navy pattern", async ({
  page,
}) => {
  const ctaLabel = (path: string) => (path === '/' ? 'Request a consultation' : 'Talk with Jordan')
  for (const path of ['/', '/about']) {
    await page.goto(path)
    const band = page.locator('.closing-band')
    await expect(band).not.toHaveClass(/on-navy/)

    // Reset explicitly — localStorage persists across goto() within a test.
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    })
    const cta = band.getByRole('link', { name: ctaLabel(path) })
    await cta.focus()
    await expect(cta).toHaveCSS('outline-color', 'rgb(247, 245, 239)') // --nav-footer-text, light theme's navy band

    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    })
    await cta.focus()
    await expect(cta).toHaveCSS('outline-color', 'rgb(92, 94, 84)') // light-theme stone-ink, dark theme's flipped light band
  }
})

test('Contact info column carries the eyebrow and stays visually distinct from the form', async ({ page }) => {
  await page.goto('/contact')
  const info = page.locator('.contact-main__info')
  await expect(info.locator('.eyebrow')).toHaveText('Reach us directly')
  await expect(page.getByRole('heading', { level: 2, name: 'Send a message' })).toBeVisible()
})

test('Home: practice areas render as static (non-interactive) tiles, not links', async ({ page }) => {
  await page.goto('/')
  const items = page.locator('.practice-grid__item')
  await expect(items).toHaveCount(6)
  await expect(items.first().locator('.practice-grid__rule')).toBeVisible()

  const names = await items.locator('h3').allTextContents()
  expect(names).toEqual([
    'Acquisition & Disposition',
    'Leasing',
    'Real Estate Finance',
    'Due Diligence',
    'Entity Formation & Joint Ventures',
    'Development',
  ])

  // No per-area detail page exists yet — these are deliberately plain text,
  // never rendered as links.
  await expect(items.locator('a')).toHaveCount(0)
})

test('Proof strip: fix regression guard — no supporting description carries a restrictive max-width', async ({
  page,
}) => {
  await page.goto('/')
  const items = [
    { value: 'Former Chief Legal Officer', label: 'National industrial & multifamily developer' },
    { value: '$60M', label: 'Construction financing transaction' },
    { value: 'Board Certified', label: 'Commercial Real Estate Law — Texas' },
    { value: '4M+ Sq. Ft.', label: 'Industrial & office leases negotiated' },
  ]
  const figures = page.locator('.proof-figure')
  await expect(figures).toHaveCount(4)

  for (const [i, item] of items.entries()) {
    const figure = figures.nth(i)
    await expect(figure.locator('.proof-figure__value')).toHaveText(item.value)
    const label = figure.locator('.proof-figure__label')
    await expect(label).toHaveText(item.label)
    // The regression this guards against: an old fixed max-width (16ch/28ch)
    // made the supporting descriptions wrap far narrower than their column.
    expect(await label.evaluate((el) => getComputedStyle(el).maxWidth)).toBe('none')
  }
})

test('Home Values & Mission holds up at phone, tablet, and desktop widths, with no horizontal overflow', async ({
  page,
}) => {
  const viewports = [
    { width: 375, height: 812 }, // phone
    { width: 900, height: 1000 }, // tablet
    { width: 1280, height: 900 }, // desktop
  ]

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    const valuesMission = page.locator('.values-mission')
    await expect(valuesMission.getByRole('heading', { name: 'Our Mission' })).toBeVisible()
    const paragraphs = valuesMission.locator('.values-mission__columns p')
    await expect(paragraphs).toHaveCount(1)
    await expect(paragraphs.first()).toContainText('chief legal officer for a national industrial')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width)
  }
})
