# Matcha Store Static Site Design

## Goal

Build a phone-first static website for Moof, a matcha store. The site should be easy for an AI agent to maintain from structured updates supplied by a nontechnical store owner through a Google Form. Maintenance should normally require content-file edits only, keeping token cost low and avoiding layout-code changes.

## Framework Choice

Use Astro with TypeScript and Astro Content Collections.

Astro is the preferred framework because the site is mostly static, content-led, and should ship fast HTML. Content Collections let the project validate local JSON or YAML files with schemas, which creates a stable contract for AI-maintained menu and store updates.

Avoid Next.js for the first version unless future requirements need app-like behavior. Next can export static sites, but it adds more framework surface area and more unsupported static-export edge cases for an agent to navigate.

## Site Structure

Create a compact static site with product-led sections:

- first segment: a CHAGEE-inspired product hero for Moof, with oversized matcha-focused display type, all visible drinks, and a horizontal carousel so phone users can swipe through matcha options.
- menu segment: core and seasonal drinks driven by editable content.
- about us segment: Moof story and the exclusive matcha ingredients Mori and Shiran from Japan.

The site should feel like one phone-first experience. If implemented with multiple routes, `/menu` can exist as a focused menu route, but the primary experience should keep menu and about content close together and easy to scan.

## Visual Direction

Use the supplied menu photo as brand context:

- soft, playful Moof identity
- matcha green as the primary product signal
- warm orange or peach accent inspired by the printed menu
- rounded, friendly typography
- drink imagery or image placeholders that are easy to replace
- mobile-first layout with large tap targets and scannable menu sections
- logo text should read `Moof` and feel rounded, soft, and playful, matching the supplied menu image's vibe rather than a formal wordmark
- background should reuse the original menu image's warm orange/peach color scheme or a soft pattern derived from it
- layout may reference the linked CHAGEE page's product-first structure, but must remain Moof-branded and not copy CHAGEE's brand assets

The page should avoid a generic luxury-tea look. It should feel like a modern specialty cafe with a memorable matcha identity.

## Content Model

Keep editable store content separate from page layout code.

Recommended files:

- `src/content/site/homepage.json`
- `src/content/site/store-info.json`
- `src/content/menu/core.json`
- `src/content/menu/seasonal.json`

The exact file names may change during implementation if Astro conventions make another structure cleaner, but the principle must remain: future seasonal updates should happen in content files, not components.

### Homepage Content

The homepage content should include:

- store name
- hero headline
- hero supporting copy
- featured ingredient names
- ingredient origins
- ingredient descriptions
- homepage announcement
- featured seasonal drink
- primary call to action
- top carousel drink IDs, ordered with seasonal drinks first unless the owner requests a different order

### Store Info Content

Store info should include:

- store hours
- address or location copy
- social links
- pickup or ordering notes
- temporary closure or holiday message

### Menu Item Content

Each menu item should include:

- name
- category
- price
- description
- image filename or placeholder key
- temperature options
- milk options
- seasonal availability
- dietary notes
- active or inactive status

The menu page should hide inactive items by default and visually mark seasonal items.

## Google Form Contract

The Google Form should collect predictable variables so the owner does not need to understand the repository.

Recommended fields:

- update type: seasonal menu, core menu, store info, homepage announcement, hours, promotion
- season name
- season start date
- season end date
- homepage announcement
- featured drink name
- ingredient update notes
- drink name
- drink category
- price
- short description
- temperature options
- milk options
- image filename or upload note
- active status
- owner notes for the AI agent

The AI agent should convert Google Form responses into the relevant content file changes and then run validation.

Routine seasonal updates should be treated as complete batches. The agent should replace the current seasonal content with the submitted batch unless the owner explicitly requests a narrower append, removal, or single-item correction.

Top carousel drinks should be interchangeable through content. The agent should update the homepage carousel ID list when seasonal items change, keeping seasonal drinks first by default.

## AI Knowledge Base

Add a repository knowledge base for future AI agents. It must be committed inside this repository, not stored in an external Google Doc, prompt, task description, or private operator notes. A future agent should be able to clone the repo, read the knowledge base, and complete routine content maintenance without needing hidden context.

The knowledge base should live in `docs/ai-knowledge-base/` and explain:

- what Moof is
- the purpose of each page
- how seasonal menu updates work
- how Google Form fields map to content files
- which files are safe for routine maintenance
- which files should not be edited during content-only updates
- the expected validation steps
- examples of common updates
- tone, copy, and brand rules

The knowledge base should be written for AI agents first and humans second. It should be explicit, structured, and example-heavy so a future agent can complete updates without broad repository exploration.

The knowledge base is part of the product deliverable. Content-only maintenance is not complete unless these docs stay accurate with the current content schema and site structure.

Recommended knowledge base files:

- `docs/ai-knowledge-base/README.md`
- `docs/ai-knowledge-base/content-update-playbook.md`
- `docs/ai-knowledge-base/google-form-field-map.md`
- `docs/ai-knowledge-base/brand-and-copy-rules.md`

## Components

Use a small component set:

- layout shell with header and footer
- homepage hero
- ingredient feature section
- menu section
- drink card
- store info section
- announcement or promo banner

Components should receive already-validated content data. They should not hard-code seasonal drink details.

## Data Flow

1. Store owner submits a Google Form response.
2. User gives the response export or copied response to an AI agent.
3. AI agent reads the knowledge base and maps fields to content files.
4. AI agent updates JSON or YAML content files.
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

Minimum validation:

- run the Astro build
- confirm content schema validation passes
- check that `/` and `/menu` generate successfully
- confirm phone-width layout does not rely on desktop-only spacing

For implementation, add lightweight content validation tests if the chosen Astro setup does not already fail clearly on invalid content.

## Out Of Scope For First Version

- CMS login
- live Google Forms API integration
- e-commerce checkout
- online ordering
- inventory management
- database-backed menu editing
- owner-facing admin panel

These can be added later, but the first version should preserve the low-maintenance static model.
