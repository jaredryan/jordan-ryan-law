// Progressive-enhancement active-section tracking for the Expertise and
// About side rails (and their narrow-screen chip/jump-nav equivalents,
// which share the same section hashes). Every element this script touches
// is a normal <a href="#..."> already wired for native anchor navigation,
// so with JS disabled the page still works — this only adds the
// aria-current/is-active affordance on top.
//
// A single IntersectionObserver watches the page's <section>/<article>
// targets with a rootMargin band positioned just below the sticky header.
// Tracking a Set of currently-intersecting ids (rather than reacting to
// each entry in isolation) keeps exactly one section "active" even when
// entries for an outgoing and incoming section arrive in the same batch,
// which is what prevents flicker at section boundaries.

function initScrollSpy() {
  const rails = Array.from(document.querySelectorAll<HTMLElement>('[data-spy-rail]'))
  if (rails.length === 0) return

  const linksByHash = new Map<string, HTMLAnchorElement[]>()
  for (const rail of rails) {
    rail.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      const id = link.getAttribute('href')?.slice(1)
      if (!id) return
      const list = linksByHash.get(id) ?? []
      list.push(link)
      linksByHash.set(id, list)
    })
  }

  const orderedIds = Array.from(linksByHash.keys()).filter((id) => document.getElementById(id))
  const sections = orderedIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)

  if (sections.length === 0) return

  let activeId: string | null = null

  function setActive(id: string) {
    if (id === activeId || !linksByHash.has(id)) return
    if (activeId) {
      for (const link of linksByHash.get(activeId) ?? []) {
        link.classList.remove('is-active')
        link.removeAttribute('aria-current')
      }
    }
    activeId = id
    for (const link of linksByHash.get(id) ?? []) {
      link.classList.add('is-active')
      link.setAttribute('aria-current', 'location')
    }
  }

  // A link click or hash change kicks off a scroll (smooth or, under
  // reduced motion, instant) that passes through every section between the
  // old and new one — without this, the observer would flag each of those
  // as "active" in turn before landing on the intended target. While
  // `suspended` is true the observer keeps its intersecting-ids bookkeeping
  // current but stops calling `setActive`, so the reader's chosen section
  // stays highlighted until the browser reports the scroll has actually
  // settled (or, lacking that support, until the timeout ceiling below).
  let suspended = false
  let suspendTimer: number | undefined

  function suspendUntilScrollSettles() {
    suspended = true
    window.clearTimeout(suspendTimer)
    suspendTimer = window.setTimeout(() => {
      suspended = false
    }, 1000)
  }

  function resumeObserver() {
    suspended = false
    window.clearTimeout(suspendTimer)
  }

  window.addEventListener('scrollend', resumeObserver)

  function activateAndSuspend(id: string) {
    setActive(id)
    suspendUntilScrollSettles()
  }

  const intersecting = new Set<string>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id
        if (entry.isIntersecting) intersecting.add(id)
        else intersecting.delete(id)
      }
      if (suspended) return
      const current = orderedIds.find((id) => intersecting.has(id))
      if (current) setActive(current)
    },
    // Band starts just below the sticky header (matches the sitewide
    // `scroll-margin-top: 5rem` anchor offset) and ends 55% down the
    // viewport, so whichever section owns that upper band reads as current.
    { rootMargin: '-84px 0px -55% 0px', threshold: 0 },
  )

  for (const section of sections) observer.observe(section)

  const initialId = location.hash.slice(1)
  if (initialId && linksByHash.has(initialId)) {
    activateAndSuspend(initialId)
  } else {
    setActive(orderedIds[0]!)
  }

  for (const [id, links] of linksByHash) {
    for (const link of links) {
      link.addEventListener('click', () => activateAndSuspend(id))
    }
  }

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1)
    if (id && linksByHash.has(id)) activateAndSuspend(id)
  })

  // Safety net for short final sections: guarantees the last section reads
  // active once the reader hits the bottom of the page, even if its content
  // is too short for the observer band to ever intersect it.
  let ticking = false
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (suspended) return
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        if (atBottom) setActive(orderedIds[orderedIds.length - 1]!)
      })
    },
    { passive: true },
  )
}

initScrollSpy()
