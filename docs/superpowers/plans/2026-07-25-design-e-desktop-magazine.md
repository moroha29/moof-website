# Design E Desktop Magazine Spread Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Design E's desktop homepage show its Menu, The counter, and Visit paths together in a Lula-inspired magazine spread without changing the mobile experience.

**Architecture:** The existing `EditorialPanel` markup remains data-driven. Desktop-only CSS changes the existing `.editorial-index` to a named three-panel grid at `900px`; the home index remains a one-column stack under that breakpoint. The story and visit sections gain matching desktop grid rules.

**Tech Stack:** Astro 5, CSS Grid, Node test runner.

## Global Constraints

- Do not change E's mobile layout below `900px`.
- Keep the existing Home and Menu URLs, approved media, and A–D variants unchanged.
- Keep all three editorial links visible in the first desktop viewport.

---

### Task 1: Add a tested desktop magazine layout

**Files:**
- Modify: `e/src/styles/global.css`
- Modify: `e/tests/site-contract.test.mjs`

**Interfaces:**
- `.editorial-index` becomes a desktop CSS grid at `min-width: 900px`.
- `.editorial-panel:nth-child(1)` is the large Menu feature; the other panels occupy the right column.

- [ ] **Step 1: Write the failing desktop-layout source assertions**

```js
assert.match(css, /@media\s*\(min-width:\s*900px\)[\s\S]*\.editorial-index\s*\{[^}]*grid-template-columns:/);
assert.match(css, /\.editorial-panel:nth-child\(1\)\s*\{[^}]*grid-row:\s*span 2;/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test e/tests/site-contract.test.mjs`

Expected: FAIL because no desktop magazine grid exists.

- [ ] **Step 3: Implement the desktop grid and supporting print-style section layout**

```css
@media (min-width: 900px) {
  .editorial-index { grid-template-columns: 1.45fr 1fr; grid-template-rows: repeat(2, minmax(20rem, 29rem)); }
  .editorial-panel:nth-child(1) { grid-row: span 2; }
}
```

Tighten the desktop headline spacing and use two columns for the story and visit content. Do not put these rules in the existing `max-width: 600px` block.

- [ ] **Step 4: Run tests, build, and inspect a desktop preview**

Run: `node --test e/tests/site-contract.test.mjs && npm run build --prefix e`

Expected: all tests pass and `e/dist/` builds.

- [ ] **Step 5: Commit and deploy the layout change**

```bash
git add e docs/superpowers
git commit -m "Make Design E a desktop magazine spread"
git push origin main
```
