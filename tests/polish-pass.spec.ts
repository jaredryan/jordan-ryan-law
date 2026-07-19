import { expect, test } from '@playwright/test'

test('Home: quote is final (no draft flag), consultation band and footer brand mark render', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('blockquote')).toContainText('The best measure of my work is that clients stay')
  await expect(page.getByText(/draft quotation/i)).toHaveCount(0)

  const closeSection = page.locator('.close-section')
  await expect(closeSection).toBeVisible()
  await expect(closeSection.getByRole('heading', { name: 'Request a Consultation' })).toBeVisible()
  await expect(closeSection.getByRole('link', { name: 'Get in touch' })).toBeVisible()

  await expect(page.locator('.site-footer__brand-mark')).toHaveAttribute('src', '/full-logo-white.webp')
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
  await expect(page.locator('.notfound__mark')).toHaveAttribute('src', '/icon.svg')

  await homeLink.focus()
  await expect(homeLink).toBeFocused()
})
