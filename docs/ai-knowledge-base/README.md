# Moof AI Knowledge Base

This knowledge base is for AI agents maintaining the Moof static website. It is committed inside the repository so future maintenance does not depend on hidden prompts, external notes, or memory from previous tasks.

## Moof In One Paragraph

Moof is a specialty matcha and hojicha bar at 70 Shenton Way, #01-15, Eon Shenton, Singapore CBD, built around hand-whisked drinks and two exclusive Japanese matcha ingredients, Mori and Shiran. See `CONTEXT.md` (per design variant) for the full business glossary.

## Multiple Design Variants

This repo holds several parallel design variants of the same site (`a/`, `b/`, `c/`, `d/`, ...) as part of a client bake-off — see `CONTEXT-MAP.md` at repo root for the current list. Each variant is an independent Astro project with its own `package.json`, content files, and images; editing one variant's content never changes another's. Each variant has its own `docs/superpowers/specs/` delta spec covering its creative direction and a `docs/ai-knowledge-base/` note for anything variant-specific (e.g. carousel behavior, custom interactive sections) that this shared knowledge base doesn't cover.

Routine content maintenance (see below) must be applied to whichever variant(s) the request targets — an update is not automatically shared across variants.

## Routine Maintenance

Routine maintenance means content-only updates from the store owner's Google Form response. Safe routine updates include seasonal drinks, prices, active status, homepage announcement, featured drink, store copy, ingredient descriptions, about image, location copy, operating hours, and Instagram link.

Routine maintenance does not include redesigns, new page types, checkout, ordering, CMS login, live Google integration, or custom feature work.

## Canonical Content Model

The target content model for every variant is Astro Content Collections with Zod schema validation (see `docs/adr/0002-shared-schema-independent-variant-data.md`). Variants not yet migrated to this model still follow the same field names and shapes where practical, to keep future migration and cross-variant feature reuse cheap.

## Safe Files (per variant)

Agents may edit these during routine maintenance, inside the target variant's folder:

- `<variant>/src/content/site/homepage.json`
- `<variant>/src/content/menu/core.json`
- `<variant>/src/content/menu/seasonal.json`
- files in `docs/ai-knowledge-base/` (shared) or `<variant>/docs/ai-knowledge-base/` (variant-specific) when the content schema or workflow changes

## Avoid During Content-Only Updates

Do not edit these for routine content updates unless the user explicitly asks for a design or structure change:

- `<variant>/src/components/`
- `<variant>/src/layouts/`
- `<variant>/src/pages/`
- `<variant>/src/styles/`
- `<variant>/astro.config.mjs`
- `<variant>/package.json`

## Required Validation

After editing content, run `npm run build` inside the target variant's folder. Then show a page preview to the owner or user. If the preview is wrong, the owner should revise the form response or provide corrected instructions.
