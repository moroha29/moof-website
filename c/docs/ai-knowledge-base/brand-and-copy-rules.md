# Design C Brand And Copy Rules

## Preserve

- Warm paper and cream neutrals with restrained matcha green and hojicha brown accents.
- Generous whitespace, thin rules, quiet rounded corners, and composed product cutouts.
- Editorial serif headings paired with small, letter-spaced sans-serif labels.
- Concise, welcoming copy grounded in real Moof menu and location facts.
- The sequence `Editorial Calm` → `Seasonal Edit` → `Photo Moment` → `Quiet Hospitality`.
- A calm 320px layout with one-column seasonal cards and a compact navigation disclosure.

## Seasonal Maintenance

Update drink facts only in `src/data/menu.js`. `SeasonalSocialEdit.astro` consumes the existing `seasonal` array and must not gain duplicated drink names, descriptions, prices, or image paths. Keep the Instagram link explicit and use the established `@moof__bar` account.

## Homepage And Store Maintenance

Update hero, ritual, ingredient, menu-introduction, testimonial-introduction, visit, address, hours, MRT, footer, and Instagram facts in `src/data/site.js`. Pages and shared components consume that module; do not duplicate these values in Astro layout files.

## Copy Guidance

Prefer short, sensory, unhurried phrases. Sound welcoming and observant, not exclusive or promotional. Do not invent awards, sourcing claims, customer identities, urgency, availability, or business facts.

## Reference Boundary

Kyō Kohee is composition and mood inspiration only. Never copy its assets, distinctive page layouts, wording, commerce patterns, logo treatment, or trade dress. New work must continue to use Moof's own product imagery, facts, palette, and small-bar story.
