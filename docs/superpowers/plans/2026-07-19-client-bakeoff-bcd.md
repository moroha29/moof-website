# Moof B/C/D Client Bake-Off Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish, document, test, integrate, and deploy three differentiated Moof concepts: playful B, aesthetics-first editorial C, and conversion-first D.

**Architecture:** B, C, and D remain isolated Astro projects in separate linked worktrees and branches. Each task changes only its own variant directory, adds a Node test contract before behavior changes, and produces one independently cherry-pickable commit. The root agent integrates those commits into `main`, runs the workflow-equivalent four-site build, performs responsive visual QA, and pushes `main`.

**Tech Stack:** Astro 5, TypeScript, ESM JavaScript data modules, Node's built-in test runner, CSS, GitHub Pages.

## Global Constraints

- Preserve the visual identities approved in `docs/superpowers/specs/2026-07-19-client-bakeoff-bcd-design.md`.
- Keep data modules independent per ADR 0002; do not migrate B, C, or D to Content Collections for this bake-off.
- Generate both `/` and `/menu` beneath `/moof-website/<variant>/`.
- Use existing Moof facts, image assets, prices, quotes, and links; do not invent customer attribution or business facts.
- Add `CONTEXT.md`, a delta spec, and `docs/ai-knowledge-base/brand-and-copy-rules.md` inside each variant.
- Run tests and a production build in every variant before committing.
- Never add `node_modules/`, `.astro/`, or `dist/` to Git.

---

### Task 1: Finish Design B in Its Existing Worktree

**Files:**
- Modify: `b/package.json`
- Modify: `b/src/components/Nav.astro`
- Modify: `b/src/styles/global.css`
- Create: `b/tests/site-contract.test.mjs`
- Create: `b/CONTEXT.md`
- Create: `b/docs/superpowers/specs/2026-07-19-design-b-delta.md`
- Create: `b/docs/ai-knowledge-base/brand-and-copy-rules.md`

**Interfaces:**
- Consumes: `withBase(path)` from `b/src/lib/base.js` and the existing B page/component structure.
- Produces: homepage-qualified fragment links, accessible mobile navigation, accessible orange CTA contrast, a repeatable `npm test` command, and B's documented identity.

- [ ] **Step 1: Add the failing B contract test and test script**

Add `"test": "node --test tests/*.test.mjs"` to `package.json`. The test reads `Nav.astro`, `global.css`, and `astro.config.mjs`, and asserts that fragment destinations are built from the homepage base, a visible mobile-navigation control exists with an accessible label, the mobile CSS does not hide every `.nav-label` without a replacement, the orange CTA foreground/background pair is no longer `#fff` on `#ff6a1a`, and the configured base is `/moof-website/b`.

```js
test("menu-route navigation qualifies homepage fragments", () => {
  assert.match(nav, /withBase\("\/"\)/);
  assert.doesNotMatch(nav, /href:\s*"#(?:origin|find-us)"/);
});

test("phone navigation remains operable", () => {
  assert.match(nav, /aria-label="(?:Open|Toggle) navigation"/);
  assert.match(css, /@media\s*\(max-width:\s*860px\)/);
});
```

- [ ] **Step 2: Run B tests and verify RED**

Run: `npm test`

Expected: fragment-link, mobile-navigation, and contrast assertions fail against the current implementation.

- [ ] **Step 3: Repair B navigation and contrast**

Use the existing `withBase` helper to qualify `/#origin` and `/#find-us` on every route. Add an accessible compact mobile control/menu that retains B's rounded, outlined visual language. Replace the failing orange/white combination with an ink foreground or a darker orange that meets accessible contrast while retaining the orange accent.

- [ ] **Step 4: Document B's bounded context**

Record the canonical terms `Playful Reinterpretation`, `Ingredient Story`, `Seasonal Drop`, and `Social Mosaic` in `b/CONTEXT.md`. The delta spec must name Tsujiri as structural inspiration and explicitly describe the visual divergence. Brand rules must preserve chunky type, hard shadows, saturated blocks, energetic copy, and the prohibition on copying Tsujiri assets or trade dress.

- [ ] **Step 5: Verify and commit B**

Run: `npm test && npm run build`

Expected: all tests pass; Astro emits `dist/index.html` and `dist/menu/index.html` with the B base path.

Commit only `b/` with message `Finish playful Design B concept`.

---

### Task 2: Finish Aesthetics-First Design C in Its Existing Worktree

**Files:**
- Modify: `c/package.json`
- Modify: `c/src/components/Header.astro`
- Create: `c/src/components/SeasonalSocialEdit.astro`
- Modify: `c/src/pages/index.astro`
- Modify: `c/src/styles/global.css`
- Create: `c/tests/site-contract.test.mjs`
- Create: `c/CONTEXT.md`
- Create: `c/docs/superpowers/specs/2026-07-19-design-c-delta.md`
- Create: `c/docs/ai-knowledge-base/brand-and-copy-rules.md`

**Interfaces:**
- Consumes: `seasonal` from `c/src/data/menu.js`, `withBase(path)` from `c/src/lib/base.js`, and the existing C editorial sections.
- Produces: accessible compact phone navigation; a three-item, data-driven seasonal/social edit; a composed Instagram CTA; tests and documentation for the aesthetics-first audience.

- [ ] **Step 1: Add the failing C contract test and test script**

Add `"test": "node --test tests/*.test.mjs"`. Assert that the header contains an accessible mobile navigation disclosure, the homepage renders `SeasonalSocialEdit`, the component maps the existing `seasonal` array rather than duplicating drink facts, the Instagram URL is present, and the base is `/moof-website/c`.

```js
test("the seasonal edit stays data-driven and social", () => {
  assert.match(indexPage, /SeasonalSocialEdit/);
  assert.match(edit, /seasonal\.map/);
  assert.match(edit, /instagram\.com\/moof__bar/);
});

test("the editorial header has an accessible phone treatment", () => {
  assert.match(header, /aria-label="(?:Open|Toggle) navigation"/);
});
```

- [ ] **Step 2: Run C tests and verify RED**

Run: `npm test`

Expected: mobile-navigation and seasonal-social-edit assertions fail because neither exists yet.

- [ ] **Step 3: Implement the aesthetics-first social edit**

Create a section between the compact menu and testimonials. It uses the existing seasonal drink names and images, an editorial heading such as `The seasonal edit`, restrained numbered/cards composition, and one explicit `@moof__bar` call to action. Keep the section warm, photo-led, screenshot-friendly, and visually consistent with the Kyō Kohee-inspired composition. Do not add invented claims, prices, or testimonials.

- [ ] **Step 4: Implement compact editorial mobile navigation**

Add a semantic button/disclosure or equivalent accessible control that exposes Story, Menu, Visit, and Instagram on narrow screens. Desktop navigation remains unchanged. Ensure 320px layouts do not overflow, and retain restrained typography and spacing.

- [ ] **Step 5: Document C's bounded context**

Record `Editorial Calm`, `Seasonal Edit`, `Photo Moment`, and `Quiet Hospitality` in `c/CONTEXT.md`. The delta spec must name Kyō Kohee as inspiration, enumerate the deliberate differences, and identify the aesthetics-conscious matcha customer as the primary audience. Brand rules must preserve warm neutrals, generous whitespace, editorial type, concise copy, and non-copying reference use.

- [ ] **Step 6: Verify and commit C**

Run: `npm test && npm run build`

Expected: all tests pass; Astro emits both routes with the C base path.

Commit only `c/` with message `Finish aesthetics-first Design C concept`.

---

### Task 3: Finish Conversion-First Design D in Its Existing Worktree

**Files:**
- Modify: `d/package.json`
- Modify: `d/src/styles/global.css`
- Create: `d/tests/site-contract.test.mjs`
- Create: `d/CONTEXT.md`
- Create: `d/docs/superpowers/specs/2026-07-19-design-d-delta.md`
- Create: `d/docs/ai-knowledge-base/brand-and-copy-rules.md`

**Interfaces:**
- Consumes: the existing `StickyDirectionsBar.astro`, `site.directionsUrl`, and D page flow.
- Produces: one CSS custom-property contract for actual sticky-bar height plus safe-area spacing, tests, and D's documented conversion identity.

- [ ] **Step 1: Add the failing D contract test and test script**

Add `"test": "node --test tests/*.test.mjs"`. Assert that the mobile body bottom padding and sticky CTA use the same minimum-height variable, both include `env(safe-area-inset-bottom)`, the desktop breakpoint removes the reserved space and sticky bar, the directions link comes from `site.directionsUrl`, and the base is `/moof-website/d`.

```js
test("sticky directions spacing shares one safe-area-aware contract", () => {
  assert.match(css, /--sticky-cta-height:\s*70px/);
  assert.match(css, /padding-bottom:\s*calc\(var\(--sticky-cta-height\)\s*\+\s*env\(safe-area-inset-bottom\)\)/);
  assert.match(css, /min-height:\s*var\(--sticky-cta-height\)/);
});
```

- [ ] **Step 2: Run D tests and verify RED**

Run: `npm test`

Expected: the shared height/safe-area contract assertion fails against the current `64px` body reservation and separately padded CTA.

- [ ] **Step 3: Repair the sticky directions contract**

Set the shared height to the actual 70px minimum, reserve `calc(var(--sticky-cta-height) + env(safe-area-inset-bottom))` below mobile content, give the bar the same minimum height, and apply the safe-area inset inside the bar. At `min-width: 641px`, remove body padding and hide the sticky bar as before.

- [ ] **Step 4: Document D's bounded context**

Record `Walk-In Conversion`, `Directions CTA`, `Seasonal Urgency`, and `Social Proof` in `d/CONTEXT.md`. The delta spec must describe D as independent from the two references and document its phone-first sequence. Brand rules must preserve forest/cream/coral contrast, direct copy, persistent directions, and the rule against invented customer attribution.

- [ ] **Step 5: Verify and commit D**

Run: `npm test && npm run build`

Expected: all tests pass; both routes emit with the D base path and footer content has enough mobile bottom clearance.

Commit only `d/` with message `Finish conversion-first Design D concept`.

---

### Task 4: Integrate, Review, and Deploy

**Files:**
- Preserve: all existing staged root and Design A changes
- Integrate: committed `b/`, `c/`, and `d/` trees
- Verify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: the three reviewed worktree commits.
- Produces: one `main` tree containing A/B/C/D and a successful GitHub Pages workflow run.

- [ ] **Step 1: Review each variant diff**

Compare each branch from `6be1646` to its final commit against the shared design spec and the relevant task above. Resolve every Critical or Important finding in the owning worktree and re-run its local tests/build.

- [ ] **Step 2: Preserve and integrate**

Confirm the root staged diff belongs to the bake-off documentation restructure, commit it separately if still pending, then cherry-pick the B, C, and D commits onto `main`. Do not reset or discard existing work.

- [ ] **Step 3: Run the workflow-equivalent build**

Run for every variant:

```sh
for dir in a b c d; do
  npm --prefix "$dir" ci
  npm --prefix "$dir" test
  npm --prefix "$dir" run build
done
```

Expected: four successful installs, test suites, and production builds; each `dist/` contains `/index.html` and `/menu/index.html`.

- [ ] **Step 4: Perform responsive visual QA**

Inspect B, C, and D at 320px, 375px, 430px, and desktop width. Verify navigation is operable, no horizontal overflow appears, C's social edit reads as intentional and photo-led, and D's sticky CTA never covers footer content.

- [ ] **Step 5: Push and verify deployment**

Push `main`, wait for the `Deploy to GitHub Pages` workflow, and verify its build and deploy jobs succeed. Confirm the deployed `/a/`, `/b/`, `/c/`, and `/d/` home and menu routes respond successfully.
