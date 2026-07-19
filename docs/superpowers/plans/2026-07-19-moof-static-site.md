# Moof Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a phone-first Astro static site for Moof with a product-led hero carousel, editable menu content, an about section for Mori and Shiran, transparent drink assets, and a repo-local AI maintenance knowledge base.

**Architecture:** Use Astro for static HTML and local JSON content files as the source of truth. Keep routine maintenance in `src/content/` and `docs/ai-knowledge-base/`; keep layout components in `src/components/`.

**Tech Stack:** Astro, TypeScript, JSON content files, CSS, static PNG assets.

## Global Constraints

- Brand name is `Moof`.
- Main product signal is matcha.
- Visual direction follows the supplied menu photos: warm orange/peach background, deep matcha green, soft white lettering, rounded playful logo feel.
- Layout may reference CHAGEE's product-led structure, but must remain Moof-branded and avoid copying CHAGEE assets.
- First segment shows all drinks with a horizontally scrollable carousel optimized for phone users.
- Keep only menu and about sections after the first product segment.
- Maintenance means content-only updates from owner Google Form responses.
- Repo content files are the source of truth after validation passes.
- AI knowledge base must be committed inside this repository.
- No CMS login, live Google Forms API integration, checkout, ordering, or owner-facing admin panel in the first version.

---

## File Structure

- `package.json`: Astro scripts and dependencies.
- `astro.config.mjs`: static Astro configuration.
- `tsconfig.json`: TypeScript settings.
- `src/content/config.ts`: validates site and menu data.
- `src/content/site/homepage.json`: Moof hero, ingredient, about, and store copy.
- `src/content/menu/core.json`: core menu items.
- `src/content/menu/seasonal.json`: seasonal menu items.
- `src/components/DrinkCarousel.astro`: horizontal product carousel.
- `src/components/MenuSection.astro`: content-driven menu display.
- `src/components/AboutSection.astro`: about and ingredient story.
- `src/layouts/BaseLayout.astro`: page shell and metadata.
- `src/pages/index.astro`: full Moof page.
- `src/pages/menu.astro`: focused menu route.
- `src/styles/global.css`: responsive visual system.
- `public/images/*.png`: transparent drink cutouts.
- `docs/ai-knowledge-base/*.md`: future-agent maintenance knowledge base.

## Task 1: Astro Project And Content Contract

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/content/config.ts`
- Create: `src/content/site/homepage.json`
- Create: `src/content/menu/core.json`
- Create: `src/content/menu/seasonal.json`

**Interfaces:**
- Produces content collections named `site` and `menu`.
- Menu entries expose `items`, each with `name`, `category`, `price`, `description`, `image`, `temperatureOptions`, `milkOptions`, `isSeasonal`, and `active`.

- [ ] **Step 1: Create Astro setup files**

Create minimal Astro setup with `dev`, `build`, and `preview` scripts.

- [ ] **Step 2: Create content schemas**

Use Astro Content Collections and `z` schemas to validate site and menu JSON.

- [ ] **Step 3: Add initial Moof content**

Add homepage copy for Moof, Mori, Shiran, the product carousel, and realistic menu items based on the supplied menu photo.

- [ ] **Step 4: Install dependencies and build**

Run `npm install`, then `npm run build`. Expected: Astro generates static pages successfully.

## Task 2: Product-Led Moof Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/DrinkCarousel.astro`
- Create: `src/components/MenuSection.astro`
- Create: `src/components/AboutSection.astro`
- Create: `src/pages/index.astro`
- Create: `src/pages/menu.astro`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes `homepage`, `core`, and `seasonal` content entries.
- Produces `/` and `/menu`.

- [ ] **Step 1: Build base layout**

Create a Moof header with simple anchor navigation and metadata.

- [ ] **Step 2: Build hero carousel**

Create a phone-first product hero with oversized matcha display text and horizontal scroll cards.

- [ ] **Step 3: Build menu and about sections**

Render active menu items and ingredient story from content.

- [ ] **Step 4: Style the page**

Use warm orange/peach background, matcha green, white type, rounded cards, and responsive carousel behavior.

- [ ] **Step 5: Build**

Run `npm run build`. Expected: both pages compile.

## Task 3: AI Knowledge Base

**Files:**
- Create: `docs/ai-knowledge-base/README.md`
- Create: `docs/ai-knowledge-base/content-update-playbook.md`
- Create: `docs/ai-knowledge-base/google-form-field-map.md`
- Create: `docs/ai-knowledge-base/brand-and-copy-rules.md`

**Interfaces:**
- Produces repo-local guidance for future agents.

- [ ] **Step 1: Document safe maintenance files**

List content files agents may edit for routine maintenance and layout files they should avoid.

- [ ] **Step 2: Document Google Form mapping**

Map owner form fields to JSON content fields.

- [ ] **Step 3: Document validation**

Require build validation and preview review before publishing.

- [ ] **Step 4: Build**

Run `npm run build`. Expected: docs do not affect build and the site still compiles.
