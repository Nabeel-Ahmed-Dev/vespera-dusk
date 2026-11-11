# Step 6c - Hero fits one screen on desktop + load entrance

Branch: step-06c-hero-fit-entrance (already checked out, based on main). Small step: src/components/sections/Hero.tsx ONLY. Do not touch Story, Preloader timing (2.4s), other sections, or the existing bob/tilt/scrub/DUSK drift/light sweep behavior.

Nabeel's feedback: (1) On desktop the bottom hero content (tagline, description, stock line, Add to bag button, Discover Dusk, perks, scroll hint) is pushed below the fold. The whole hero must fit inside 100dvh on desktop so everything is visible at once. (2) On page load/reload the hero content is static. It must animate in.

## 1. Desktop fit (lg and up only; mobile/tablet layout must stay exactly as is)
- Root cause: the stage box uses lg:aspect-[16/9] at up to 1320px wide (about 740px tall), so with nav padding and the bottom row it exceeds the viewport.
- On lg: make the inner hero container exactly h-[100dvh] (keep min-h for smaller screens), flex column. The stage becomes lg:flex-1 lg:min-h-0 with no aspect ratio, so it shrinks to whatever space is left after the top metas and the bottom row.
- Inside the stage, size DUSK and the bottle from the stage height, not just the width, so they never overflow: e.g. the bottle height-limited (max-h about 100% of the stage, width auto, keep its aspect) and the DUSK font size clamped with min(..vw, ..dvh). Keep the composition: DUSK behind the bottle at the top, bottle centered, edition mark top right.
- Tighten bottom spacing on lg if needed (scroll hint margin, gaps) but keep the design look.
- Acceptance: at 1440x900, 1280x720, 1366x768 and 1920x1080, the scroll hint's bottom edge is at or above window.innerHeight at scroll 0, and nothing overlaps the tagline or the button. At 1440x900 the look stays close to the current design.

## 2. Load entrance (runs right after whenPreloaded() resolves, on first visit AND on reload when the preloader is skipped)
- Use one gsap.timeline in the existing useGSAP/matchMedia setup, before the idle loops start:
  - DUSK chars (existing SplitText chars) rise: yPercent 100 to 0 with the wordmark clipped (overflow hidden on its line wrapper; do not change its layout), stagger 0.05, 1.1s, expo.out. Use yPercent on the chars only; the scroll drift uses x, so they combine. Reset y: 0.
  - Bottle: opacity 0 to 1 and y 40 to 0 plus scale 0.96 to 1, 1.2s, expo.out, starting 0.15s in. Put this on a NEW innermost wrapper or on the existing bob wrapper before the bob starts; it must not fight scrub (outer) or tilt (mid). Start the bob after the entrance finishes.
  - Top metas, vertical label and edition mark: opacity 0 to 1, 0.8s, starting 0.3s in.
  - Tagline (.js-headline-line in h1, already overflow-hidden): yPercent 100 to 0, 0.9s, expo.out, starting 0.45s in. Description: opacity 0 to 1 + y 12 to 0.
  - Right column (stock, button, discover link, perks) and the scroll hint: opacity 0 to 1 + y 16 to 0, stagger 0.08, starting 0.6s in.
  - The first light sweep plays after the entrance ends (keep the existing armIdle logic, just start it later).
- No flash: hide the elements with gsap.set at the start of the matchMedia callback. Because the preloader is skipped on reload, add a tiny CSS guard: set data-hero-entering on the hero root on the server markup, make the animated targets visibility hidden while it is set (via a global CSS rule scoped to [data-hero-entering]), and remove the attribute once the gsap.set has run. Under prefers-reduced-motion and with JS disabled the content must still show: the CSS guard only applies under html.js or a class the client adds, so no-JS users see everything.
- Mobile: same entrance with distances halved.
- Reduced motion: only a 0.3s opacity fade of the whole hero content.

## Rules
- Animate only transform / opacity. Never Tailwind translate/rotate/scale utilities on tweened nodes. Inline transforms become px y, so reset y: 0 with yPercent.
- No new dependencies. Do not start a dev server (one is already running on :3000).
- npm run lint and npm run build must pass. Commit on this branch with message "feat(hero): fit 100dvh on desktop, load entrance timeline". Do not push.
- Report: files changed, how the stage is sized on lg, and the entrance timeline order.
