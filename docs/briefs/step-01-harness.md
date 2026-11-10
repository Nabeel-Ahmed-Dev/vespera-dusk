You are the developer on "Vespera Dusk #01", a Next.js landing page in this repo (D:\codes\vespera-dusk). Scope: STEP 1 ONLY = project harness docs. Do NOT build any UI, sections, or animations. Do NOT touch package.json versions.

Already done: scaffold (Next 16.4.6 App Router, src/, Turbopack, React 19.3.1, Tailwind 4.3.5 CSS-first, TS 5.9.3 + ESLint 9 because typescript-eslint doesn't support TS 7 / eslint-plugin-react doesn't support ESLint 10 yet; gsap 3.15.1, @gsap/react 2.1.2, lenis 1.3.27). Design handoff in design-handoff/ (web/mobile_v2.html, web/motion.html, web/base.css, screenshots). Images copied to public/images/. Read AGENTS.md (Next's generated one) and keep its guidance.

Create these files (Karpathy-style: small, verifiable steps; human approves; one step = one branch = one reviewable change):
1. docs/plan.md — product summary + the 10-step roadmap below, each with goal, scope, out-of-scope, acceptance criteria, verification commands. Step 1 marked done when this lands.
   1 Scaffold + harness + assets (this step)
   2 Design tokens (@theme in globals.css), next/font (Cormorant Garamond 300/400/500+italics display; Manrope 400-800 body; Montserrat 600 logo), single content file src/content/site.ts for all placeholder copy
   3 Static desktop layout of all sections (Nav, Hero, Story, Scent Pyramid, Craft/Vessel, Social Proof, Offer/Buy, Guarantee+FAQ, Final CTA+Footer), no animation
   4 Mobile 390 layout
   5 Motion foundation: Lenis driven by gsap.ticker, GSAP plugin registration module, gsap.matchMedia desktop/mobile/reduced-motion, scroll-linked sunset gradient via CSS vars
   6 Preloader + Hero (bottle idle/tilt/scrub, DUSK SplitText)
   7 Story + Scent Pyramid reveals
   8 Craft, Social Proof (marquee, Draggable+Inertia carousel), magnetic CTAs, custom cursor
   9 Offer size toggle + stock meter + drawer, sticky buy bar, FAQ accordion, Final CTA
   10 Accessibility (WCAG 2.2), reduced motion, performance pass
2. docs/workflow.md — roles: Nabeel = approver/CEO (merges only on explicit OK); Technical Project Manager = orchestrator (writes briefs, reviews, browser-QA); Cursor agent = developer. Per step loop: brief -> branch step-NN-slug -> small commits -> pnpm lint && pnpm build pass -> PM review + browser check -> Nabeel approval -> merge to main. Local-only git for now (no remote yet).
3. docs/design.md — tokens: night #0E0B08, night9 #16110C, amber7 #7A4A12, amber6 #A3651C, honey4 #E0AE5C, honey3 #EDC98A, honey2 #F3DDB2, cream #F6EEDF, cream5 #FBF7EF, hero gold #E7C07F, mid amber #A9681F. Typography rules: labels 10px/600/.22em uppercase Manrope; logo Montserrat 600 .4em; buttons pill radius 999, 13px/600/.12em uppercase. Figma: https://www.figma.com/design/emx0mVTFBsYuDGjTLhUppY desktop node 4-2 (source of truth), mobile node 24-2 (visual ref), motion notes node 13-2. Figma MCP quota may be exhausted; prefer design-handoff/ files. All copy is placeholder.
4. docs/motion-spec.md — paste the GSAP plan below verbatim-ish, organised per section.
5. .cursor/rules/*.mdc — project.mdc (always apply: stack, versions, step discipline, never expand scope), gsap.mdc (globs **/*.tsx: 'use client', register plugins once in src/lib/gsap.ts, useGSAP with scope, contextSafe for handlers, gsap.matchMedia, animate only transform/opacity/clip-path, no ScrollSmoother since Lenis is used, cleanup), tailwind.mdc (v4 CSS-first @theme, no tailwind.config, no @tailwind directives), nextjs.mdc (App Router, server components by default, client islands for motion, next/image priority on hero, next/font).
Then commit on main: "chore: step 1 harness docs and rules". Report files created.

GSAP PLAN (from UI Designer):
Concept: the page is a sunset; scrolling is time passing golden hour -> night; the bottle is the sun we follow down. Plugins: ScrollTrigger, SplitText, Observer/Draggable + InertiaPlugin (reviews), Flip optional for size toggle. Lenis driven by gsap.ticker (not ScrollSmoother). useGSAP + gsap.context; gsap.matchMedia for desktop/mobile/reduced-motion. Feel: expo.out reveals, power2.inOut scrubs, elastic only on magnetic buttons, scrub: 1.
- Load: preloader clock 00:00 -> 18:47 while DUSK letters rise out of a mask, gold curtain wipes up. 1.6s expo.out. Skip on repeat visits (sessionStorage).
- Global bg: scroll-linked gradient #E7C07F -> #A9681F -> #0E0B08 from Hero to Notes via CSS vars in scrubbed ScrollTrigger; text colour flips at midpoint. Proof and Offer go ivory; Final CTA returns to night.
- Hero bottle: idle bob ±6px 4s yoyo; ±6° tilt toward cursor (quickTo); scroll scrub 0-100vh rotate 0 -> -14°, scale 1 -> 0.82 sinking into Story.
- Hero DUSK: SplitText chars; D,U drift left, S,K right at 0.6-1.2x speed then fade; scrubbed stagger 0.04.
- Liquid light sweep (Hero & Offer bottle): masked diagonal gradient crosses glass every 6s and on hover, 1.2s sine.inOut, mix-blend-mode screen.
- Story: SplitText lines in overflow masks yPercent 100 -> 0, 0.9s stagger 0.12 expo.out; italic line from x 40; image clip-path inset reveal bottom->top + zoom 1.15 -> 1; stats: 18:47 ticks like clock, 22% and 12h+ count up once; N° 01 badge rotates 360° every 20s.
- Scent Pyramid: bands fill bottom-up (Base->Heart->Top) scaleY from bottom 0.6s stagger 0.15; note pills fade up stagger 0.04; hover row highlights band, dims others.
- Craft/Vessel: label close-up scale 1.15 -> 1 scrub; inset photo parallax -80px; divider lines scaleX 0 -> 1 per row 0.8s power2.out.
- Social Proof: press marquee infinite 40s loop, slows on hover via timeScale; reviews Draggable carousel with inertia; stars fill L->R on enter.
- CTAs: magnetic within 80px strength 0.3, label counter-moves; hover honey fill rises from bottom 0.4s elastic.out(1,0.4).
- Sticky buy bar: y 80 -> 0 0.45s power3.out once hero CTA leaves viewport; hidden while Offer in view.
- Offer: size toggle rolls price digits $125 <-> $185 0.5s, updates price/ml; stock meter fills to 71% on enter 1.2s; Add to bag opens drawer offering $8 sample.
- FAQ: height auto-animate, + rotates to −, 0.35s power2.out; opening "What if it isn't for me?" highlights the 30-day promise.
- Final CTA: bg image zoom 1.1 -> 1, vignette deepens to night; "Wear the hour." letter by letter stagger 0.03; giant VESPERA footer rises with parallax.
- Cursor: 8px honey dot grows to 64px with "View"/"Drag" label over media; desktop/fine pointer only.
Mobile: no cursor/tilt/magnetic; keep bottle scrub & DUSK split with shorter distances; marquee becomes plain scroll on touch; swap pinning for simple reveals if janky.
Reduced motion: every scrub becomes 0.3s opacity fade; no parallax, marquee, idle loops, preloader. Honey focus rings, full keyboard access to accordion, carousel, toggles (WCAG 2.2).
Performance: only transform/opacity/clip-path; next/image for bottle PNGs with priority on hero.
