## Ryan Legal PC

This is the professional website for Ryan Legal, PC, a Professional Corporation.

The intended purpose is to create an online presence for business credibility. The site isn't expected to generate leads, but to give anyone more additional information about Ryan Legal, PC, before moving forward. It also provides an easy way to reach out.

The site is live at [https://ryanlegalpc.com](https://ryanlegalpc.com).

### Stack

Static [Astro](https://astro.build) site, deployed to Netlify, with a single Netlify Function (`netlify/functions/contact.ts`) handling the contact form via [Resend](https://resend.com). No client-side framework — interactivity is handled with small native scripts under `src/scripts/`.

This is currently a **foundation rebuild**: content, routes, and metadata are preserved from the previous Next.js implementation (see `docs/legacy-content-inventory.md`), but the visual design is an intentionally minimal placeholder shell. The approved visual redesign (see the design-phase deliverables in the repo root) has not been implemented yet.

### Development

```bash
nvm use          # Node 24, see .nvmrc
npm install
cp .env.example .env   # fill in RESEND_API_KEY, etc.
npm run dev
```

### Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (static output to `dist/`)
- `npm run preview` — preview the production build
- `npm run check` — Astro + TypeScript type checking
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm run test:unit` — unit tests for the contact Netlify Function (Node's built-in test runner, Resend mocked — never sends real email)
- `npm run test:e2e` — Playwright smoke tests
- `npm test` — both of the above

### SEO

- **Sitemap**: generated automatically on every `npm run build` by the `@astrojs/sitemap` integration (`astro.config.mjs`). Production URL to submit to Google Search Console / Bing Webmaster Tools: **`https://ryanlegalpc.com/sitemap-index.xml`**. It's an index file pointing at `sitemap-0.xml` (the 5 indexable pages — `/404` is deliberately excluded). `public/robots.txt` already references this same URL, so nothing else needs to change if/when Search Console is set up.
- Structured data (JSON-LD) and canonical/OG/Twitter metadata are documented in detail in `docs/legacy-content-inventory.md`, under "Structured-data & technical SEO pass".
