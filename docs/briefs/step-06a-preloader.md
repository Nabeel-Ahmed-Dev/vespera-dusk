# Step 6a: Preloader (part 1 of step 6)

Branch step-06-preloader-hero. Contract: docs/motion-spec.md "Load / Preloader" + plan Step 6. Follow .cursor/rules/gsap.mdc and use src/lib/gsap.ts (register SplitText there if you use it; GSAP 3.15 ships SplitText in the free `gsap` package - verify the import path in node_modules/gsap).

Build src/components/motion/Preloader.tsx (client):
- Full-screen night (#0E0B08) overlay above everything (incl. nav and sticky bar).
- Clock counts 00:00 -> 18:47 (tabular nums, small tracked label style from the design system) while the letters D U S K rise out of an overflow mask (yPercent 100 -> 0, stagger).
- Then a gold curtain (#E7C07F -> #A9681F gradient) wipes up and the overlay leaves, revealing the hero. Total ~1.6s, expo.out.
- Skip on repeat visits in the same session via sessionStorage key 'vd-preloaded' (no flash of the overlay on repeat visits: decide visibility before first paint, e.g. a tiny inline script or a data attribute set in layout <head>, SSR-safe, no hydration mismatch).
- Reduced motion: no preloader at all.
- Lock scrolling while it runs (stop Lenis / prevent native scroll) and restore after; dispatch a 'vd:preloaded' window event (and expose a promise/flag) so hero animations in 6b can start after it.
- Must not block LCP badly: the hero markup renders underneath; overlay only covers it.
- Accessibility: aria-hidden overlay, page content not hidden from screen readers.

Don't start a dev server (one runs on :3000). pnpm lint && pnpm build must pass. Commit "feat: preloader (clock, DUSK mask rise, gold curtain)". Report files and how it decides first vs repeat visit.
