# Jordan Ryan Law — Code & SEO Audit

Full-repository audit for stale Ryan Legal, PC remnants, code-quality cleanup, and SEO
correctness, following the Phase 1 content rebrand (`96e89ee`) and social-image
regeneration (`f040303`). No visual/design changes were made — this pass is
correctness and cleanup only.

## Initial findings

### Ryan Legal, PC remnants (branding/SEO-affecting)

- **`public/robots.txt`** — `Allow:` list still included the deleted `/expertise`
  and `/payment` routes, and `Sitemap:` pointed at `https://ryanlegalpc.com/sitemap-index.xml`
  — the wrong firm's domain entirely.
- **`src/pages/404.astro`** — rendered `/r-mark-transparent.webp` and
  `/r-mark-transparent-on-dark.webp`, the old Ryan Legal, PC navy/gold "R" logo
  mark (confirmed by opening the files: a navy R with a gold star/swoosh, the
  exact palette described in the pre-rebrand design-audit doc). This is a real
  logo mismatch — every other page uses the current "JR" monogram
  (`logo-white.webp`, `icon.png`, etc.), but the 404 page was still showing the
  previous firm's mark.
- **`src/layouts/BaseLayout.astro`** — emitted `<meta property="fb:app_id" content="553360804417837">`
  on every page. No evidence this Facebook App ID belongs to Jordan Ryan Law;
  it's an inherited, unverifiable value from the prior build.
- **`scripts/generate-social-images.mjs`** — the OG/Twitter-image generator was
  both brand-stale _and_ functionally broken:
  - Hardcoded `"Fresno, California"` as the locale label and a positioning
    statement about "employers, health care providers, and nonprofits
    throughout California" (Ryan Legal's practice areas/location).
  - Comment referred to "Russ's portrait" and "Ryan Legal, PC" lockup sizing.
  - Loaded font files from `@fontsource/libre-baskerville` and
    `@fontsource-variable/source-sans-3` — **neither package is in
    `package.json`/`node_modules`**. Running this script today would throw
    `ENOENT` immediately. The current site's typography is Archivo/Inter, and
    old brand colors `#1e275e`/`#fdb613` (navy/gold) don't match the current
    tokens (`#1e263b` navy, `#a7a99f` stone) either.
  - The actually-committed `public/opengraph-image.png`/`twitter-image.png`
    are already correct (verified by opening them — Jordan Ryan Law branding,
    correct positioning copy, Jordan's portrait), so this was a **silent
    landmine**: the images are fine today, but the checked-in regeneration
    script would have overwritten them with broken/wrong-firm output the next
    time anyone ran it.
- **`README.md`** — three stale spots: a Testing-section reference to "Crystal
  Brightwell never typed as an `Attorney`" (a Ryan Legal PC staff member with
  no current-codebase test coverage at all), a Code-quality bullet listing
  `.multi-column-list`/`.proof-callout` as reused primitives (both dead CSS —
  see below) and `.closing-band (Expertise/About)` (Expertise route is
  deleted), and — the largest one — the entire **Design system** section
  describing "Navy, gold, and ivory, with Libre Baskerville... over Source
  Sans 3," which is the _previous_ palette/type pairing. The live
  `global.css` header comment plainly documents the actual 2026-08-16 system:
  navy/stone with a cobalt/steel accent, Archivo/Inter.
- Several stale code comments referencing the deleted `/expertise` and
  `/payment` routes in `src/styles/global.css`, `src/scripts/scroll-spy.ts`,
  `src/components/SectionNav.astro`, and `src/pages/contact.astro`.

### SEO issues

- `robots.txt` sitemap host pointed at Ryan Legal's domain (see above) —
  would have misdirected crawlers entirely away from Jordan Ryan Law's actual
  sitemap.
- `robots.txt` allow-listed two 404ing routes.
- Unverified `fb:app_id` on every page (see above).
- Titles, descriptions, canonicals, OG/Twitter tags, and JSON-LD were
  otherwise already correct and Jordan-Ryan-Law-specific across `/`, `/about`,
  `/contact`, and `/privacy` — see Verification below for what was checked.

### Code-quality issues

- **Dead CSS in `src/styles/global.css`**: `.tag-list`/`.tag-list li`,
  `.proof-callout`/`__label`/`__body`, and `.multi-column-list`/`li` had zero
  references anywhere in `src/pages` or `src/components` — leftover
  primitives from Ryan Legal's client-roster/award-badge content, which
  Jordan Ryan Law's site doesn't have. `.section-rule` and the generic `.rule`
  class were also unreferenced.
- **Dead CSS in `src/pages/index.astro`**: `.hero__rule` was defined (base +
  a mobile-breakpoint override) but never applied to any element in the hero
  markup.
- **Dead component variant in `src/components/SectionNav.astro`**: the
  `density: 'compact' | 'roomy'` prop existed specifically to cover About's
  and the deleted Expertise page's differing rail styles. With Expertise
  gone, `roomy` had exactly zero call sites — About is the component's only
  consumer, always with `density="compact"`.
- **Broken tests** (would fail if run against current code):
  - `tests/unit/contact.test.ts` asserted the outbound email's `from` name as
    `'Ryan Legal, PC Website <...>'`, but `netlify/functions/contact.ts`'s
    actual `SENDER_DISPLAY_NAME` constant is `'Jordan Ryan Law, PLLC Website'`.
  - `tests/smoke.spec.ts` expected the `/contact` page's `<h1>` to read
    `'Start a conversation'`; the actual current heading is `'Discuss your
legal needs'`.
  - `tests/polish-pass.spec.ts` asserted the 404 mark's `src` against the old
    Ryan Legal filenames, and checked for a `.practice-grid__rule` element
    that doesn't exist in the current practice-grid markup (which uses an SVG
    icon instead).

### Asset/config issues

- No unused/duplicate image assets found in `public/` beyond what's already
  documented as cleaned up in `docs/legacy-content-inventory.md` — every
  currently-referenced file exists, and the only genuinely stale _asset_ was
  the 404 page's Ryan Legal logo reference (a code reference to an existing
  file, not an orphaned file — `r-mark-transparent.webp` and its `-on-dark`
  sibling are still present in `public/` but are now unreferenced by any page;
  see "Items intentionally left alone").
- `@astrojs/sitemap` already auto-excludes `404`/`500` status-code pages
  (confirmed by reading the installed package's source,
  `node_modules/@astrojs/sitemap/dist/index.js`), so no sitemap misconfiguration
  existed there.

## Changes implemented

### Branding/content cleanup

- `public/robots.txt` — removed `/expertise` and `/payment`; fixed the
  `Sitemap:` line to `https://jordanryanlaw.netlify.app/sitemap-index.xml`.
- `src/pages/404.astro` — replaced the two Ryan Legal "R" mark `<img>`s (and
  their light/dark-swap CSS) with a single `/icon.png` (the current JR mark,
  already used as the favicon/apple-touch-icon, self-contained on its own
  navy background so no theme-conditional swap is needed).
- `src/layouts/BaseLayout.astro` — removed the unverified `fb:app_id` meta tag.
- `scripts/generate-social-images.mjs` — fixed the broken font imports to
  point at the packages actually installed (`@fontsource-variable/archivo`,
  `@fontsource-variable/inter`, matching `BaseLayout.astro`'s own font
  imports); replaced the hardcoded Ryan Legal copy with data pulled from
  `src/data/site.ts` (`businessSlogan`, `address.city`/`address.state`); swapped
  the old navy/gold palette (`#1e275e`/`#fdb613`) for the current tokens
  (`#1e263b`/`#a7a99f`); updated the header comment. Documented in the
  script's own comment that its composition (footer-logo lockup + full-bleed
  portrait) still differs from the currently-shipped images' newer "JR
  monogram + bracket-framed portrait" composition — this pass fixed
  correctness and made the script runnable again, not a redesign of its
  layout (see "Remaining blockers" below).
- `README.md` — fixed the stale Crystal Brightwell test-suite reference, the
  Design System section (now accurately describes navy/stone/cobalt-steel +
  Archivo/Inter), the Code Quality bullet's dead-CSS-class list and
  `(Expertise/About)` mention, an accessibility bullet's "About/Expertise
  jump-nav" mention, and a "client lists" reference to a `src/data/clients.ts`
  file that no longer exists in this codebase.

### Code cleanup

- `src/styles/global.css` — removed `.tag-list`, `.proof-callout`,
  `.multi-column-list` (and their sub-selectors and `+ h3`/`+ h4` combinator
  entries), `.section-rule`, and the generic `.rule` class — all confirmed
  zero-reference dead CSS. Fixed stale comments referencing the deleted
  `/payment` route and `/expertise` page (scrollbar-gutter rationale,
  `<details>` marker comment, closing-band section header, page-hero
  centering comment).
- `src/pages/index.astro` — removed the dead `.hero__rule` rule (base +
  mobile override); never applied to any markup.
- `src/pages/contact.astro` — fixed a comment referencing the deleted
  `/payment` page.
- `src/components/SectionNav.astro` — removed the unused `density: 'roomy'`
  variant and its CSS block (dead since Expertise was deleted); the
  component now always renders the one style About actually uses. Updated
  the file's top comment to describe current (About-only) usage instead of
  "About and Expertise."
- `src/pages/about.astro` — dropped the now-removed `density="compact"` prop
  from its `<SectionNav>` call.
- `src/scripts/scroll-spy.ts` — updated two comments referencing "Expertise"
  to describe the current About-only usage.

### SEO/meta

- Covered under "Branding/content cleanup" above (`robots.txt`, `fb:app_id`).
- Verified (no changes needed): every indexable route (`/`, `/about`,
  `/contact`, `/privacy`) has a unique `<title>`, unique meta description,
  correct canonical via `siteUrl` (`src/data/site.ts`, no localhost/Ryan Legal
  leakage), and correct OG/Twitter tags pointing at the current
  Jordan-Ryan-Law-branded `opengraph-image.png`/`twitter-image.png`.

### Structured data

- Verified (no changes needed): `src/lib/json-ld.ts` already uses the current
  `LegalService` type (not the deprecated `Attorney` type) for the firm, and
  a separate `Person` entity for Jordan, tied together via `founder`/`worksFor`
  `@id` references rather than duplicated data. No fabricated ratings,
  reviews, awards, price ranges, or opening hours. `certifications`-derived
  `award` values are real (Board Certification), not invented.

### Sitemap/indexing

- `robots.txt` fix above. Confirmed `@astrojs/sitemap`'s built-in exclusion of
  `404`/`500` pages is active (no custom filter was ever needed).

### Assets

- No files removed — see "Items intentionally left alone" for the now-orphaned
  R-mark webp files.

### Tests/verification

- `tests/unit/contact.test.ts` — fixed the `from` sender-name assertion to
  match the current `SENDER_DISPLAY_NAME` constant.
- `tests/smoke.spec.ts` — fixed the `/contact` heading expectation to match
  the current `<h1>`.
- `tests/polish-pass.spec.ts` — updated the 404-mark assertions to the new
  single-icon markup; replaced the nonexistent `.practice-grid__rule`
  assertion with a check on the icon that's actually rendered
  (`.practice-grid__icon`).

## Items intentionally left alone

- **`docs/legacy-content-inventory.md`, `docs/design-audit-2026-07-22.md`,
  `docs/lawpay-embed-feasibility.md`** — all three are explicitly labeled
  internal migration/audit records (not public copy, not part of the built
  site), documenting the pre-rebrand Ryan Legal, PC site and its Next.js→Astro
  migration history. They're full of Russ/Crystal/Fresno/LawPay content by
  design — that's the historical record they exist to preserve. None of the
  three affect any built/served output. `lawpay-embed-feasibility.md`
  specifically covers a route (`/payment`) that no longer exists for Jordan
  Ryan Law at all; flagged here as a candidate for deletion if the owner wants
  the docs folder trimmed, but not removed unilaterally since it's pure
  documentation with no runtime effect.
- **`public/r-mark-transparent.webp` and `public/r-mark-transparent-on-dark.webp`**
  — now unreferenced by any page after the 404 fix above. Not deleted this
  pass: per instruction, assets are only removed once confirmed unused, and
  while these are now confirmed unused _in code_, leaving the actual file
  deletion to the owner avoids compounding an already-large diff with a
  destructive action on files that cost nothing to leave in place. Recommend
  deleting both in a follow-up commit.
- **`netlify.toml`'s `/contact-us` → `/contact` redirect** — originated for
  Ryan Legal's own contact-us→contact migration. Kept because it's harmless
  (an unused path 301-ing to the real page — no Ryan Legal branding, no
  incorrect output) and because removing it has no measurable benefit.
- **`global.css`'s "original warm Ryan Legal-style parchment" comment** — this
  is legitimate design-rationale documentation (explaining _why_ the current
  cooler palette was chosen, as a deliberate departure from the prior warm
  tone), not a stale remnant. Left as-is.
- **`tests/unit/contact.test.ts`'s fixture data** (`(559) 499-4000`,
  `ryanlegalpc.com` email addresses) — these are arbitrary fake test input
  values, not assertions about firm branding; changing them has no
  correctness benefit. Only the one assertion that checked _against the
  implementation's own branding constant_ was a real bug (fixed above).
- **Hero eyebrow "Dallas - Fort Worth, TX" vs. the firm's McKinney, TX
  office address** — McKinney is part of the DFW metro area, so this reads as
  a deliberate broader-market framing choice rather than a factual error. Not
  changed, since this is existing Jordan Ryan Law content (not a Ryan Legal
  remnant) and altering it would be a content/positioning decision outside
  this pass's scope — flagged for owner awareness only.

## Remaining blockers / manual follow-up

- **`scripts/generate-social-images.mjs` composition mismatch** — the script
  is now functional and brand-correct, but its layout (a large logo lockup +
  full-bleed side portrait) doesn't reproduce the currently-shipped OG/Twitter
  images' actual "JR monogram + bracket-framed portrait" composition, which
  appears to have been produced by a separate/manual process. If the owner
  ever needs to regenerate these images and wants pixel continuity with the
  current look, the script's HTML/CSS composition needs a design pass first —
  this was out of scope for a correctness-only audit.
- **Orphaned Ryan Legal logo files** — recommend deleting
  `public/r-mark-transparent.webp` and `public/r-mark-transparent-on-dark.webp`
  now that nothing references them.
- **`docs/lawpay-embed-feasibility.md`** — covers a route/feature (`/payment`,
  LawPay) with zero relevance to the current site; consider deleting if the
  `docs/` folder should reflect only Jordan Ryan Law history going forward.
- Everything else found was fixed in this pass; no other unresolved items.

## Verification results

**Automated verification (`npm run check`/`lint`/`build`/`test`) was not run
in this session** — this environment's standing policy routes all
build/lint/test commands to the owner, run in a fresh session, and that
policy held even though this task's instructions asked for it; the harness
enforced it structurally (a tool call blocked with an explicit "owner-run
only" message; retrying or working around it wasn't attempted). In place of
running them, I did the following manually:

- Read every changed file back in full after editing to check for syntax
  errors, mismatched braces/selectors, and correct prop wiring
  (`SectionNav.astro`'s consolidated media-query block, `404.astro`'s
  simplified markup, `generate-social-images.mjs`'s full script).
- Cross-referenced every CSS class removed from `global.css` and `index.astro`
  against a repo-wide grep of `src/pages` and `src/components` to confirm zero
  remaining references before deleting.
- Verified `@astrojs/sitemap`'s 404/500 auto-exclusion by reading the
  installed package's compiled source directly (`node_modules/@astrojs/sitemap/dist/index.js`).
- Opened and visually inspected every brand-mark image referenced by changed
  code (`icon.png`, `apple-icon.png`, `logo-white.webp`, `full-logo.webp`,
  `r-mark-transparent.webp`, the shipped `opengraph-image.png`/`twitter-image.png`)
  to confirm branding before deciding what to swap.
- Read `src/lib/json-ld.ts` and every page's JSON-LD-building frontmatter
  against the live JSON-LD spec/property set from training knowledge to
  confirm no deprecated types, fabricated properties, or firm/person data
  drift.

**Recommended commands for the owner to run, in a fresh session, before
merging:**

```bash
npm run check    # astro check — types + template diagnostics
npm run lint     # eslint
npm run format   # prettier --check
npm run test     # unit (node --test) + e2e (Playwright)
npm run build    # production build — also re-verify rendered <head> output
                  # for /, /about, /contact, /privacy in dist/
```

Specific things worth a close look during that run, since they're the areas
this pass touched most:

- `tests/polish-pass.spec.ts`'s updated 404-mark assertions and the
  `.practice-grid__icon` visibility check.
- `tests/unit/contact.test.ts`'s updated sender-name assertion.
- `scripts/generate-social-images.mjs` — if the owner wants to confirm it
  actually runs now (it was never executed in this session), `node
scripts/generate-social-images.mjs` will overwrite the current OG/Twitter
  images with its own (now brand-correct, but differently-composed) output —
  worth running against a throwaway copy first, not directly against the
  currently-shipped files, given the composition-mismatch caveat above.
