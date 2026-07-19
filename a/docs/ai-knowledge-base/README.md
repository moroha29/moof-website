# Moof AI Knowledge Base

This knowledge base is for AI agents maintaining the Moof static website. It is committed inside the repository so future maintenance does not depend on hidden prompts, external notes, or memory from previous tasks.

## Moof In One Paragraph

Moof is a playful specialty matcha store. The website should feel product-led, phone-first, and warm: deep matcha green drinks against orange/peach menu-inspired backgrounds, soft white lettering, and a rounded `Moof` logo feel.

## Routine Maintenance

Routine maintenance means content-only updates from the store owner's Google Form response. Safe routine updates include seasonal drinks, prices, active status, homepage announcement, featured drink, store copy, ingredient descriptions, about image, location copy, operating hours, Instagram block copy, Instagram preview cards, and Instagram link.

The hero carousel is also content-maintained. To change the top carousel drinks or their order, edit `hero.carouselDrinkIds` in `src/content/site/homepage.json`. Keep seasonal drink IDs first unless the owner explicitly asks for another order. The website lets visitors click carousel cards or arrow buttons to change the displayed hero drink. Horizontal rail scrolling only reveals more cards; it must not change the displayed drink.

Each drink controls its own hero side panels through `review` and `tasting` fields in `src/content/menu/*.json`. `review` contains the quote, reviewer name, and reviewer image. `tasting` contains integer 1-5 scores for bitterness, aroma, nuttiness, and sweetness.

Each drink should point to its own product cutout in `public/images/`. Do not reuse `menu-drink-group-cutout.png` for individual menu cards unless a single-drink image is unavailable.

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
