# Moof Client Bake-Off: Designs B, C, and D

## Goal

Prepare three intentionally differentiated Moof website concepts for client review, publish them alongside Design A, and preserve enough separation that the client can select one concept or combine chosen sections later.

## Shared Constraints

- Each design remains an independent Astro project under `b/`, `c/`, or `d/`.
- Each project must generate `/` and `/menu` beneath its configured GitHub Pages base path.
- The existing plain-JavaScript data modules remain acceptable for this comparison release, as recorded in ADR 0002. Content Collection migration is deferred until the client selects the surviving concepts or sections.
- Client-visible navigation, responsive behavior, and base-path links must work before deployment.
- Each design receives its own context glossary, delta specification, and brand/copy rules so future agents preserve its identity.
- The existing GitHub Actions workflow remains the release mechanism: integrate the three variants into `main`, verify all four builds, and push `main`.

## Design B: Playful Tsujiri Reinterpretation

Design B takes structural inspiration from Tsujiri Singapore rather than copying its current visual treatment. It retains the progression from tea provenance to products, locations, and social content, then deliberately translates that structure into a louder Moof direction: chunky rounded typography, hard outlines and shadows, sticker-like labels, saturated green/yellow/orange blocks, and irreverent conversational copy.

The implementation will preserve the existing hero, ingredient stories, core and seasonal product grids, location cards, and Instagram mosaic. It will add usable mobile navigation, repair homepage-fragment links from the menu route, and resolve the orange/white contrast problem without reducing the concept's energy.

## Design C: Kyō Kohee-Inspired Editorial Calm

Design C is the closest reference-led concept. It draws from Kyō Kohee's warm neutral palette, restrained letter-spaced navigation, generous whitespace, editorial typography, quiet hospitality language, location storytelling, and guest-review rhythm. It remains a distinct Moof design by using Moof's green accents, matcha product cutouts, compact menu, and two-tea ritual story instead of Kyō Kohee's full-bleed café media, multi-location map, and commerce controls.

Design C is the audience-led concept for an aesthetics-conscious "matcha girlie": a socially active customer who chooses cafés partly for visual identity, photo-worthy drinks and spaces, seasonal novelty, and the feeling of discovering a tasteful place worth sharing. The site should feel aspirational without becoming cold or luxury-coded beyond Moof's price point. Copy stays warm, concise, and saveable; photography and drink cutouts carry more of the persuasion than dense product claims.

The implementation will preserve its deliberately sparse hero, ritual section, short menu, testimonial band, and visit card. It will add a compact accessible mobile navigation treatment, a curated seasonal/social edit built from Moof's existing drink imagery, and an explicit Instagram path that feels native to the composition rather than bolted on. Narrow phone layouts must remain calm, tactile, and screenshot-friendly rather than crowded.

## Design D: Conversion-First Mobile Concept

Design D is not derived from either reference. It is the direct-response option: bold forest/cream/coral blocks, a short journey from promise to proof to seasonal urgency, and persistent directions access designed to turn mobile visitors into store visits.

The implementation will preserve its hero, social proof, seasonal urgency, compact menu, visit section, and sticky directions bar. It will correct the sticky bar's safe-area/bottom-spacing contract so it never obscures footer content and will retain clear source labels for supplied customer quotes without inventing attribution.

## Testing and Review

Each variant will add a lightweight Node test suite covering its repaired behavior and base-path contract. Every behavior change follows a red-green cycle. Each agent will run its local tests and production build, then commit only its own variant directory. After integration, the root workflow-equivalent build will run for A, B, C, and D, followed by visual phone-width checks of the three new variants.

## Release

The independently reviewed variant commits will be integrated into `main` without discarding the existing staged documentation work. A push to `main` triggers `.github/workflows/deploy.yml`, which installs and builds every present variant and deploys the combined Pages artifact under `/a`, `/b`, `/c`, and `/d`.
