# Moof AI Knowledge Base

This knowledge base is for AI agents maintaining the Moof static website. It is committed inside the repository so future maintenance does not depend on hidden prompts, external notes, or memory from previous tasks.

## Moof In One Paragraph

Moof is a playful specialty matcha store. The website should feel product-led, phone-first, and warm: deep matcha green drinks against orange/peach menu-inspired backgrounds, soft white lettering, and a rounded `Moof` logo feel.

## Routine Maintenance

Routine maintenance means content-only updates from the store owner's Google Form response. Safe routine updates include seasonal drinks, prices, active status, homepage announcement, featured drink, store copy, and ingredient descriptions.

The hero carousel is also content-maintained. To change the top carousel drinks or their order, edit `hero.carouselDrinkIds` in `src/content/site/homepage.json`. Keep seasonal drink IDs first unless the owner explicitly asks for another order.

Routine maintenance does not include redesigns, new page types, checkout, ordering, CMS login, live Google integration, or custom feature work.

## Safe Files

Agents may edit these during routine maintenance:

- `src/content/site/homepage.json`
- `src/content/menu/core.json`
- `src/content/menu/seasonal.json`
- files in `docs/ai-knowledge-base/` when the content schema or workflow changes

## Avoid During Content-Only Updates

Do not edit these for routine content updates unless the user explicitly asks for a design or structure change:

- `src/components/`
- `src/layouts/`
- `src/pages/`
- `src/styles/`
- `astro.config.mjs`
- `package.json`

## Required Validation

After editing content, run `npm run build`. Then show a page preview to the owner or user. If the preview is wrong, the owner should revise the form response or provide corrected instructions.
