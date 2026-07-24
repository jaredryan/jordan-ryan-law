# Ryan Legal, PC — Design Audit (Follow-Up)

_Conducted fresh via rendered-site inspection at 1280×900 (desktop), 768×1024 (tablet), and 390×844 (mobile), light and dark themes, all seven routes (Home, Expertise, About, Contact, Payment, 404, Privacy). Follow-up to `final-design-audit.md`, which was written at commit `e1b81ec` — 17 commits and two full Milestones (6, 7) have landed since, primarily Milestone 7's "new section for new content." Updated same day after a second iteration pass that closed out this doc's own B1 recommendation and tested two Home treatments to a real (negative) conclusion._

## Executive Verdict

**Overall score: 8.75/10** (up from 8.5/10 earlier this same document, 8/10 at the last full audit).

The one open structural item from this doc's first pass — Expertise's six identical sections reading as one long document with no chapter break — is now closed. Not with the originally-proposed CTA-style band (correctly rejected mid-session: reusing the consultation band's "make a decision" semantics as pure scenery would have cheapened the one place it's supposed to mean something), but with a quieter, more honest device: a single background shift spanning the full content column starting at the page's second half, plus real two-column proof content extracted for 5 of 6 sections (up from 4) using only verified existing data — a "Forums" list for Business Litigation, an entity-type list for Business Transactions, and an "Areas of Precedent" list for Appeals, none of it fabricated.

Two Home treatments were also tried and deliberately reverted, which is worth recording as much as what shipped. A full-bleed tan band on "Our Vision and Mission" was built, then rejected on inspection: it diluted the Proof strip (now the _only_ place that treatment appears, which is what made it land) and broke an intentional structural choice — Practice Areas and Vision & Mission were designed to read as one connected chapter sharing a background, not two separate movements. A pull-quote/typographic-emphasis alternative was also built and rejected: with only two short paragraphs, both fully visible in the same viewport, any pulled sentence duplicates itself immediately below, reading as a rendering glitch rather than emphasis. Home is unchanged from the original audit as a result — confirmed the right call, not a missed opportunity.

**Stopping recommendation: `1. Proceed to final review — no further design work needed.`** Nothing outstanding remains on any page.

## Scorecard

| Area                          | Score  | Change | Note                                                                                                                                                                                                                                                                                                 |
| ----------------------------- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                          | 8/10   | steady | Hero/proof-band/consultation-band unchanged and still the strongest moments on the site. Vision & Mission's flatness was tested twice (tan band, pull-quote) and reverted both times for concrete reasons — see Page-by-Page Notes. Confirmed intentional pacing, not an unaddressed gap             |
| Expertise / Areas of Practice | 8/10   | +0.5   | Six-section repetition — the top finding across two audits — is resolved via a full-width background shift starting at the page's second half. 5 of 6 sections now carry real two-column proof content (up from 4), all from verified data. Only Technology has no comparable fact to show, honestly |
| About                         | 8.5/10 | steady | New gold-callout "Reported Decisions" card and closing band, both unchanged since last pass                                                                                                                                                                                                          |
| Contact                       | 7.5/10 | steady | Unchanged; still correctly minimal, still the most generic-feeling page — this was explicitly a "do not fix" item last time                                                                                                                                                                          |
| Payment                       | 8/10   | steady | Unchanged, still exactly right                                                                                                                                                                                                                                                                       |
| Privacy                       | 8/10   | new    | New page since last audit. Plain black-text legal copy with a gold eyebrow and serif headings — correctly restrained for a disclosures page, same register as Payment                                                                                                                                |
| 404                           | 8.5/10 | steady | Unchanged                                                                                                                                                                                                                                                                                            |
| Header / Navigation           | 8.5/10 | steady | Unchanged, still no findings                                                                                                                                                                                                                                                                         |
| Footer                        | 8/10   | steady | Unchanged                                                                                                                                                                                                                                                                                            |
| Light Theme                   | 8/10   | steady | —                                                                                                                                                                                                                                                                                                    |
| Dark Theme                    | 8.5/10 | steady | New callout/closing-band devices carry their dark-theme treatment correctly — checked directly, no parity gaps introduced                                                                                                                                                                            |

## What Improved Since Last Audit

- **Real closing bands on About and Expertise.** Both now end on a full-bleed navy (light) / ivory-flip (dark) band with a heading, one line of copy, and a primary button — `.closing-band` in `src/styles/global.css:700`, used by `src/pages/expertise.astro` and `src/pages/about.astro`. Expertise's ending went from nothing (straight into the footer) to a real landing.
- **About's Litigation and Appeals section has a new "Reported Decisions" card** — a raised tan (light) / navy-raised (dark) card holding all nine reported decisions, each with a gold-left-border callout, italic Libre Baskerville case names, and citations. Genuine color-and-typography event in exactly the stretch of the page the last audit called out as monochrome, reusing an existing visual grammar rather than inventing one.
- **A new Privacy page**, correctly styled in the same restrained register as Payment.
- **Expertise's six-section repetition is resolved.** A single background shift (`.exp-movement` in `src/pages/expertise.astro`, `--bg-raised` on top of `--bg`) spans the full width of the content column starting at Business Transactions and Finance, giving the page two visually distinct movements instead of one undifferentiated scroll. Deliberately _not_ a repeating/alternating pattern — that was considered and rejected, since it would have made the five proof-callout boxes' contrast against their own section background inconsistent from section to section, undoing the next point.
- **5 of 6 Expertise sections now carry real two-column proof content**, up from 4. Business Litigation gained a "Forums" list (state/federal courts, arbitration panels, administrative agencies — all pulled from the section's own existing content, a new `clientTypesLabel` override added to support the non-default heading); Business Transactions and Finance gained an entity-type list; Appeals gained an "Areas of Precedent" list (zoning and land use, immigration, noncompete, arbitration — pulled from the section's own paragraph, deliberately not overlapping the adjacent proof box's own headline case). All grounded in data that already existed; nothing invented.

## What Still Holds It Back

- **Technology has no two-column box.** Confirmed correct, not a gap: there's no verifiable client-type or credential fact for that practice area in the data, and the alternative (inventing one) was explicitly rejected.
- **Contact remains the most generic page on the site.** Restated for completeness — this was explicitly a "do not fix" item last time and nothing here changes that call.
- **Home's Vision & Mission section is still visually the quietest stretch of the strongest page — confirmed intentional, not a gap.** Two different treatments were built and tested this pass specifically to answer this doc's earlier "optional polish" suggestion, and both were rejected for real reasons (see Page-by-Page Notes). This is no longer an open question.

## Page-by-Page Notes (delta from last audit only)

### Home

No net structural change, but two real experiments were run against Vision & Mission and both were reverted — worth recording so they aren't tried again blind:

- **Full-bleed tan band** (reusing `.proof-band`'s own device): built, then rejected on inspection. It made the Proof strip's treatment appear twice on one page, which undercut the _reason_ the Proof strip works (it's the one place that color/layout shows up). It also broke a real, deliberate structural choice — Practice Areas and Vision & Mission share a background on purpose, reading as one connected "what we do / why we do it" chapter bookended by the proof band above and the consultation band below, not two separate movements. Reverted in full, including the stale code comment that had explained the _original_ no-band reasoning (now rewritten to explain the grouping intent directly, since the "why not" framing no longer made sense once a band had briefly existed and been removed).
- **Pull-quote / typographic emphasis** (large italic Libre Baskerville, reusing the site's existing global `blockquote` style, no color change): built, then rejected. With the section's full copy just two short paragraphs, both fully visible in the same viewport below the quote, any pulled sentence duplicates verbatim moments later — reads as a glitch, not emphasis. This device needs longer source copy than this section has to work.

Hero, proof band, and consultation band remain the strongest sequence on the site, unchanged.

### Expertise

This is the page that moved most this pass.

- **Pacing device, final form:** a single background shift (`.exp-movement`) spans the full width of the content column starting at Business Transactions and Finance — not a narrow tint on the article box itself (an earlier, rejected version of this looked like "a floating box with unexplained gutters," per the same critique that killed it), and not a repeating alternating pattern (rejected — would have made the proof-callout boxes' contrast inconsistent section to section). Getting the full-width version right required extracting the six sections' shared markup into a real component (`src/components/ExpertiseSection.astro` — Astro doesn't support JSX inside a plain frontmatter function, which silently passes `astro check` but 500s at actual render time) and replacing a `:first-of-type` CSS rule with an explicit `isFirst` prop, since the new wrapper div would otherwise have made the wrong section's divider disappear. The layout's grid `gap` between the sidebar and content was also removed and re-distributed as explicit padding (recovered fully on `.exp-intro`, which has no auto-centering margin to fall back on the way the sections do) so the tint reaches the sidebar's own divider rather than leaving a gap.
- **Content extraction:** Business Litigation, Business Transactions and Finance, and Appeals all gained real two-column proof boxes (see above). Health Care's box was tried with a fuller named-client list first, then reverted back to its original concise category list on request — the exhaustive version "got pretty large," a useful data point on how much detail these boxes can hold before they stop reading as scannable.
- Dead "Learn more about Russ's credentials" fallback links removed from Health Care and Technology (the conditional that rendered them only fires when a section has no `proof` entry — now only Technology, correctly).

### About

Gained: the Litigation section's "Reported Decisions" card, and the closing band. Both are real, well-executed additions using the site's existing visual language — no new colors, no new component patterns, both theme-correct. This is the page that improved the most since the last audit. The waiting-room photo, Crystal's card, and the narrow/wide width system are all unchanged and still working correctly (confirmed the photo renders correctly on real scroll — it appeared blank in a `fullPage` Playwright screenshot due to `loading="lazy"` timing, not an actual site bug).

### Contact, Payment, 404, Footer, Header

No changes since last audit; findings stand as previously written.

### Privacy (new page)

Plain, correctly restrained — gold eyebrow, serif h1/h2s, black body text, no decoration. Matches Payment's register. No findings.

## Recommendations

### A. Fix Before Launch

None. The site is already live; nothing found here rises to a launch-blocking issue.

### B. Items Worth Doing

None open. B1 (Expertise's mid-page pacing, carried over from the original launch audit through this doc's first pass) is done — see What Improved and the Expertise page notes for the final approach and why it differs from the originally-proposed navy/ivory-flip band.

### C. Optional Polish

None open. The one candidate here — a treatment for Home's Vision & Mission section — was tested twice this pass (a full-bleed band, a pull-quote) and rejected both times for concrete reasons, not lack of trying. See Page-by-Page Notes → Home.

### D. Do Not Do

- Do not add a `proof`-style gold callout to Technology just to make Expertise's rhythm perfectly even — don't fabricate a fact that doesn't exist. If Russ has a real credential/stat for that area, add it; otherwise leave the box absent.
- Do not touch Contact — correct advice across every pass so far, nothing has changed.
- Do not revisit a full-bleed band or pull-quote on Home's Vision & Mission without new information — both were built and tested, not just discussed, and both had specific, real problems (see above), not just aesthetic disagreement.
- Do not re-alternate Expertise's section backgrounds every section — tested in discussion, not in code, but the reasoning holds: it would make the proof-callout boxes' contrast inconsistent from section to section.
- Everything else in the original audit's "Do Not Do" list still holds (no cards replacing the archival hairline lists, no new accent colors, no colored background on Contact's form).

## Final Stopping Recommendation

**`1. Proceed to final review — no further design work needed.`**

Every open item from both the original launch audit and this document's first pass is now closed: About and Expertise both have real closing moments, About's Litigation section has a color/typography event, Expertise's repetition problem is resolved, and Home's one remaining "optional polish" question was tested to a real answer rather than left open. Nothing on this site currently clears the bar of "worth the complexity and regression risk." Project paused here pending new content from Russ.
