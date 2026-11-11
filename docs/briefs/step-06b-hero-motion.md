# Step 6b - Hero motion

Branch: step-06b-hero-motion (already checked out). Small step: hero section ONLY. Do not touch other sections, the preloader timing (2.4s, set by Nabeel), or the footer.

Read docs/motion-spec.md (Hero, Mobile, Reduced motion sections) and src/components/sections/Hero.tsx first. Use helpers in src/lib/gsap.ts (gsap, ScrollTrigger, useGSAP, mmConditions, EASE_SCRUB, SCRUB) and whenPreloaded from src/lib/preloader.ts. SplitText is in the free gsap package: import { SplitText } from "gsap/SplitText" and register it in src/lib/gsap.ts. Verify APIs against current GSAP 3.15 docs (gsap.com/docs) - e.g. SplitText autoSplit/onSplit, gsap.matchMedia, gsap.quickTo.

## What to build (all in Hero, via useGSAP + gsap.matchMedia, cleaned up on unmount)

1. Entrance: start hero motion only after whenPreloaded() resolves, so nothing animates under the preloader.
2. Bottle idle bob: y +/-6px, 4s, yoyo, repeat -1, sine.inOut. Put the bob on an inner wrapper so it does not fight the scroll scrub or tilt.
3. Bottle cursor tilt (desktop + fine pointer only): rotation up to +/-6 deg toward the cursor x position over the hero, using gsap.quickTo (duration ~0.6, power3.out). Apply on a separate wrapper from the bob and the scrub. Reset to 0 on mouseleave.
4. Bottle scroll scrub: ScrollTrigger on the hero, start "top top", end "bottom top" (about 0-100vh), scrub SCRUB: rotate 0 to -14deg, scale 1 to 0.82, ease none or EASE_SCRUB. Own wrapper again (outer).
5. DUSK wordmark split: SplitText type chars on the hero wordmark. Scrubbed on the same 0-100vh range: D and U drift left, S and K drift right; per-char speed between 0.6x and 1.2x (e.g. x distances like D -18vw, U -10vw, S +10vw, K +18vw on desktop), stagger 0.04, and opacity to 0 over the last ~40% of the range. Keep the accessible text: SplitText aria handling or aria-label on the parent.
6. Liquid light sweep on the hero bottle: an absolutely positioned diagonal light gradient (transparent - rgba(255,255,255,0.55) - transparent) clipped to the bottle (use CSS mask-image with the bottle image URL, or wrap in overflow hidden matching the bottle box), mix-blend-mode: screen, pointer-events none. Animate xPercent across in 1.2s sine.inOut, repeat every 6s (repeatDelay ~4.8), and also play once on bottle hover (desktop only, do not stack - restart if idle).
7. Mobile (mmConditions.mobile): no tilt, no hover sweep (timed sweep OK), bob and scrub kept with shorter distances (DUSK drift about half), scale end 0.88.
8. Reduced motion (mmConditions.reduce): no bob, tilt, sweep or scrub. Only a 0.3s opacity fade-in of bottle and wordmark after preload.

## Rules
- Animate only transform / opacity. Initial states via GSAP or inline style, never Tailwind translate/rotate/scale utilities (Tailwind 4 individual transform properties conflict with GSAP).
- No layout change to the static hero at scroll 0 - it must still match the current design at 1440 and 390.
- No new dependencies. Do not start a dev server (one is already running on :3000).
- Run npm run lint and npm run build; both must pass. Commit on this branch with message "feat(hero): bottle bob/tilt/scrub, DUSK split drift, light sweep". Do not push.
- Report: files changed, wrapper structure for the bottle, and anything you could not do.
