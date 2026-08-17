// Positions the CTA heading corner brackets (Home + About closing bands)
// from the heading's actual rendered text bounds, not its own CSS box: the
// heading is centered and can wrap to a different number of lines at
// different widths, so a fixed CSS offset doesn't reliably frame it. A
// Range over the heading's contents gives the real per-line rects via
// getClientRects() — the brackets are positioned from the union of those
// rects (min/max across all lines) instead, so this works whether the
// heading renders on one line or several, with no manual line breaks.
const OFFSET = 12

function measure(group: HTMLElement, heading: HTMLElement, tl: HTMLElement, br: HTMLElement): boolean {
  const range = document.createRange()
  range.selectNodeContents(heading)
  const rects = Array.from(range.getClientRects())
  if (rects.length === 0) return false

  const left = Math.min(...rects.map((rect) => rect.left))
  const right = Math.max(...rects.map((rect) => rect.right))
  const top = Math.min(...rects.map((rect) => rect.top))
  const bottom = Math.max(...rects.map((rect) => rect.bottom))

  const groupRect = group.getBoundingClientRect()

  // tl mirrors the static bracket-frame geometry (positioned from its own
  // top/left), br from its own bottom/right — so neither needs to know the
  // other bracket's size.
  tl.style.left = `${left - groupRect.left - OFFSET}px`
  tl.style.top = `${top - groupRect.top - OFFSET}px`
  br.style.right = `${groupRect.right - right - OFFSET}px`
  br.style.bottom = `${groupRect.bottom - bottom - OFFSET}px`

  group.setAttribute('data-measured', '')
  return true
}

function init(group: HTMLElement) {
  const heading = group.querySelector<HTMLElement>('h2')
  const tl = group.querySelector<HTMLElement>('[data-cta-bracket-tl]')
  const br = group.querySelector<HTMLElement>('[data-cta-bracket-br]')
  if (!heading || !tl || !br) return

  const run = () => measure(group, heading, tl, br)

  run()

  // Web fonts swapping in after the first paint can shift line breaks/glyph
  // widths enough to matter — re-measure once the real fonts are active.
  if ('fonts' in document) {
    document.fonts.ready.then(run).catch(() => {})
  }

  // Re-measure whenever the wrapper's own size changes — which happens
  // exactly when the heading's line count/wrapping changes at a new width.
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(run).observe(group)
  } else {
    window.addEventListener('resize', run)
  }
}

document.querySelectorAll<HTMLElement>('[data-cta-bracket]').forEach(init)
