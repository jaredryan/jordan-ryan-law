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
