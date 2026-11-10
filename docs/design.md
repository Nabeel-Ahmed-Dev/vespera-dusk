# Vespera Dusk — Design

All marketing copy is **placeholder** until content is finalized. Desktop layout is the source of truth; mobile is a visual reference.

## Figma

File: [Vespera Dusk](https://www.figma.com/design/emx0mVTFBsYuDGjTLhUppY)

| Frame | Node | Role |
|---|---|---|
| Desktop | `4:2` | **Source of truth** for layout |
| Mobile | `24:2` | Visual reference (390) |
| Motion notes | `13:2` | Motion intent |

Figma MCP quota may be exhausted. Prefer local handoff:

- `design-handoff/web/` — `base.css`, `motion.html`, `mobile_v2.html`, screenshots as present
- `public/images/` — bottle and atmosphere assets

## Color tokens

| Token | Hex | Notes |
|---|---|---|
| `night` | `#0E0B08` | Base night / Final CTA |
| `night9` | `#16110C` | Elevated night surface |
| `amber7` | `#7A4A12` | Deep amber |
| `amber6` | `#A3651C` | Mid amber UI |
| `honey4` | `#E0AE5C` | Primary honey |
| `honey3` | `#EDC98A` | Soft honey |
| `honey2` | `#F3DDB2` | Light honey |
| `cream` | `#F6EEDF` | Ivory / Proof & Offer surfaces |
| `cream5` | `#FBF7EF` | Lightest cream |
| Hero gold | `#E7C07F` | Sunset gradient start |
| Mid amber | `#A9681F` | Sunset gradient mid → night |

Scroll-linked page background (see `docs/motion-spec.md`): `#E7C07F` → `#A9681F` → `#0E0B08` from Hero through Notes via CSS variables. Text colour flips at midpoint. Proof and Offer go ivory; Final CTA returns to night.

## Typography

| Role | Family | Weights / style |
|---|---|---|
| Display | Cormorant Garamond | 300 / 400 / 500 + italics |
| Body / UI | Manrope | 400–800 |
| Logo | Montserrat | 600 |

### Rules

- **Labels:** Manrope, 10px / 600 / letter-spacing `0.22em` / uppercase
- **Logo:** Montserrat 600 / letter-spacing `0.4em`
- **Buttons:** pill `border-radius: 999`; Manrope 13px / 600 / letter-spacing `0.12em` / uppercase

Wire fonts with `next/font` in Step 2 (not Google CSS `@import` in production).

## Imagery

Bottle PNGs and scene images live under `public/images/`. Use `next/image`; hero bottle gets `priority`. Do not invent alternate brand photography in early steps — use handoff assets.
