# Ryan Legal, PC — LawPay Embed Feasibility

*Research only. No application code, styles, configuration, or the `/payment` page were changed to produce this report. Screenshots taken for analysis were saved outside the repository and are not included here.*

## Executive Verdict

**Recommendation: 1 — Keep the current external LawPay flow.**

**Confidence: High.**

The firm's actual LawPay payment URL was tested directly (headers only, no transaction) and returns `X-Frame-Options: SAMEORIGIN`, which blocks framing it on ryanlegalpc.com today. Every officially documented path to something more "embedded" than a link — the Unified Payment Flow web component, Hosted Fields, or a support-provisioned iframe snippet — requires a backend server the static Astro/Netlify site does not currently have, a partner OAuth application, LawPay-side domain allow-listing, and (for UPF/Hosted Fields) short-lived JWT minting or server-side charge creation. None of the official docs describe a client-side success/cancel event contract, LawPay's own theming support is limited to a logo and business-info header (not color/typography), and LawPay's own accessibility statement claims only *partial* WCAG 2.1 AA conformance. Weighed against the current flow — which is simple, keeps zero PCI scope on Ryan Legal's infrastructure, and gives an unambiguous trust boundary — the added complexity is not justified by a proportionate client-experience gain.

## Current Payment Flow

- **Route:** `src/pages/payment.astro`, a static Astro page rendered as `/payment`, listed in the sitemap with its own `WebPage` JSON-LD.
- **Destination:** a `lawPayUrl` constant in `src/data/site.ts` pointing to `https://secure.lawpay.com/pages/ryanlegalpc/operating` — a hosted payment page scoped to the firm's **operating account** (as opposed to a trust account). This is a firm-identifying but already-public URL (it's the same link the page exposes to every visitor), so it's reproduced here rather than redacted.
- **Link behavior:** `target="_blank" rel="noreferrer"`, with an explicit `aria-label` ("Pay Now — opens our secure LawPay payment portal in a new tab") — opens in a **new tab**, does not navigate the client away from ryanlegalpc.com.
- **Copy/trust cues:** page states "You'll leave ryanlegalpc.com for LawPay's secure site... We do not see or store your card details," plus a fallback block for billing questions (phone/email) and a plain-language note that payment is by major credit/debit card via LawPay.
- **Styling:** the CTA and surrounding card use the site's existing design tokens (`--bg-raised`, `--rule`, `--s*` spacing scale, `.btn-primary`) — fully consistent with the rest of the site, light/dark theme aware, since none of it is LawPay UI.
- **Headers/CSP:** the repo has no `_headers` file and no CSP `<meta>` tag anywhere in `BaseLayout.astro`; `netlify.toml` only configures the build, a `netlify/functions` directory (used today for the contact form), and two redirects. **There is currently no CSP or frame-related header configuration on ryanlegalpc.com at all** — nothing would need to be relaxed today, but nothing is set up to constrain a future embed either.
- **Accessibility/keyboard:** the CTA is a standard `<a>` with a descriptive `aria-label`; no custom widget, so standard link keyboard/focus semantics apply.
- **Mobile/desktop:** single narrow-column card layout (`max-width: var(--content-narrow)`), no responsive concerns specific to this page beyond the rest of the site's already-audited layout.

## Official LawPay Integration Options

LawPay's consumer/developer brand has consolidated under **8am** (`developers.8am.com`, `supportcenter.lawpay.com`), with a separate, apparently newer **LawPay Link** product surfaced at `supportcenter.lawpaylink.com`. Confirmed options, in order of how "embedded" they are:

| Option | Truly embedded, or redirect? | Embed code provided? | Backend required? | Notes |
|---|---|---|---|---|
| **Hosted Payment Page / Payment Page Link** (what Ryan Legal uses today) | Redirect | N/A — it's a link | No | "The easiest way to collect a payment online... a link to one of our pre-built hosted payment pages." Personalizable with firm logo/business info only. Hosted on a PCI Level 1 server. |
| **Payment button (image + hyperlink)** | Redirect, styled as a button | Optional — LawPay's help center describes downloading a button image from a "Button Catalog" and hyperlinking it to your payment page URL; if your site builder can't do image links, LawPay support can hand you an HTML snippet | No | Cosmetic wrapper around the same redirect; not a functional embed. |
| **LawPay Link "slide-in" embed script** | Overlay, not a true in-page embed | Yes — "unique embed script" pasted in `<head>` | No | Per LawPay Link's own help article, the payment page "slides in... over your website and disappears when the client clicks away" — a modal/drawer triggered by a script, not an iframe living permanently in the page. **Unclear whether the firm's current account is on LawPay Link or classic LawPay/8am** — this needs owner confirmation (see §11). |
| **Iframe embed of a hosted payment page** | Embedded, but gated | Yes, but **only after LawPay support allow-lists your exact domain** and issues a custom snippet using their embed library | No (for this exact path) | Not self-service. The documentation frames this as a supported-but-assisted path, not something you can wire up unilaterally. |
| **Unified Payment Flow (UPF)** `<upf-checkout>` web component | Embedded | Yes — a versioned `<script>` tag + a custom element (`token`, `amount`, `public-key`, `bank-account-id` attributes) | **Yes** | Requires a partner OAuth application, a backend that mints short-lived JWTs via `/v2/oauth/token`, a bank-accounts API lookup for the deposit account ID, and LawPay support registering your hosting domain. This is the technology actually running the firm's current hosted page (see §3 — confirmed live). |
| **Hosted Fields** (`fieldGen.js`) | Embedded (individual iframe'd inputs) | Yes | **Yes** | Marked deprecated-adjacent relative to UPF in the docs. Card/bank inputs are individually iframe'd (SAQ-A scope), but your backend must call `getPaymentToken()` client-side then submit the resulting token to LawPay's Charges API server-side. |
| Quick Bill, client portal, invoicing links | Not independently verified beyond marketing mentions | — | — | Named in LawPay's own accessibility/marketing copy; whether the firm's account includes these needs dashboard confirmation. Not evaluated further here since nothing suggests they change the iframe/backend calculus above. |

None of the confirmed paths offer color/typography theming — LawPay's own copy limits "personalization" to a logo and business-info block.

## Iframe Feasibility

**Classification: Blocked (for the current URL, today) / Officially possible only through a support-gated, non-default path (for a purpose-built embed).**

Directly inspected (headers only, no page interaction, no data entered):

```
GET https://secure.lawpay.com/pages/ryanlegalpc/operating  (browser User-Agent)
→ HTTP/2 200
  x-frame-options: SAMEORIGIN
  set-cookie: _id_session=...; domain=.lawpay.com; secure; HttpOnly; SameSite=None
```

- `X-Frame-Options: SAMEORIGIN` is present and unambiguous: **browsers will refuse to render this exact URL inside an iframe on ryanlegalpc.com as it exists right now.** No `Content-Security-Policy: frame-ancestors` was present — `X-Frame-Options` is the operative (and sufficient) control here.
- The session cookie is `SameSite=None; Secure`, meaning it's designed to survive cross-site contexts *if* third-party cookies are allowed — but that's precisely what Safari (ITP) and Firefox (ETP) restrict by default, and Chrome has been phasing out. This is an independent fragility even where framing is technically allow-listed.
- A live, non-transactional load of the page (Playwright, no form fields touched) showed a console warning **already present on LawPay's own top-level page**: `"Warning: affirm.js may not work properly... Third Party Cookies not available"`. If a browser's third-party-cookie policy degrades an LawPay-embedded feature (Affirm pay-later) even at top level, an iframe embed compounds that risk rather than fixing it.
- Live inspection also revealed the page is itself built on the `upf-checkout` web component (`cdn.affinipay.com/upf-checkout/2.0.9/...` visible in loaded scripts) — i.e., LawPay's own hosted page *is* UPF, just running on their origin under their own frame rules, not embedded in someone else's page.
- Official docs describe iframe embedding as available **only after contacting 8am/LawPay support with your exact domain (scheme included) for allow-listing**, after which they issue a different embed snippet. This confirms framing is not officially treated as "just works from any domain" — it's a deliberately gated exception, and nothing found suggests it's guaranteed stable or contractually supported long-term.
- Whether cross-origin `postMessage` communication (for dynamic height or payment-result signaling) is officially supported was **not confirmed** in any fetched documentation. Do not assume it exists.

**Bottom line:** the current public URL cannot be framed today. A different, purpose-built embed (UPF or an allow-listed iframe) is the only officially available path, and it is support-gated, not self-service.

## Security, PCI, and Compliance Considerations

- **PCI scope today:** effectively minimal for Ryan Legal — the site only holds a link; no payment fields render on Ryan Legal-controlled origin at any point.
- **PCI scope under UPF/Hosted Fields embed:** card/bank fields would still be delivered as iframes from LawPay/AffiniPay's CDN even when embedded, preserving SAQ-A eligibility — LawPay states hosted fields "provide SAQ-A PCI compliance, the highest level of PCI compliance" available to a merchant using their own checkout page. So an embed would not obviously *increase* PCI scope, provided the integration is done correctly (only LawPay's iframes ever touch card data, never a Ryan Legal-controlled input).
- **What would newly become Ryan Legal's responsibility:** securely storing/handling the OAuth partner credentials and JWT-minting logic server-side (these are not something that can live in static site code or a public repo), correctly configuring the allow-listed domain, and not accidentally logging tokens or amounts.
- **LawPay's stated posture:** PCI DSS Level 1 Service Provider status (independently audited by ControlScan), 256-bit AES encryption, and a free PCI-compliance program included with a LawPay account — per LawPay's own PCI Compliance Overview and Security Overview help-center articles. This is LawPay's compliance claim, not independent verification by this report.
- **Division of responsibility:** LawPay is responsible for the payment infrastructure's own compliance; Ryan Legal would be responsible for correctly integrating (not bypassing) that infrastructure and for any credential-handling introduced by a custom integration. Whether the firm's compliance adviser needs to sign off on any embed is outside this report's scope — flagged, not decided, here.
- **Trust/operating account separation:** the current URL already targets the *operating* account specifically; nothing in the research suggests an embed would blur trust/operating separation, since that's account-side configuration, not a property of the embed method.
- **Clickjacking/CSP:** the site has no CSP today; adding an embed would be the trigger to add one (at minimum a `frame-src` allowance scoped to LawPay's exact embed origin), which is new infra work, not a reason to avoid an embed by itself — but it is added maintenance surface.
- **Analytics/logs:** the current flow risks nothing beyond an outbound click event, if any analytics exist. An embed sitting inside `/payment` increases the chance that amounts, reference text, or an iframe URL end up in browser history, referrer headers, or analytics events unless deliberately excluded — this would need explicit exclusion rules if ever built.

## Privacy and Data Handling

- LawPay/8am's own privacy policy (`lawpay.com/terms/privacy/`) and cookie policy (`lawpay.com/terms/cookie-policy/`) are separate legal documents from Ryan Legal's. The **current external-redirect flow keeps this boundary unambiguous** — the browser's address bar changes, so a visitor is never in doubt about whose site is now processing their payment.
- An iframe embed would blur that boundary: the address bar stays on ryanlegalpc.com while a LawPay-origin iframe silently handles the transaction. Users could reasonably not realize a third party is involved unless the surrounding UI says so explicitly.
- **Recommended disclosures if an embed is ever built** (not written here, just identified as necessary): a visible "Payments are securely processed by LawPay" line near the embed, a link to LawPay's privacy/security page, a persistent link to the external hosted page as fallback, and an instruction not to put confidential matter details in any free-text "reference"/memo field (the current hosted page already exposes a "Reference" field that a client could misuse to enter case specifics — this risk exists today too, independent of embedding).
- A cookie set by lawpay.com is `HttpOnly; Secure; SameSite=None` — built to function cross-site, which is exactly what current browser privacy defaults increasingly restrict. This is a data-handling fragility, not just a technical one.

## Accessibility

**Classification: Moderate confidence for the current hosted page's own markup; Low confidence for how well that markup would hold up nested inside a Ryan Legal-hosted iframe.**

Findings from a direct, non-transactional Playwright inspection of the firm's live hosted page ($0 placeholder amount, no data entered):

- The page has genuinely semantic structure: proper `radiogroup`/`group`/`textbox` roles, visible required-field asterisks, an accessible name on every field ("Card number," "Expiration date," "CVV," "Zip/postal code," "Routing number," etc.), and a live "Secure and encrypted" label near the payment-method selector.
- The card-entry fields, the eCheck fields, and the Affirm pay-later fields each live inside **their own separate iframe**, nested inside the payment page. That means keyboard/focus flow on the *current* hosted page already crosses 2–3 iframe boundaries before a user reaches a submit button — a well-known source of focus-order and screen-reader-announcement bugs, and this is true whether Ryan Legal links to it or embeds it.
- **LawPay's own public Accessibility Statement states the site is only "partially conformant" with WCAG 2.1 Level AA** — a self-disclosed gap, not something Ryan Legal could fix by choosing to embed vs. link.
- Embedding would add at least one more frame boundary (Ryan Legal page → embedded LawPay wrapper → LawPay's own field iframes) on top of what already exists today, compounding rather than reducing the focus-management risk.
- Not tested and not claimed: full WCAG conformance, screen-reader vendor-specific behavior (VoiceOver/NVDA/JAWS), color-contrast measurement, or CAPTCHA/step-up-authentication flows (none appeared on this $0 test load).
- **A full top-level navigation to LawPay's page (today's approach) is very plausibly more accessible in practice than an embed**, precisely because it avoids adding an extra layer of nested iframes on top of layers LawPay already ships.

## Mobile and Responsive Behavior

Assessed via Playwright screenshots at 1280×800 and 390×844 (viewport only, no data entered, screenshots not retained in the repo):

- At both sizes the hosted page renders as a clean single-column card list on mobile and a two-column layout (form + a slim "Payment / Payment Detail" summary rail) on desktop — LawPay's own responsive design, not something Ryan Legal controls either way.
- Visual language: white cards, black/navy text, blue radio accents, card-brand icons, an Affirm "Pay Later" option, a "SECURE CHECKOUT / 256-BIT ENCRYPTION" and "PRIVACY PROTECTED" trust badge row, the firm's name/address/phone/email in a footer, and a "Powered by LawPay" wordmark. None of this uses Ryan Legal's navy/gold/ivory tokens, and nothing in LawPay's documentation offers color/typography theming.
- Not tested (would require transacting): virtual-keyboard behavior during real input, iOS zoom-on-focus for payment fields, Apple Pay/wallet presentation, bank-verification redirects, or the receipt/confirmation screen. These remain open items regardless of link vs. embed.
- Because the page already looks and behaves identically whether it's reached by link or by iframe, embedding buys no responsive-design improvement — the only thing that changes is whether it's wrapped in Ryan Legal's chrome or not.

## Payment Lifecycle and Failure States

Mapped user journey and what Ryan Legal's site could know at each step:

1. Visitor reaches `/payment` — same regardless of approach.
2–4. Visitor identifies purpose, enters amount/payer/payment details, sees validation errors — happens entirely on LawPay's origin/iframes today; would still happen on LawPay's iframes even if embedded, since Ryan Legal has no documented way to intercept or theme those fields.
5–7. Submission, fraud/authentication checks, success/decline — **no documented client-side event contract was found** (no `postMessage` schema, no documented redirect/callback contract in the fetched developer pages) for signaling success/failure back to a parent page. **Do not assume** an embed would let Ryan Legal detect success from iframe navigation or JS events — this remains unconfirmed and would need direct LawPay support/API-reference confirmation before being relied on.
8–9. Receipt delivery and return — under the current flow, the client simply closes or returns to the LawPay tab; nothing indicates to Ryan Legal's site whether payment succeeded.
10. Reconciliation — appears to happen entirely via the LawPay/8am dashboard regardless of integration method; whether the firm currently receives any email/webhook notification on payment is an **owner-confirmation item** (see §11), not something discoverable from outside the account.

**Net:** the lifecycle visibility gap that exists today would persist under every option evaluated, including the embed paths — this is a LawPay account/API question, not something "embedding" inherently solves.

## User-Experience Comparison

### Option A — Keep the current external LawPay flow
- **Clarity/trust:** high — address-bar change makes the handoff to a licensed payment processor obvious.
- **Simplicity:** high — a single styled link, already implemented and matching the site's design system.
- **Mobile behavior:** good — LawPay's own responsive layout, verified above.
- **Accessibility:** the link itself is a fully standard, well-labeled `<a>`; the destination's accessibility is LawPay's responsibility either way.
- **Maintenance:** near zero — no credentials, no backend, no new dependency on Ryan Legal's infrastructure.
- **PCI scope:** minimal to none.
- **Abandonment risk:** a new tab could be seen as mildly more friction than staying in place, but the disclaimer already sets that expectation.
- **Branding:** the client briefly leaves Ryan Legal's visual identity — mitigated somewhat since LawPay's page already displays the firm's name/logo/contact info.
- **Troubleshooting:** trivial — "did the link open," nothing more.

### Option B — Official embedded LawPay experience (UPF, pending domain allow-listing)
- **Continuity:** would keep the visitor on ryanlegalpc.com visually.
- **Trust:** mixed — continuity can build trust, but an unlabeled iframe can also *reduce* trust by obscuring who's actually processing the payment; LawPay branding (the "Powered by LawPay" mark) would need to remain visible to avoid that.
- **Responsive behavior:** inherits LawPay's own layout (see above) — no improvement over Option A, since the same markup renders either way.
- **Accessibility:** adds at least one more nested-iframe boundary on top of the 2–3 that already exist inside LawPay's own page (see Accessibility section) — a plausible regression, not an improvement.
- **Processor identity/security boundary:** must be deliberately preserved via visible LawPay branding/disclosure; the address bar no longer does this work automatically.
- **Implementation complexity:** substantial — new backend (Netlify Function or similar) for JWT minting/OAuth, partner application setup, LawPay support engagement for domain allow-listing, new environment variables/secrets, and a CSP addition.
- **Failure states:** undocumented success/cancel contract (see Lifecycle section) — a real open risk.
- **Maintenance burden:** ongoing — a new integration surface with its own credentials, versioned CDN script, and support relationship to maintain.
- **Browser compatibility:** third-party-cookie dependent sub-features (confirmed: Affirm) already warn even at top level; embedding adds risk rather than removing it.
- **Account/plan dependency:** confirmed to require a partner OAuth application and support-side domain registration — not something turned on from a standard dashboard setting.

No third option (branded button, in-page modal, client portal) was added beyond what's in the table in §2 — the LawPay Link "slide-in" script is the only other credible middle ground, and it's an overlay/modal, not a true in-page embed, so it doesn't change the trust-boundary or accessibility analysis materially versus Option A; it's listed as an owner-confirmation item, not scored separately, since it's unclear whether the firm's account even has access to it.

## Visual Integration with Ryan Legal

- LawPay's UI cannot be color/typography-themed based on anything found in official documentation or marketing copy — "personalization" is explicitly limited to logo and business-info text.
- Its visual language (white cards, black/navy text, blue accents, card-brand icon strip) doesn't clash badly with Ryan Legal's navy/gold/ivory palette, but it also doesn't match it — it would read as its own self-contained module rather than a native part of the page, embedded or not.
- If ever attempted, the honest presentation is a clearly bounded, clearly labeled region ("Payments are securely processed by LawPay," plus the existing LawPay wordmark) rather than trying to blend it in — hiding or disguising the processor's identity would work against trust, which should outrank visual uniformity here.
- Dark mode: LawPay's page appeared to render in a fixed light theme regardless of the parent page; there's no documented way to force it dark, and doing so isn't advisable even if some CSS hack existed, since it isn't LawPay-supported styling and reduces confidence in future updates not breaking it.
- Net: an iframe would create a mild "website inside a website" effect no matter how it's framed visually — this is inherent to embedding a fully-styled third-party checkout rather than a fixable design problem.

## Account-Specific Unknowns

Confirmed still open after this research — needs the firm owner or the LawPay/8am dashboard, not further public research:

- Is the firm's account on classic LawPay/8am or on the newer **LawPay Link** product? (Determines whether the "slide-in" embed script is even available.)
- Does the account's Developers panel expose a **partner OAuth application**, or would one need to be requested from LawPay support?
- Which payment accounts are configured — operating only, or both operating and trust? (The current link targets `operating` specifically.)
- Does the firm want clients able to pay into a trust account from the website at all, or is operating-only intentional?
- Is a **return URL** or **webhook** available/configured today for payment notifications, and does staff currently receive any automated notice when a payment posts?
- Is a **sandbox/test mode** available on this account for safely prototyping any embed without real transactions?
- Can **receipt branding** (the email a client gets after paying) be customized today, independent of any website embed?
- Does the firm use **Quick Bill**, per-invoice payment links, or a client portal today, or exclusively this single static hosted-page link?
- Are there **account-specific restrictions or a support ticket already on file** regarding iframe/domain allow-listing for ryanlegalpc.com?

## Decision Matrix

Scored 1–5 (5 = best) for the two options with enough evidence to score meaningfully:

| Criterion | A: Keep external flow | B: Official embed (UPF, pending allow-listing) | Notes |
|---|---|---|---|
| Official support | 5 | 3 | B is official but gated behind support engagement, not self-service. |
| Security confidence | 5 | 4 | Both keep card data off Ryan Legal's origin; B adds credential-handling surface. |
| Privacy clarity | 5 | 3 | Address-bar navigation (A) is an unambiguous trust signal; B requires deliberate disclosure to match it. |
| PCI simplicity | 5 | 4 | Neither meaningfully increases PCI scope if built correctly; B adds process, not scope. |
| Accessibility confidence | 4 | 2 | *Uncertain — based on nested-iframe reasoning above, not a tested embed.* LawPay's own partial-AA disclosure caps both, but B plausibly adds a focus-order risk A doesn't have. |
| Mobile usability | 4 | 4 | Identical underlying LawPay markup either way. |
| Client trust | 4 | 3 | *Uncertain — trust could go either way depending on execution;* scored on the assumption disclosure is done well. |
| Implementation effort | 5 | 1 | A is done; B needs a new backend, OAuth app, secrets, and a support engagement. |
| Maintenance burden | 5 | 2 | B adds an ongoing credential/version/support relationship to maintain. |
| Failure recovery | 4 | 2 | *Uncertain — no documented success/cancel contract was found for B*; A's failure mode (client just doesn't complete it) is at least simple to reason about. |
| Visual integration | 3 | 3 | Neither is themeable; both read as a distinct module either way. |
| Account dependency | 5 | 2 | B confirmed to require partner-app/domain allow-listing not present by default. |

## Recommended Direction

**1 — Keep the current external LawPay flow.**

The current implementation is simple, already matches the site's design system, keeps PCI/security scope minimal, and preserves an unambiguous trust boundary. Every path to something more embedded is either not a true embed (LawPay Link's slide-in overlay), technically blocked today (direct iframe of the current URL — confirmed via header inspection), or requires new backend infrastructure, credentials, and a LawPay support engagement with no documented success/failure event contract. That is a disproportionate amount of new maintenance surface for a payment experience that, by LawPay's own admission, isn't fully WCAG-AA conformant and can't be visually themed to match Ryan Legal's brand even after the work is done.

This is not a "4 — wait for answers" situation: the account-specific unknowns in §11 are worth knowing eventually, but none of them would flip the recommendation, since the structural blockers (X-Frame-Options, no backend, no theming, no confirmed success contract, LawPay's self-disclosed partial accessibility conformance) hold regardless of which LawPay product tier the firm is on.

*No Future Prototype Plan section is included, per the recommendation above.*

## Sources

- [Embed a Payment Page — 8am LawPay Link Help Center](https://supportcenter.lawpaylink.com/en/articles/9343061-embed-a-payment-page) — describes the "slide-in" embed script for LawPay Link.
- [How to Add a Payment Button to Your Website — 8am LawPay Help Center](https://supportcenter.lawpay.com/en/articles/9343115-how-to-add-a-payment-button-to-your-website) — button-catalog + hyperlink approach; confirms no default HTML snippet unless requested from support.
- [Custom Payment Pages and Secure Payment Links — LawPay](https://www.lawpay.com/features/custom-payment-pages/) — official product marketing for the hosted-page product Ryan Legal currently uses; confirms PCI Level 1 hosting and logo/business-info-only personalization.
- [Quickstart guide: Start a payment integration — 8am Developers](https://developers.8am.com/quickstart/quickstart.html)
- [Hosted payment pages — 8am Developers](https://developers.8am.com/merchant/hosted-payment-pages.html) — confirms iframe embedding requires contacting support with an exact domain for allow-listing.
- [Embedding our Unified Payment Flow (UPF) in your app or site — 8am Developers](https://developers.8am.com/collect/create-payment-form-upf.html) — `<upf-checkout>` web component, JWT/OAuth backend requirement, domain registration requirement.
- [Creating payment forms using hosted fields — 8am Developers](https://developers.8am.com/collect/create-payment-form-hosted-fields.html) — SAQ-A PCI framing, `fieldGen.js`, `getPaymentToken()` contract.
- [Creating payment forms using our tokenization library (Deprecated) — 8am Developers](https://developers.8am.com/collect/create-payment-form.html)
- [API Reference — 8am Developers](https://developers.8am.com/reference/api.html)
- [Hosted fields reference — 8am Developers](https://developers.8am.com/reference/hosted-fields-reference.html)
- [Accessibility Statement — LawPay](https://www.lawpay.com/terms/accessibility-statement/) — self-disclosed "partial conformance" with WCAG 2.1 AA.
- [PCI Compliance Overview — 8am LawPay Help Center](https://supportcenter.lawpay.com/en/articles/9343259-pci-compliance-overview)
- [LawPay Security Overview — 8am LawPay Help Center](https://supportcenter.lawpay.com/en/articles/9343260-lawpay-security-overview)
- [Advanced Data Protection and Security for Law Firms — LawPay](https://www.lawpay.com/features/advanced-security/)
- [Privacy Policy — LawPay](https://www.lawpay.com/terms/privacy/)
- [Website Cookie Policy — LawPay](https://www.lawpay.com/terms/cookie-policy/)
- Direct header inspection of `https://secure.lawpay.com/pages/ryanlegalpc/operating` (this report, 2026-07-19) — `X-Frame-Options: SAMEORIGIN` confirmed via `curl` with a browser User-Agent.
- Direct Playwright inspection of the same URL (this report, 2026-07-19) — nested-iframe field structure, third-party-cookie console warning, and responsive screenshots at 1280×800 and 390×844 (not retained in the repository).
- Repository inspection: `src/pages/payment.astro`, `src/data/site.ts`, `src/layouts/BaseLayout.astro`, `netlify.toml` (this report, 2026-07-19).
