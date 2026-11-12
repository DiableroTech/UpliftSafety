# Surface colors (Uplift Safety)

Three backgrounds we use on the marketing site:

| Name | Role | Hex / token | Tailwind |
|------|------|-------------|----------|
| **Plain white** | Cards, quote boxes, high-contrast panels | `#ffffff` | `bg-white` |
| **Eggshell white** | Default app canvas; most sections | `#eff0ef` | `bg-paper` (`--color-paper`) |
| **Grey-white** | Soft striped panels (Safety Services “People & culture” right column) | bands `#f4f4f3` / `#ecebea` | see `SafetyServices.tsx` `CategoryFeatured` |

Eggshell is the default: `Layout`, the Safety Services CTA (“Curious how we work…”), and most sections use `bg-paper` / `--color-paper`. Use plain white sparingly for elevated surfaces. Grey-white is only the striped **People & culture** right column on Safety Services, not a global token.
