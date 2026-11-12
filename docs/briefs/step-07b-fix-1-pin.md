# Step 7b fix 1 - Pin the Scent Pyramid on desktop and scroll through the row highlights

Branch: step-07b-scent-pyramid (checked out). Edit ONLY src/components/sections/ScentPyramid.tsx. Do not touch other files, do not start a dev server (one runs on :3000), do not commit.

## Nabeel's request
On desktop the Scent Pyramid section sticks to the screen while scrolling, and continued scrolling steps through the row highlights exactly like the current hover effect does. Mobile stays exactly as it is now.

## 1. Make the section fit one screen on desktop (prerequisite for pinning)
Right now the section is 912-950px tall at desktop sizes, taller than 720/768/864/900px screens. Under lg only (>=1024px wide), the section must be exactly 100dvh tall (use lg:h-[100dvh] with flex column + justify-center on the inner wrapper) with ALL content visible, nothing clipped or overlapping:
- Replace lg:py-32 with a fluid vertical padding, e.g. lg:py-[clamp(2.5rem,7dvh,6rem)].
- Scale the pyramid svg on lg with viewport height, e.g. lg:max-w-[min(420px,calc((100dvh-380px)*1.13))] (tune the numbers so it works), keep its aspect ratio.
- Tighten lg vertical gaps with dvh-based clamps if needed (e.g. row py, svg top margin). Typography sizes stay the same.
- Must fit at 1024x768, 1280x720, 1366x768, 1440x900, 1536x864, 1920x1080. Below lg nothing changes at all (keep every existing base and sm class untouched).

## 2. Pin + scroll-driven highlights (desktop branch of matchMedia only: min-width 1024px and prefers-reduced-motion: no-preference)
- ScrollTrigger on the section: trigger section, start "top top", end "+=" + (window.innerHeight * 2.4) (function value so it recalcs on refresh), pin: true, pinSpacing: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1.
- Timeline driven by that trigger, using the SAME visual states as hover (matching band opacity 1, other two bands 0.3, other rows 0.45, highlighted row 1):
  - 0 to 8%: everything at full (all rows/bands 1).
  - then Top (I, The First Light) highlighted, hold.
  - then Heart (II, The Golden Hour) highlighted, hold.
  - then Base (III, The Night) highlighted, hold.
  - last ~10%: everything returns to full before the pin releases.
  Each crossfade ~ 0.35 of a phase, with holds so each tier is clearly readable on its own. Order is Top -> Heart -> Base (reading order of the rows).
- Animate only opacity on the row elements and band g elements (the same elements hover uses). This must not fight the reveals: reveals animate scaleY on bands and y/opacity on the row's children (label, h3, pills), never on the row element or band opacity. Keep it that way.
- Hover on desktop: while the pin is active (self.isActive), hover/focus handlers must do nothing so scroll stays in control; before and after the pin range, hover works as now. On leaving the pin range in either direction, states are all back to 1 (the timeline end/start states guarantee this).
- The existing reveal triggers (top 60% / top 65%) stay; they finish before or as the pin starts. Because pinning adds pin spacing, make sure every reveal trigger in this section still fires correctly (create the pin trigger first in this component, or call ScrollTrigger.refresh() after creating all of them).
- Reduced motion on desktop: no pin, no scrub; static as today, hover dim instant.
- Mobile/tablet (< 1024px): exactly today's behaviour, no pin, no highlight sequence.
- Resizing across 1024px must cleanly revert/rebuild via matchMedia (no leftover pin-spacer, no stuck opacity).

## Must not happen
- No jump when the pin engages or releases, no content clipped, no horizontal scroll, no console errors or warnings.
- The global sunset gradient (src/components/motion/SunsetBackground.tsx, ends at #notes top) and every later section must still be positioned correctly.

## Verify before reporting
npm run lint and npm run build pass. Report what changed.
