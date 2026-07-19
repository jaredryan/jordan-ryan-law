## Ryan Legal PC

This is the professional website for Ryan Legal, PC, a Professional Corporation.

The intended purpose is to create an online presence for business credibility. The site isn't expected to generate leads, but to give anyone more additional information about Ryan Legal, PC, before moving forward. It also provides an easy way to reach out.

The site is live at [https://ryanlegalpc.com](https://ryanlegalpc.com).

### Stack

Static [Astro](https://astro.build) site, deployed to Netlify, with a single Netlify Function (`netlify/functions/contact.ts`) handling the contact form via SendGrid. No client-side framework — interactivity is handled with small native scripts under `src/scripts/`.

This is currently a **foundation rebuild**: content, routes, and metadata are preserved from the previous Next.js implementation (see `docs/legacy-content-inventory.md`), but the visual design is an intentionally minimal placeholder shell. The approved visual redesign (see the design-phase deliverables in the repo root) has not been implemented yet.

### Development

```bash
nvm use          # Node 24, see .nvmrc
npm install
cp .env.example .env   # fill in SENDGRID_API_KEY, etc.
npm run dev
```

### Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (static output to `dist/`)
- `npm run preview` — preview the production build
- `npm run check` — Astro + TypeScript type checking
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm test` — Playwright smoke tests
