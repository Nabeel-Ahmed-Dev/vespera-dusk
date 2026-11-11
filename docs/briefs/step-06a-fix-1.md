# Step 6a fix 1: preloader QA issues

Branch step-06-preloader-hero. Frame captures at 150/600/1100/1600ms (1440x900, first visit) show:
1. The DUSK letters are not visible at any point during the preloader - only the small clock shows on the night overlay. DUSK must be large (same font/size as the hero wordmark, ivory/gold on night), centered, letters rising out of an overflow mask, clearly visible from ~200ms to the curtain. Check color contrast, mask height, and that the letters aren't hidden by the boot CSS or opacity 0 left over.
2. The exit looks like the dark overlay just sliding up; no gold curtain is visible. Make the gold curtain (#E7C07F -> #A9681F) visibly wipe up from the bottom over the night overlay, then the whole preloader leaves to reveal the hero. Keep total ~1.6-1.8s, expo.out.
3. Hydration error x3 in the console ("A tree hydrated but some attributes of the server rendered HTML didn't match"), caused by the head boot script adding data-vd-preloaded to <html> (and any other pre-hydration attribute). Fix properly: suppressHydrationWarning on <html> (and <body> if touched), or move the flag so React never reconciles it. Zero hydration errors on first and repeat visits.
Clock: keep, but make it the small tracked label under or above DUSK.
Don't start a dev server. pnpm lint && pnpm build must pass. Commit "fix: preloader visibility, gold curtain, hydration".
