# Moof AI Knowledge Base

This knowledge base is for AI agents maintaining the Moof static website. It is committed inside the repository so future maintenance does not depend on hidden prompts, external notes, or memory from previous tasks.

## Moof In One Paragraph

Moof is a specialty matcha and hojicha bar at 70 Shenton Way, #01-15, Eon Shenton, Singapore CBD, built around hand-whisked drinks and two exclusive Japanese matcha ingredients, Mori and Shiran.

## One Site

This repo holds a single Astro project at the repository root, published at
`https://moroha29.github.io/moof-website/`. It was chosen from a six-way client bake-off
(design F); see `CONTEXT-MAP.md` for what changed and where the design history lives.

## Routine Maintenance

Routine maintenance means content-only updates from the store owner's Google Form response. Safe routine updates include seasonal drinks, prices, active status, homepage announcement, featured drink, store copy, ingredient descriptions, about image, location copy, operating hours, and Instagram link.

Routine maintenance does not include redesigns, new page types, checkout, ordering, CMS login, live Google integration, or custom feature work.

## Canonical Content Model

Content lives in two JSON files read directly by the pages (see
`docs/adr/0002-shared-schema-independent-variant-data.md` for the field names and shapes).
These are the same files the admin portal writes, so keep their keys stable.

## Safe Files

Agents may edit these during routine maintenance:

- `src/assets/content/site.json` — brand, SEO, homepage sections, location, hours, menu-page headings
- `src/assets/content/menu.json` — `coreMenu`, `seasonalMenu`, `additionalCategories`
- files in `docs/ai-knowledge-base/` when the content schema or workflow changes

## Avoid During Content-Only Updates

Do not edit these for routine content updates unless the user explicitly asks for a design or structure change:

- `src/pages/`
- `src/lib/`
- `public/styles.css`
- `astro.config.mjs`
- `package.json`

## Required Validation

After editing content, run `npm test` and `npm run build` at the repository root. Then show a page preview to the owner or user. If the preview is wrong, the owner should revise the form response or provide corrected instructions.
