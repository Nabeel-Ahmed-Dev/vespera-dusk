# Step 7b - Scent Pyramid motion

Branch: step-07b-scent-pyramid (already checked out). Edit ONLY src/components/sections/ScentPyramid.tsx (and src/lib/gsap.ts only if a plugin is not yet registered). Do not touch other sections. Do not start a dev server (one already runs on :3000). Do not commit.

## Pattern to follow
Mirror src/components/sections/Story.tsx exactly for structure: "use client", useGSAP scoped to the section ref, gsap.matchMedia with desktop/mobile/reduced-motion branches, plugin imports from src/lib/gsap.ts, cleanup handled by useGSAP. Keep all existing markup, classes, data- attributes and content; only add refs, wrappers and handlers needed for motion.

## Triggers (Nabeel's rule: reveals start LATER, not as soon as the section enters)
- Use start "top 60%" for the headline/body and "top 65%" for the pyramid and each tier row. Never 80%/85%.
- once: true (play once, do not reverse on scroll back).

## Behaviours (docs/motion-spec.md "Scent Pyramid", plus the Story headline style for consistency)
1. Headline: the two [data-headline-line] spans reveal exactly like the Story headline (SplitText lines in overflow masks, yPercent 100 -> 0, 0.9s, stagger 0.12, expo.out; the italic line comes from x: 40). Body paragraph fades up (y 24 -> 0, opacity 0 -> 1, 0.9s expo.out) 0.2s after the headline starts. Reuse the same SplitText/mask approach Story uses (autoSplit/mask lines, revert on cleanup).
2. Bands fill bottom-up in the order Base -> Heart -> Top: each [data-pyramid-band] g goes scaleY 0 -> 1 from its bottom edge, 0.6s, stagger 0.15, ease expo.out. Set the origin with GSAP (transformOrigin "50% 100%") and REMOVE the inline style transformOrigin/transformBox and the origin-bottom class from those g elements so CSS and GSAP do not fight. Bands must end at exactly scale 1 with no gap between bands.
3. Note pills: for each [data-pyramid-row], when that row hits "top 65%", its [data-note-pill] spans fade up (y 16 -> 0, opacity 0 -> 1, 0.5s, stagger 0.04, expo.out). The row label and h3 fade up first (y 20 -> 0, 0.7s) with the pills following 0.15s later.
4. Hover highlight (only under @media (hover: hover) and (pointer: fine), desktop): hovering OR keyboard-focusing (focus-within) a tier row highlights the matching band (data-pyramid-row value equals data-pyramid-band value: top/heart/base) at opacity 1 and dims the other two bands to opacity 0.3 and the other rows to opacity 0.45; on leave everything returns to 1. Tween 0.35s power2.out with overwrite "auto". Do not use scale or layout changes for the hover. Hover must never fight the reveal: animate opacity on the band/row elements only after their reveal has completed, or animate a wrapper/different property so reveal end states stay intact.
5. Mobile (below lg): same reveals but shorter: headline 0.7s, bands 0.5s stagger 0.12, pills stagger 0.03. No hover handlers.
6. prefers-reduced-motion: reduce: no transforms at all; everything is visible immediately at final state (no hidden start). Hover dimming may stay but must be instant (duration 0).

## Must not happen
- No flash of fully-visible content before the hidden start state is applied, and no element left stuck at opacity 0 or scale 0 if the user loads mid-page or scrolls fast (once: true triggers that are already past must play/complete).
- No horizontal scroll, no layout shift, no console errors or React warnings, no hydration mismatch.
- Only transform/opacity/clip-path are animated.

## Verify before reporting
npm run lint and npm run build both pass. Report exactly what changed, file by file.
