# Moof Platform Spec

This is the shared, cross-variant foundation for all Moof static site design variants. It does not describe any one design's visual direction or page structure — see `<variant>/docs/superpowers/specs/` for each variant's delta spec.

## Goal

Build phone-first static websites for Moof, a matcha and hojicha bar, that are easy for an AI agent to maintain from structured updates supplied by a nontechnical store owner through a Google Form. Maintenance should normally require content-file edits only, keeping token cost low and avoiding layout-code changes.

## Design Variants

The repo holds multiple parallel design variants (`a/`, `b/`, `c/`, `d/`, ...) as part of a client bake-off — see `CONTEXT-MAP.md` at repo root for the current list and each variant's own glossary. The client may select one variant outright or request specific features/sections combined across variants; a shared content model (below) keeps that recombination cheap. Each variant is an independently deployed, independently maintained Astro project — editing one variant's data never affects another's.

## Framework Choice

Use Astro with TypeScript and Astro Content Collections, for every variant.

Astro is the preferred framework because the sites are mostly static, content-led, and should ship fast HTML. Content Collections let each project validate local JSON files with schemas, which creates a stable contract for AI-maintained menu and store updates, and keeps every variant's content shape compatible with the others for feature recombination.

Avoid Next.js unless future requirements need app-like behavior. Next can export static sites, but it adds more framework surface area and more unsupported static-export edge cases for an agent to navigate.

## Content Model

Keep editable store content separate from page layout code, in each variant's own content files (never shared/symlinked across variants — see `docs/adr/0002-shared-schema-independent-variant-data.md`).

Recommended files, per variant:

- `<variant>/src/content/site/homepage.json`
- `<variant>/src/content/menu/core.json`
- `<variant>/src/content/menu/seasonal.json`

The exact file names may vary by variant if Astro conventions make another structure cleaner, but the principle must remain: seasonal updates happen in content files, not components, and field names/shapes should track the canonical schema in `docs/ai-knowledge-base/google-form-field-map.md` wherever the variant's design supports the field.

### Homepage Content

- store name
- hero headline / supporting copy
- featured ingredient names, origins, descriptions
- homepage announcement
- featured seasonal drink
- primary call to action
- where-to-find-us details (address, hours, MRT note, Instagram link)

### Menu Item Content

Each menu item should include:

- name, category, price, description
- image filename
- temperature options, milk options
- `review` (quote, reviewer name, reviewer image) and `tasting` (bitterness/aroma/nuttiness/sweetness, 1-5)
- seasonal availability (`isSeasonal`), active/inactive status

Menu pages should hide inactive items by default and visually mark seasonal items.

## Google Form Contract

See `docs/ai-knowledge-base/google-form-field-map.md` for the full field map. The AI agent converts Google Form responses into content file changes in the targeted variant(s), then runs validation.

Routine seasonal updates should be treated as complete batches. The agent should replace the current seasonal content with the submitted batch unless the owner explicitly requests a narrower append, removal, or single-item correction.

## AI Knowledge Base

A repository knowledge base for future AI agents, committed inside the repo (not an external doc, prompt, or private notes), split into shared (root `docs/ai-knowledge-base/`) and variant-specific (`<variant>/docs/ai-knowledge-base/`) layers:

- `docs/ai-knowledge-base/README.md` — what Moof is, the bake-off structure, routine maintenance, safe/avoid files
- `docs/ai-knowledge-base/content-update-playbook.md` — standard update flow, seasonal batches, review/tasting fields
- `docs/ai-knowledge-base/google-form-field-map.md` — canonical field map
- `<variant>/docs/ai-knowledge-base/brand-and-copy-rules.md` — that variant's tone/visual rules

The knowledge base is part of the product deliverable. Content-only maintenance is not complete unless these docs stay accurate with the current content schema and site structure.

## Components

Components should receive already-validated content data. They should not hard-code seasonal drink details. Each variant defines its own component set in its delta spec.

## Data Flow

1. Store owner submits a Google Form response.
2. User gives the response export or copied response to an AI agent.
3. AI agent reads the knowledge base, identifies the target variant(s), and maps fields to content files.
4. AI agent updates JSON content files.
5. Astro Content Collections validate the content shape.
6. Agent runs the build.
7. Agent presents a page preview for review.
8. If the preview is wrong, the owner provides a revised form response or corrected instructions.
9. If validation passes and the preview is accepted, the static site can be published.

## Error Handling

The content schema should reject missing required fields, invalid prices, malformed dates, and invalid active statuses.

For optional fields such as images, components should render polished placeholders instead of broken media.

The agent should not automatically mark seasonal items inactive just because an end date has passed. Visibility should follow the owner-provided content state and the generated preview. If the preview shows stale seasonal content, the owner should revise the submitted update or give corrected instructions.

## Testing And Validation

Minimum validation, per variant:

- run the Astro build
- confirm content schema validation passes
- check that `/` and `/menu` generate successfully
- confirm phone-width layout does not rely on desktop-only spacing

## Out Of Scope For First Version

- CMS login
- live Google Forms API integration
- e-commerce checkout
- online ordering
- inventory management
- database-backed menu editing
- owner-facing admin panel

These can be added later, but the first version should preserve the low-maintenance static model across all variants.
