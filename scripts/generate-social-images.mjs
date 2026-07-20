// Reproducible generator for public/opengraph-image.png and
// public/twitter-image.png. Renders a self-contained HTML composition
// (brand fonts/images inlined as data URIs) with Playwright's Chromium and
// screenshots it at the exact target pixel dimensions.
//
// Run with: node scripts/generate-social-images.mjs
//
// Composition: full-logo-white (large) + Russ's portrait + the firm's
// positioning statement on navy, per the July 2026 OG/Twitter simplification
// pass — see docs/legacy-content-inventory.md.

import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')

function toDataUri(relPath, mime) {
  const bytes = readFileSync(path.join(PUBLIC, relPath))
  return `data:${mime};base64,${bytes.toString('base64')}`
}

function fontDataUri(pkgRelPath) {
  const bytes = readFileSync(path.join(ROOT, 'node_modules', pkgRelPath))
  return `data:font/woff2;base64,${bytes.toString('base64')}`
}

const logoWhite = toDataUri('footer-logo-white.webp', 'image/webp')
const portrait = toDataUri('square-profile.webp', 'image/webp')
const libreBaskervilleBold = fontDataUri('@fontsource/libre-baskerville/files/libre-baskerville-latin-700-normal.woff2')
const sourceSans3 = fontDataUri('@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2')

const NAVY = '#1e275e'
const GOLD = '#fdb613'

const POSITIONING_STATEMENT = 'Premier representation for employers, health care providers, and nonprofits throughout California.'

function buildHtml() {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Libre Baskerville';
    font-weight: 700;
    src: url('${libreBaskervilleBold}') format('woff2');
  }
  @font-face {
    font-family: 'Source Sans 3';
    font-weight: 100 900;
    src: url('${sourceSans3}') format('woff2-variations');
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  body {
    display: flex;
    background: ${NAVY};
    font-family: 'Source Sans 3', sans-serif;
  }
  .left {
    flex: 0 0 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 4.5% 0 6%;
  }
  .logo {
    /* ~22% larger than the initial pass (46% -> 56%) — the full logo lockup,
       especially "Ryan Legal, PC", was still slightly too small to read
       instantly at real feed-preview sizes. */
    width: 56%;
    height: auto;
    display: block;
    margin-bottom: 5%;
  }
  .statement {
    font-family: 'Libre Baskerville', Georgia, serif;
    font-weight: 700;
    color: #ffffff;
    font-size: 3.05vw;
    line-height: 1.28;
    max-width: 96%;
  }
  .locale {
    /* ~41% larger than the initial pass (1.35vw -> 1.9vw) — too small to
       read at real feed-preview sizes. Letter-spacing nudged down slightly
       (0.1em -> 0.08em) so the wider glyphs don't read as over-spaced at
       the larger size. Still clearly smaller/less prominent than .statement,
       same gold color, position, and margin as before. */
    display: block;
    margin-top: 5.5%;
    color: ${GOLD};
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 1.9vw;
  }
  .right {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .right img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 22%;
  }
  .right .fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, ${NAVY} 0%, rgba(30, 39, 94, 0) 18%);
  }
  .right .rule {
    position: absolute;
    inset: 0 0 0 0;
    left: 0;
    width: 6px;
    background: ${GOLD};
  }
</style>
</head>
<body>
  <div class="left">
    <img class="logo" src="${logoWhite}" alt="" />
    <p class="statement">${POSITIONING_STATEMENT}</p>
    <span class="locale">Fresno, California</span>
  </div>
  <div class="right">
    <img src="${portrait}" alt="" />
    <div class="fade"></div>
  </div>
</body>
</html>`
}

async function render(width, height, outPath) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  await page.setContent(buildHtml(), { waitUntil: 'networkidle' })
  await page.screenshot({ path: outPath })
  await browser.close()
  console.log(`wrote ${outPath} (${width}x${height})`)
}

await render(2400, 1262, path.join(PUBLIC, 'opengraph-image.png'))
await render(1010, 506, path.join(PUBLIC, 'twitter-image.png'))
