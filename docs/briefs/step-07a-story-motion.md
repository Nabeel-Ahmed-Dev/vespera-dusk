# Step 7a - Story motion

Branch: step-07a-story-motion (already checked out). Small step: Story section ONLY (src/components/sections/Story.tsx). Do not touch Hero, Preloader, Scent Pyramid or any other section. Scent Pyramid is step 7b.

Read docs/motion-spec.md (Story, Mobile, Reduced motion) and src/components/sections/Hero.tsx for the existing patterns first. Use helpers from src/lib/gsap.ts (gsap, ScrollTrigger, SplitText, useGSAP, mmConditions, EASE_REVEAL, DURATION) and whenPreloaded from src/lib/preloader.ts. Verify APIs against current GSAP 3.15 docs (gsap.com/docs): SplitText (type lines, mask, autoSplit/onSplit), gsap.matchMedia, ScrollTrigger once/toggleActions.

Story must become a client component (or move motion into a small client child) - keep next/image and the static markup as is.

## What to build (useGSAP + gsap.matchMedia, scoped to the section, cleaned up on unmount, set up after whenPreloaded())

1. Headline: the three .js-headline-line spans inside the h2 already sit in overflow-hidden wrappers. Animate each from yPercent 100 to 0, duration 0.9, stagger 0.12, ease expo.out. The italic line (second) also comes from x: 40 to 0. Trigger when the h2 top hits ~80% of the viewport, play once.
2. Body paragraph (the p with js-headline-line): SplitText type lines with mask "lines", lines yPercent 100 to 0, 0.9s, stagger 0.12, expo.out, play once when it enters (~85%). Use autoSplit/onSplit so resize re-splits correctly. Attribution line: simple opacity 0 to 1 + y 16 to 0 after the body.
3. Image (.js-story-image): clip-path reveal from bottom to top: inset(100% 0 0 0) to inset(0% 0 0 0), 1.2s, expo.out, while the inner image scales 1.15 to 1 over the same time. Scale the next/image element or a wrapper, not the clipped box. Play once at ~80%.
4. Stats (.js-stat), play once when the stats row enters:
   - 18:47 ticks like a clock: count minutes from 18:00 up to 18:47 over ~1.4s (power2.out), always rendering HH:MM with zero padding.
   - 22% counts up 0 to 22 with the % kept; 12h+ counts 0 to 12 with h+ kept. ~1.4s power2.out.
   - Server/initial HTML must keep the final values (no JS = correct numbers); the tween sets the start value only when the trigger arms. Add aria-label with the final value on each number so screen readers never read intermediate numbers.
   - Stats fade/rise in with stagger 0.1 as they count.
5. NO 01 badge (.js-edition-badge): rotate 360 deg every 20s, ease none, repeat -1. Pause it when the section is off screen (ScrollTrigger onToggle) to save work.
6. Mobile (mmConditions.mobile): same reveals but shorter: durations x0.75, no italic x offset, image zoom 1.08 to 1. Badge rotation kept.
7. Reduced motion (mmConditions.reduce): no splits, clip, zoom, counting or rotation. Headline, body, image and stats each do a 0.3s opacity fade in when they enter. Final values shown.

## Rules
- Animate only transform / opacity / clip-path. Set initial states with GSAP (gsap.set inside the matchMedia context), never Tailwind translate/rotate/scale utilities, and remember inline transforms get parsed into px y - reset y: 0 when using yPercent.
- No layout change at rest: after reveals finish, Story must look exactly like it does now at 1440 and 390.
- No flash of the final state before the reveal: elements below the fold must be hidden by gsap.set before the first paint they would be visible in (they are below the fold at load, so setting in the matchMedia callback after whenPreloaded is fine).
- No new dependencies. Do not start a dev server (one is already running on :3000).
- Run npm run lint and npm run build; both must pass. Commit on this branch with message "feat(story): line mask reveals, image clip, stat count-up, badge spin". Do not push.
- Report: files changed, how the counters keep correct SSR values, and anything you could not do.
