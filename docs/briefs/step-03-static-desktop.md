# Step 3 brief: static desktop layout

You are the developer. Read AGENTS.md, .cursor/rules/*, docs/plan.md (Step 3), docs/design.md, docs/motion-spec.md (only for which DOM hooks future motion needs). STEP 3 ONLY, branch step-03-static-desktop.

Goal: replace the temporary style guide on / with the full static desktop composition at 1440px, matching design-handoff/desktop_00_fullpage_overview.png, desktop_01_hero.png, desktop_02_story.png, desktop_03_offer.png (look at these images) and structure/markup cues from design-handoff/web/mobile_v2.html and base.css. Figma desktop node 4-2 is source of truth if the Figma MCP works; don't block on it.

Sections in order, one server component each under src/components/sections/: Nav, Hero, Story, ScentPyramid, CraftVessel, SocialProof, OfferBuy, GuaranteeFaq, FinalCtaFooter. Shared primitives under src/components/ui/ (Button pill, Label, SectionShell). All text from src/content/site.ts only (extend it if a string is missing; no hardcoded copy). Images via next/image from public/images; hero bottle priority.
Static colors per section matching the design (hero gold, story/notes darker amber->night, proof/offer ivory, final CTA night). No gradient scroll animation yet.
Add stable hooks for later motion: data-section="hero" etc. on each section, and className hooks/data attributes on elements motion-spec animates (bottle, DUSK letters as separate spans, headline lines, stats, pyramid bands, marquee track, review cards, magnetic CTAs, price, stock meter, FAQ items). FAQ can use native <details>/<summary> for now. Offer size toggle can be static buttons (no state needed beyond basic if trivial).
Out of scope: GSAP, Lenis, mobile polish (just don't break below 1024 terribly), new dependencies.
Verify: pnpm lint && pnpm build pass. Commit: "feat: step 3 static desktop layout". Report files, and any spots where you deviated from the screenshots.
