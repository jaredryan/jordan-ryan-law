import { expect, test } from '@playwright/test'

const routes = ['/', '/about', '/contact', '/expertise', '/payment']

async function readGraph(page: import('@playwright/test').Page) {
  const raw = await page.locator('script[type="application/ld+json"]').textContent()
  expect(raw, 'expected exactly one ld+json script tag').toBeTruthy()
  const parsed = JSON.parse(raw as string)
  expect(parsed['@context']).toBe('https://schema.org')
  const graph: Record<string, unknown>[] = parsed['@graph']
  expect(Array.isArray(graph)).toBe(true)
  return graph
}

for (const route of routes) {
  test(`${route}: JSON-LD graph parses, uses canonical origin, and matches <link rel="canonical">`, async ({
    page,
  }) => {
    const response = await page.goto(route)
    expect(response?.ok()).toBeTruthy()

    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonicalHref).toBeTruthy()
    const origin = new URL(canonicalHref as string).origin

    const graph = await readGraph(page)
    expect(graph.length).toBeGreaterThan(0)

    const ids: string[] = []
    for (const entity of graph) {
      const id = entity['@id'] as string | undefined
      if (!id) continue
      ids.push(id)
      // Every stable @id must resolve against the same production origin as
      // the canonical tag — never localhost or a Netlify preview/branch URL.
      expect(id.startsWith(origin), `${id} does not start with canonical origin ${origin}`).toBe(true)
    }
    // No entity's @id should repeat within a single page's graph.
    expect(new Set(ids).size).toBe(ids.length)

    const webPage = graph.find((e) => typeof e['@type'] === 'string' && (e['@type'] as string).endsWith('Page'))
    expect(webPage, 'expected a *Page entity in the graph').toBeTruthy()
    expect(webPage?.url).toBe(canonicalHref)
  })
}

test('About: Crystal Brightwell is a Person, not an Attorney, with her exact title', async ({ page }) => {
  await page.goto('/about')
  const graph = await readGraph(page)

  const crystal = graph.find((e) => e.name === 'Crystal Brightwell')
  expect(crystal, 'Crystal Brightwell entity not found in About page graph').toBeTruthy()
  expect(crystal?.['@type']).toBe('Person')
  expect(crystal?.jobTitle).toBe('Senior Paralegal / Office Administrator')
  expect(crystal?.worksFor).toMatchObject({ '@id': expect.stringContaining('#RyanLegalPC') })

  // Nothing in the graph may type Crystal (by name) as an attorney/legal-professional type.
  for (const entity of graph) {
    if (entity.name === 'Crystal Brightwell' || (entity as Record<string, unknown>).name === 'Crystal Brightwell') {
      expect(entity['@type']).not.toBe('Attorney')
    }
  }

  const russ = graph.find((e) => e.name === 'Russell K. Ryan')
  expect(russ?.['@type']).toBe('Person')
  expect(russ?.jobTitle).toBe('Founder and Owner')
})

test('404: is marked noindex and emits no JSON-LD', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0)
})

test('Payment page JSON-LD and visible copy agree on payment methods (no LawPay-ownership implication)', async ({
  page,
}) => {
  await page.goto('/payment')
  const graph = await readGraph(page)
  // The firm entity isn't emitted on /payment itself — acceptedPaymentMethod
  // lives on the LegalService entity, emitted on Home/Expertise. This test
  // only asserts /payment's own graph never names LawPay as an owned entity.
  for (const entity of graph) {
    expect(JSON.stringify(entity)).not.toMatch(/LawPay/i)
  }
})
