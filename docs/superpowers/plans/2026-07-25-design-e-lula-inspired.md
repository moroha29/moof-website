# Design E Lula-inspired image index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Design E as a standalone Moof Home and Menu site with approved HungryGoWhere photography and a Lula-inspired editorial image-index layout.

**Architecture:** `e/` is an independent Astro static site, matching the other design-variant boundaries. A small data module owns business facts, menu content, editorial media metadata, and credits; focused page and component files render that source into the home image index and menu list. The root Pages workflow adds E to its existing build loop.

**Tech Stack:** Astro 5, static HTML/CSS, Node test runner, GitHub Pages.

## Global Constraints

- Deploy at `/moof-website/e/` and leave A–D untouched.
- Use only the HungryGoWhere Moof images approved by the user and retain `Photos: Zawani Abdul Ghani / HungryGoWhere` credit.
- Use Lula Cafe as an editorial-layout inspiration only; do not copy its branding, copy, or assets.
- Keep editable Moof facts in `e/src/data/site.js`.
- Preserve a responsive, single-column small-screen presentation without horizontal overflow.

---

### Task 1: Add approved editorial media and the Design E site shell

**Files:**
- Create: `e/package.json`
- Create: `e/astro.config.mjs`
- Create: `e/tsconfig.json`
- Create: `e/public/images/editorial/*.jpg`
- Create: `e/src/data/site.js`
- Create: `e/src/data/menu.js`
- Create: `e/src/lib/base.js`
- Create: `e/src/layouts/BaseLayout.astro`
- Test: `e/tests/site-contract.test.mjs`

**Interfaces:**
- Produces `site`, `editorialMedia`, `coreMenu`, and `seasonalMenu` as the only editable content sources for E.
- Produces `withBase(path: string): string` for all internal links and local media.

- [ ] **Step 1: Write the failing source-contract test**

```js
assert.match(siteData, /Photos: Zawani Abdul Ghani \/ HungryGoWhere/);
assert.match(mediaData, /editorial\/01-moof-exterior\.jpg/);
assert.match(config, /base:\s*["']\/moof-website\/e["']/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test e/tests/site-contract.test.mjs`

Expected: FAIL because the Design E files do not yet exist.

- [ ] **Step 3: Add the Astro shell, approved local image files, data modules, and base helper**

```js
export const withBase = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
```

Use image metadata objects shaped as `{ src, alt, credit, focal }`; give every article-derived asset an accurate descriptive alt string and the same approved credit.

- [ ] **Step 4: Run the source-contract test to verify it passes**

Run: `node --test e/tests/site-contract.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit the scaffold and media**

```bash
git add e
git commit -m "Add Design E editorial media shell"
```

### Task 2: Build the Lula-inspired editorial home index

**Files:**
- Create: `e/src/components/Header.astro`
- Create: `e/src/components/EditorialPanel.astro`
- Create: `e/src/components/VisitSection.astro`
- Create: `e/src/components/Footer.astro`
- Create: `e/src/pages/index.astro`
- Create: `e/src/styles/global.css`
- Modify: `e/tests/site-contract.test.mjs`

**Interfaces:**
- `EditorialPanel` accepts `{ item: { href, label, title, image } }`.
- `VisitSection` reads `site.visit` and has `id="visit"`.
- `Header` links only with `withBase` or home-page fragments.

- [ ] **Step 1: Extend the contract test with the intended page sequence**

```js
assert.match(homePage, /<Header\s*\/>[\s\S]*<EditorialPanel[\s\S]*<VisitSection\s*\/>[\s\S]*<Footer\s*\/>/);
assert.match(homePage, /editorialMedia\.map/);
assert.match(css, /overflow-x:\s*clip/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test e/tests/site-contract.test.mjs`

Expected: FAIL because the home composition has not been created.

- [ ] **Step 3: Implement the home as a full-width editorial image index**

```astro
{editorialMedia.map((item) => <EditorialPanel item={item} />)}
```

Use a warm cream backdrop, dark-brown text, oversized serif panel labels, image-led sections, a compact utility header, and no card grid. Make the panel target work with keyboard focus and preserve a single-column mobile layout.

- [ ] **Step 4: Run the test and static build to verify the home**

Run: `node --test e/tests/site-contract.test.mjs && npm run build --prefix e`

Expected: PASS and an `e/dist/` static build.

- [ ] **Step 5: Commit the home experience**

```bash
git add e
git commit -m "Build Design E editorial home"
```

### Task 3: Build the restrained menu and wire GitHub Pages deployment

**Files:**
- Create: `e/src/components/MenuList.astro`
- Create: `e/src/pages/menu.astro`
- Modify: `.github/workflows/deploy.yml`
- Modify: `e/tests/site-contract.test.mjs`

**Interfaces:**
- `MenuList` accepts `{ title, items }` and renders one native `<details>` element per drink.
- `menu.astro` imports `coreMenu`, `seasonalMenu`, `MenuList`, `Header`, and `Footer`.
- Workflow build loop contains `a b c d e` and copies `e/dist/` into `site/e/`.

- [ ] **Step 1: Extend the contract test for details-based drink information and Pages inclusion**

```js
assert.match(menuPage, /<MenuList title="Core" items=\{coreMenu\} \/>/);
assert.match(menuList, /<details/);
assert.match(menuList, /specialIngredients/);
assert.match(workflow, /for dir in a b c d e;/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test e/tests/site-contract.test.mjs`

Expected: FAIL because the menu and workflow support are missing.

- [ ] **Step 3: Implement the menu and deployment loop change**

```astro
<details>
  <summary>{item.name}<span>{item.price}</span></summary>
  <p>{item.description}</p>
  <p><strong>Ingredients</strong> {item.specialIngredients}</p>
  <p><strong>Why it stands out</strong> {item.distinctivePoint}</p>
</details>
```

Include two article image breaks in the menu using `editorialMedia` metadata. Use existing supplied menu facts and avoid invented claims.

- [ ] **Step 4: Verify all Design E tests and all five static builds**

Run: `node --test e/tests/site-contract.test.mjs && for variant in a b c d e; do npm run build --prefix "$variant" || exit 1; done`

Expected: all tests pass and every variant builds.

- [ ] **Step 5: Commit, push, and verify deployment**

```bash
git add e .github/workflows/deploy.yml
git commit -m "Deploy Design E image index"
git push origin main
```

Verify the Design E URL reported by the GitHub Pages deployment and one `/e/images/editorial/` asset after the workflow completes.
