# Jordan Ryan Law, PLLC

**Live: [www.jordanryanlaw.com](https://www.jordanryanlaw.com)**

The professional website for Jordan Ryan Law, PLLC, a Texas commercial real estate law firm. Built as a static-first Astro site: real HTML on the first response for every route, small scoped `<script>` islands for the handful of things that need JavaScript (theme toggle, mobile menu, contact form, scroll-spy), and no client-side framework anywhere.

This codebase started as a rebrand of an earlier Ryan Legal, PC site built the same way — the architecture, design system, and code are shared; content and copy are specific to Jordan Ryan Law.

## What's here

Four pages, one Netlify Function:

- **Home** (`/`) — hero, a by-the-numbers proof band, a practice-area grid, firm vision/mission, and a consultation close.
- **About** (`/about`) — Jordan Ryan's profile: intro, experience, education, and bar admissions & certifications. A sticky side rail on desktop, a collapsible jump-nav on mobile, both scroll-spy-synced to the section currently in view.
- **Contact** (`/contact`) — direct contact details plus a validated, spam-guarded form.
- **Privacy** (`/privacy`) and a branded **404**.

Selected/active section state (the About side rail) is driven by a shared `IntersectionObserver`-based scroll-spy script, not per-page bookkeeping.

## Design system

Navy and stone, sourced directly from the firm's logo, with a muted cobalt/steel accent carrying every interactive state — Archivo for display/headings, Inter for body and UI text. Both a light and dark theme are fully tokenized in `src/styles/global.css`'s `:root` custom properties; the dark-theme closing bands flip to a warm stone-tinted light surface rather than just inverting navy, so dark mode is a genuine second design pass, not an automatic filter.

Every token, spacing scale, and color decision that needed a non-obvious reason (a contrast ratio, a "why this shade and not that one," a cross-browser fallback) has that reasoning written down in place as a code comment — the file reads as a design decision log, not just a values dump.

## Code quality

- **Reusable primitives, not repeated one-offs**: `.archival-table`, `.link-editorial`, `.btn`/`.btn-primary`/`.btn-secondary`, and the shared `.closing-band` (Home/About) all live once in `global.css` and get reused across pages rather than redefined per page.
- **Type-safe throughout** — no `any` escape hatches (the one exception, `JsonLd`'s intentionally-loose type, is commented as such); `astro check` runs clean.
- **A real, purpose-built test suite** — not a token smoke test (see Testing below).
- **Content lives in data, not templates** — credentials, practice areas, and firm facts are typed objects in `src/data/*.ts`, so editing a bio or a firm fact is a data change, never a template edit.

## Stack

- **[Astro](https://astro.build)** (static output) — the interactive bits are small native `<script>` islands under `src/scripts/`, not a client-side app shell.
- **TypeScript** throughout, including the Netlify Function and its tests.
- **[Zod](https://zod.dev)** + **[validator](https://github.com/validatorjs/validator.js)** for contact-form schema validation on the server, since the client never trusts its own input.
- **[Resend](https://resend.com)** for transactional email, called from a single Netlify Function (`netlify/functions/contact.ts`).
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** for sitemap generation; hand-written JSON-LD (`src/lib/json-ld.ts`) rendered server-side, not client-injected, so crawlers see it without executing JS.
- **[Playwright](https://playwright.dev)** for browser tests, **Node's built-in test runner** for the Function's unit tests.
- **ESLint** (`typescript-eslint` + `eslint-plugin-astro`) and **Prettier** (`prettier-plugin-astro`), enforced as part of `npm run build`.

## Testing

Two layers, for two different jobs:

- **`npm run test:unit`** — the contact Netlify Function against Node's built-in test runner. Resend is always injected as a fake (`createHandler`'s `overrides` param); no test can ever send a real email. Covers validation, the honeypot spam-drop path, fail-closed behavior when env vars are missing, and — the one that matters most for a form handling personal contact info — that a provider error or API key never leaks into a response body or a log line.
- **`npm run test:e2e`** — Playwright, run against both Desktop Chrome and Mobile Safari. Covers route smoke tests, navigation (desktop nav and the mobile disclosure menu), JSON-LD shape and correctness per page (canonical-origin `@id`s, no duplicate IDs, Jordan Ryan typed as a `Person` tied to the firm rather than a bare attorney record), and layout specifics that regressed once already (footer-flush spacing, section ordering, active-rail state on click).

## Accessibility

- Every interactive element is keyboard-operable: the mobile menu closes on outside-click, `Escape`, and returns focus to the toggle; About's jump-nav `<details>` collapses before an anchor jump so it never covers the destination heading.
- One shared `:focus-visible` treatment sitewide, with a dedicated on-navy variant (`.on-navy`) so focus rings stay visible against the fixed navy header/footer instead of nearly disappearing against it.
- Semantic HTML first — real `<details>/<summary>`, `<address>`, `<dl>`, and button elements, with native disclosure markers hidden and replaced by one explicit SVG chevron so it renders identically across browsers instead of relying on inconsistent `::marker`/`::-webkit-details-marker` support.
- Contrast is treated as a constraint to satisfy, not a guess — colors that needed to clear WCAG's 3:1 (non-text) or 4.5:1 (text) minimums against a specific surface have that ratio checked and noted at the point of use.
- `prefers-reduced-motion` is honored globally.

## SEO

- **Sitemap**: generated on every `npm run build` via `@astrojs/sitemap`. Production URL: `https://www.jordanryanlaw.com/sitemap-index.xml` (the 404 page is deliberately excluded, and marked `noindex` in its own `<meta>` tag).
- **Structured data**: a single connected JSON-LD `@graph` per page (`LegalService`, `WebSite`, `WebPage`/`AboutPage`/`ContactPage`, and a `Person` entity for Jordan), built from the same typed data as the visible content — never a second, divergent source of truth. Stable `@id` conventions resolve against the production origin only, checked by an end-to-end test against every route.
- Canonical URLs, Open Graph, and Twitter card metadata on every page (`src/layouts/BaseLayout.astro`).

## Security & privacy

- **Spam-guarded contact form**: an off-screen (not `display:none`, which some bots specifically check for) honeypot field. A filled honeypot reports success without ever calling Resend, so a bot gets no signal it was caught.
- **Server-side validation only trusted**: the client-side script gives immediate field feedback, but the Netlify Function re-validates everything with the same Zod schema and fails closed if required env vars aren't configured.
- **Rate limiting** on `/api/contact` (`netlify.toml`) — 3 submissions per IP per 3-minute window.
- **A real CSP**, not just the security-header checkbox items: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and a locked-down `Permissions-Policy`, all in `netlify.toml`.
- No analytics, no advertising or tracking cookies, no third-party scripts of any kind — see `/privacy`.

## Running it locally

Requires Node ^24.0.0 (see `.nvmrc`).

```bash
nvm use
npm install
cp .env.example .env   # fill in RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
npm run dev             # http://localhost:4321
npm run check           # astro check (types + template diagnostics)
npm run lint            # eslint
npm run format          # prettier --check
npm run test            # unit + e2e
npm run build           # production build to dist/
npm run preview         # serve the production build locally
```

## Deployment

Hosted on Netlify as a static site (`netlify.toml`: `npm run build` → publish `dist/`, function directory `netlify/functions`). The contact form is proxied through a Netlify redirect (`/api/contact` → the function), which is also where the rate limit is configured.

**Production domain**: `https://www.jordanryanlaw.com`

**DNS**: Network Solutions is the registrar and remains the authoritative DNS provider — the domain's nameservers were _not_ delegated to Netlify. Records for the site:

| Host  | Type  | Value                       |
| ----- | ----- | --------------------------- |
| `@`   | A     | `75.2.60.5`                 |
| `www` | CNAME | `jordanryanlaw.netlify.app` |

Netlify's primary custom domain is `www.jordanryanlaw.com`; the apex (`jordanryanlaw.com`) redirects to it.

## Project layout

```text
src/
  components/    Astro components — Header, Footer, ContactForm, ThemeToggle
  data/           Firm facts, credentials, practice areas, people — typed content, not markup
  layouts/        BaseLayout.astro — head/meta/JSON-LD, theme-boot script, header/footer shell
  lib/            JSON-LD graph builders
  pages/          Route entry points (index, about, contact, privacy, 404)
  scripts/        Native <script> islands: theme, mobile menu, contact form, scroll-spy
  styles/         global.css — design tokens, base reset, shared component classes
netlify/
  functions/      contact.ts — the one server-side function this site has
tests/
  unit/           Node test runner — the contact Function, Resend always mocked
  *.spec.ts       Playwright — routes, navigation, JSON-LD, layout regressions
```

## About this repository

This is a real client site — copy, credentials, and imagery belong to Jordan Ryan Law, PLLC — shared publicly as a code sample rather than under an open license. If you're a developer or recruiter looking at the code itself: everything under `src/`, `netlify/`, and `tests/` is representative of how it was built and is fair game to read and learn from.
