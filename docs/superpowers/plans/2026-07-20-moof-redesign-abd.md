# Moof Redesign A, B, and D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Designs A, B, and D with three clearly differentiated, responsive Moof Home + Menu experiences while preserving C.

**Architecture:** Each Astro project remains independent under its existing directory. Components, local data modules/content, styles, and source-contract tests change only within that variant; each task commits in its own worktree and is integrated into `main` after review.

**Tech Stack:** Astro 5, plain JavaScript/TypeScript-flavoured Astro components, CSS, Node built-in test runner.

## Global Constraints

- C is unchanged.
- Retain Home and Menu routes under every variant's configured GitHub Pages base path.
- Use existing supplied facts and imagery only; no invented reviews, health outcomes, urgency, or operational promises.
- Phone layouts must fit their viewport with no document-level horizontal overflow.
- Every task starts with a failing contract, then runs its variant test suite and production build.

---

### Task 1: Rebuild Design A — Handmade Local, Lightly Whimsical

**Files:** Modify only `a/src/**` and `a/tests/**`; retain current content facts under `a/src/content/**`.

**Interfaces:** Home route is `a/src/pages/index.astro`; Menu route is `a/src/pages/menu.astro`; base-path helper is `a/src/lib/base.js`.

- [ ] Write a failing contract for the handmade/whimsical Home signature, accessible Home/Menu navigation, and an overflow-safe phone layout.
- [ ] Replace the existing component composition and stylesheet with a warm local-counter composition: crafted hero, daily/seasonal drinks, local ingredient/counter notes, menu preview, and vertical visit cards; use restrained hand-drawn details.
- [ ] Rebuild Menu as an easy-to-scan curated counter menu and preserve route links/base path.
- [ ] Run `npm --prefix a test` and `npm --prefix a run build`; commit the variant change.

### Task 2: Rebuild Design B — Wellness, Curated Ingredients

**Files:** Modify only `b/src/**` and `b/tests/**`.

**Interfaces:** Home route is `b/src/pages/index.astro`; Menu route is `b/src/pages/menu.astro`; current editable facts are `b/src/data/site.js` and `b/src/data/menu.js`.

- [ ] Write a failing contract for ingredient-led Home content, absence of unsupported health claims, accessible Home/Menu navigation, and responsive layout.
- [ ] Replace the existing components and stylesheet with a calm, ingredient-led Home: ingredient hero, standards/source section, drink-choice preview, menu preview, and visit information.
- [ ] Rebuild Menu around clear tasting/ingredient scanning while preserving factual menu data and base-path links.
- [ ] Run `npm --prefix b test` and `npm --prefix b run build`; commit the variant change.

### Task 3: Rebuild Design D — Simplistic

**Files:** Modify only `d/src/**` and `d/tests/**`.

**Interfaces:** Home route is `d/src/pages/index.astro`; Menu route is `d/src/pages/menu.astro`; current editable facts are `d/src/data/site.js` and `d/src/data/menu.js`.

- [ ] Write a failing contract for the minimal Home composition, absence of conversion-first sticky/urgency/review UI, accessible Home/Menu navigation, and responsive layout.
- [ ] Replace the current conversion-first component composition and CSS with a pared-back Home: introduction, featured drinks, simple menu path, and location.
- [ ] Rebuild Menu as a single clear product list with ample spacing and no sticky conversion UI; preserve factual data and base-path links.
- [ ] Run `npm --prefix d test` and `npm --prefix d run build`; commit the variant change.

### Task 4: Integrate and deploy

**Files:** Verify `.github/workflows/deploy.yml` and all variant directories.

- [ ] Review each task commit against `docs/superpowers/specs/2026-07-20-moof-redesign-abd-design.md`.
- [ ] Integrate reviewed commits into `main` without modifying C.
- [ ] Run every variant's tests and production build, then verify the deployed GitHub Actions run after pushing `main`.
