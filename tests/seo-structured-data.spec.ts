import { expect, test } from '@playwright/test'

const routes = ['/', '/about', '/contact']

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

test('About: Jordan Ryan is a Person tied to the LegalService firm entity, not a bare attorney record', async ({
  page,
}) => {
  await page.goto('/about')
  const graph = await readGraph(page)

  const jordan = graph.find((e) => e.name === 'Jordan Ryan')
  expect(jordan, 'Jordan Ryan entity not found in About page graph').toBeTruthy()
  expect(jordan?.['@type']).toBe('Person')
  expect(jordan?.jobTitle).toBe('Founder and Owner')
  expect(jordan?.worksFor).toMatchObject({ '@id': expect.stringContaining('#JordanRyanLaw') })

  const firm = graph.find((e) => e['@type'] === 'LegalService')
  expect(firm, 'expected the LegalService firm entity on About (mentioned via jordanRyanId)').toBeFalsy()
})

test('Home: LegalService firm entity references Jordan Ryan as founder', async ({ page }) => {
  await page.goto('/')
  const graph = await readGraph(page)

  const firm = graph.find((e) => e['@type'] === 'LegalService')
  expect(firm, 'expected a LegalService entity on Home').toBeTruthy()
  expect(firm?.name).toBe('Jordan Ryan Law, PLLC')
  expect(firm?.founder).toMatchObject({ '@id': expect.stringContaining('/about#JordanRyan') })
})

test('404: is marked noindex and emits no JSON-LD', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0)
})
