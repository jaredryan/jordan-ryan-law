# URL / Indexing Consistency Audit — jordan-ryan-law

Date: 2026-08-21
Branch: `main`
Canonical production host (confirmed against repo config + live HTTP behavior): **`https://www.jordanryanlaw.com/`**

## Canonical domain confirmation

The task brief's starting assumption (`https://jordanryanlaw.netlify.app/` as current canonical) was superseded mid-audit by an explicit correction: the live production/canonical domain is `https://www.jordanryanlaw.com/`. Before any edits were made, the repo's own configuration already agreed with the corrected domain, confirmed independently:

- `astro.config.mjs` → `site: process.env.SITE_URL || 'https://www.jordanryanlaw.com'`
- `src/data/site.ts` → `siteUrl = import.meta.env.SITE_URL || 'https://www.jordanryanlaw.com'`
- `public/robots.txt` → `Sitemap: https://www.jordanryanlaw.com/sitemap-index.xml`
- Recent commit `7b3b22a`: "Update code with new live domain now that I'm using his official domain, https://jordanryanlaw.com"

Live HTTP checks corroborate this is the real, working production host (not just repo config):

| URL                                 | Result                                                                                  |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `https://www.jordanryanlaw.com`     | 200                                                                                     |
| `https://jordanryanlaw.com`         | 301 → `https://www.jordanryanlaw.com/`                                                  |
| `https://jordanryanlaw.netlify.app` | 200 (Netlify's default subdomain is still live as an alias, not the intended canonical) |

**No netlify.app references existed anywhere in the source tree at any point in this audit** — the only place `jordanryanlaw.netlify.app` appeared was in a stale local `dist/` build artifact (gitignored, not committed) that had been built previously with a `SITE_URL` env override. That directory is build output, not source, and required no fix. All edits below use `https://www.jordanryanlaw.com` consistently; nothing needed to be cleaned up from a netlify.app assumption because no such edit was ever made.

## Issue found: trailing-slash mismatch (same pattern as personal-portfolio)

**Root cause:** Astro's static `output: 'static'` build always emits each route as a directory (`about/index.html`), so Netlify's static file server 301-redirects the slashless form to the trailing-slash form. But `trailingSlash` was unset in `astro.config.mjs` (Astro default: `'ignore'`), and all internal `path`/`href` values were hand-authored slashless (`/about`, `/contact`, `/privacy`).

Live confirmation before the fix:

| Request                                   | Result                                           |
| ----------------------------------------- | ------------------------------------------------ |
| `https://www.jordanryanlaw.com/about`     | 301 → `https://www.jordanryanlaw.com/about/`     |
| `https://www.jordanryanlaw.com/about/`    | 200                                              |
| `https://jordanryanlaw.netlify.app/about` | 301 → `https://jordanryanlaw.netlify.app/about/` |

Result: **every internal nav link, CTA, footer link, canonical tag, and JSON-LD URL pointed at the slashless form**, while:

- `@astrojs/sitemap` emitted trailing-slash URLs (`/about/`, `/contact/`, `/privacy/`) — matching Astro's actual build output paths.
- Netlify's server 301-redirected every slashless internal link to the trailing-slash form on every click and on every crawl.

So sitemap URLs and final resolved URLs used the trailing-slash form, while canonical tags, structured data, and every clickable internal link used the slashless form and forced an unnecessary redirect hop — the same pattern found in `personal-portfolio`.

## Fix applied: `trailingSlash: 'always'`

Set explicitly in `astro.config.mjs`, and every internal path/link updated to the trailing-slash form so canonical tags, sitemap, structured data, and clicked links all agree with zero redirect hops.

### Files changed

- **`astro.config.mjs`** — added `trailingSlash: 'always'`.
- **`src/data/site.ts`** — `navLinks` hrefs: `/about` → `/about/`, `/contact` → `/contact/`.
- **`src/lib/json-ld.ts`** — `jordanRyanId` (`${siteUrl}/about#JordanRyan` → `${siteUrl}/about/#JordanRyan`) and `jordanRyanPersonJsonLd().url` (`${siteUrl}/about` → `${siteUrl}/about/`) now match the About page's actual canonical URL. (`firmId`/`websiteId` were left untouched — they're root-level `@id` anchors, not page URLs, so they weren't part of the trailing-slash inconsistency.)
- **`src/pages/about.astro`** — `path` prop, `webPageJsonLd` path, breadcrumb path, and two internal `/contact` links → trailing-slash form.
- **`src/pages/contact.astro`** — `path` prop, `webPageJsonLd` path, breadcrumb path → trailing-slash form.
- **`src/pages/privacy.astro`** — `path` prop, `webPageJsonLd` path, breadcrumb path, and internal `/contact` link → trailing-slash form.
- **`src/pages/index.astro`** — internal `/about` and `/contact` links (hero + closing CTA) → trailing-slash form.
- **`src/components/Header.astro`** — both `/contact` CTA links (desktop + mobile drawer) → trailing-slash form. (`isCurrent()`'s `startsWith` comparison already works correctly with either form — untouched.)
- **`src/components/Footer.astro`** — `/contact` and `/privacy` links → trailing-slash form.
- **`src/components/ContactForm.astro`** — `/privacy` link in the disclaimer text → trailing-slash form.
- **`netlify.toml`** — removed the `/contact-us` → `/contact` redirect entirely (per owner: stale leftover from the `ryan-legal-pc` codebase this site was bootstrapped from; this site never had a `/contact-us` page or link).
- **`public/robots.txt`** — `Allow` directives updated to trailing-slash form (`/about/`, `/contact/`, `/privacy/`) for consistency with the canonical/sitemap form. Functionally these were already permissive either way (robots.txt `Allow` matches by prefix), so this is a consistency/cleanliness fix, not a behavior change.

### Not changed, and why

- **`/404`** (`src/pages/404.astro`) — left as `path="/404"`. Astro's reserved `404.astro`/`500.astro` filenames build to a flat `404.html`/`500.html` regardless of the `trailingSlash` setting (a hosting-fallback convention, not a normal route), and the page is already `noindex` with a real HTTP 404 status, so it carries no indexing signal to normalize.
- **`firmId`/`websiteId`** in `json-ld.ts` — these are `@id` identifiers for entities that don't correspond 1:1 with a fetchable page path (the firm and the website-as-a-whole), so they aren't part of the page-URL trailing-slash inconsistency this audit targets.
- Domain, page content, visual design, SEO copy, and unrelated routing (the `/api/contact` function redirect, security headers) — untouched, per scope.

## Live-behavior re-check (post-fix expectation)

With `trailingSlash: 'always'`, Astro will generate canonical tags, JSON-LD `url` values, and `og:url`/`twitter:image`-adjacent absolute URLs from `path` props that now already carry the trailing slash — so `new URL(path, siteUrl)` in `BaseLayout.astro` (unchanged, no edit needed there) will produce trailing-slash canonical/OG URLs matching the sitemap and the (now trailing-slash) internal links, with no redirect hop from an internal click. This wasn't re-verified against a live deploy (out of scope: no build/deploy was run per the task's constraints) — recommend a post-deploy spot check of `curl -sI https://www.jordanryanlaw.com/about/` (expect `200`, no redirect) and a diff of the rebuilt `dist/sitemap-0.xml` / `dist/robots.txt` against `public/robots.txt` once `SITE_URL` is unset or set correctly for the real deploy.

## Explicitly out of scope / unchanged

- Playwright, automated tests, and `npm run build` were not run, per instructions.
- No git inspection or commit/push commands were run, per standing policy — the owner reviews and commits these changes directly.
