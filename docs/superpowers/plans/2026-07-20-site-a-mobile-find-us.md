# Site A Mobile Find Us Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Site A's review/tasting carousel panels and make Find Us vertically readable on mobile.

**Architecture:** `DrinkCarousel.astro` owns the visual carousel and its client-side selection updates, so it will stop rendering and updating the removed panels. `global.css` owns responsive layout, so its mobile breakpoint will switch Find Us to a one-column layout with no x-axis overflow.

**Tech Stack:** Astro, TypeScript-flavoured Astro components, CSS, Node built-in test runner.

## Global Constraints

- Do not alter supplied menu content or the desktop Find Us card row.
- Keep Site A deployable under its configured GitHub Pages base path.
- Add behavior contracts before implementation and run them red then green.

---

### Task 1: Simplify featured carousel

**Files:** Modify `a/tests/homepage-source.test.mjs` and `a/src/components/DrinkCarousel.astro`.

- [ ] Add a failing source contract that rejects `hero-review`, `hero-tasting`, `data-review-quote`, and `data-tasting-row` in the component.
- [ ] Run `npm --prefix a test` and confirm the test fails because the panels currently exist.
- [ ] Remove the panels, their drink-card attributes, and their script update branches.
- [ ] Run `npm --prefix a test` and confirm all tests pass.

### Task 2: Stack Find Us on mobile

**Files:** Modify `a/tests/homepage-source.test.mjs` and `a/src/styles/global.css`.

- [ ] Add a failing source contract for a one-column `.find-us-grid` and `overflow-x: visible` within the mobile breakpoint.
- [ ] Run `npm --prefix a test` and confirm the test fails because mobile inherits the horizontal scroller.
- [ ] Add mobile-only rules that change the grid to one vertical column, remove x-axis scrolling, and let all cards use the available width.
- [ ] Run `npm --prefix a test` and confirm all tests pass.

### Task 3: Verify and ship

**Files:** Verify `a/dist/index.html`.

- [ ] Run `npm --prefix a test` and `npm --prefix a run build`; both must pass.
- [ ] Review the diff for only the requested carousel and Find Us changes.
- [ ] Commit and push `main`, then verify the GitHub Pages workflow succeeds.
