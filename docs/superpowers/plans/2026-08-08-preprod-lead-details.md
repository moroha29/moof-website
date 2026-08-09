# Preprod Lead Details Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve every original outreach input in each preprod demo and show those inputs in the deployed preprod index for business follow-up.

**Architecture:** Each `preprod/<slug>/demo.json` owns a normalized `lead` record in addition to the existing demo metadata. A focused Node script validates those records and renders the preprod HTML index; the GitHub Actions workflow calls that script after building demos. The `moof-demo-site` skill uses the same required schema for all future demos.

**Tech Stack:** Node.js 20, JSON, GitHub Actions, `node:test`, static HTML/CSS.

## Global Constraints

- Keep all original input fields: row number, outreach category, company name, Google Maps link, email/WhatsApp, other contact, remarks, and sample website.
- Empty source cells remain explicit empty strings and render as “Not provided.”
- Contact values become clickable only when they are valid URLs, email addresses, or phone-like values.
- Escape every lead-supplied value before placing it in HTML.
- Continue to isolate failed preprod builds from client-site deployment.

---

### Task 1: Add a tested preprod index generator

**Files:**
- Create: `scripts/generate-preprod-index.mjs`
- Create: `tests/preprod-index.test.mjs`

**Interfaces:**
- Consumes: a preprod source directory, built-site directory, output path, and generation timestamp.
- Produces: `generatePreprodIndex({ preprodDir, siteDir, outputFile, generatedAt })` and a CLI entry point.

- [ ] Write a failing Node test using temporary demo fixtures that asserts every lead field, empty-value fallback, live/build-failed status, safe links, and HTML escaping.
- [ ] Run `node --test tests/preprod-index.test.mjs` and confirm it fails because the generator does not exist.
- [ ] Implement the minimal generator and CLI needed by the test.
- [ ] Run `node --test tests/preprod-index.test.mjs` and confirm it passes.

### Task 2: Backfill complete lead records and wire deployment

**Files:**
- Modify: `preprod/*/demo.json`
- Modify: `.github/workflows/deploy.yml`
- Modify: `tests/preprod-index.test.mjs`

**Interfaces:**
- Consumes: the original `Copy of Coldest Email` columns recovered from the source workflow.
- Produces: one normalized `lead` object per current demo and a workflow invocation of the generator.

- [ ] Add a failing repository-contract test that scans every `preprod/*/demo.json` and requires the complete lead schema.
- [ ] Run the test and confirm current three-field files fail.
- [ ] Backfill the original inputs without inventing missing cells.
- [ ] Replace the workflow’s inline HTML builder with `node scripts/generate-preprod-index.mjs`.
- [ ] Run the contract test and generator test and confirm both pass.
- [ ] Generate a local index against the real metadata and inspect its key content.

### Task 3: Strengthen the demo-generation skill

**Files:**
- Modify in the `website-manager` repository: `.claude/skills/moof-demo-site/SKILL.md`

**Interfaces:**
- Consumes: the complete source row provided by `moof-lead-research` or the lead tracker.
- Produces: `demo.json` with `businessName`, `designBrief`, `createdDate`, and the required `lead` object.

- [ ] Establish the baseline by checking that the current skill explicitly permits the incomplete three-field schema.
- [ ] Replace that contract with the complete schema and require source-preserving empty strings rather than guesses.
- [ ] Validate the modified skill frontmatter and verify its example JSON parses.

### Task 4: Verify and publish

**Files:**
- Review all changed files in both repositories.

- [ ] Run the focused tests and syntax checks.
- [ ] Run representative preprod builds and the index generator.
- [ ] Review diffs for accidental unrelated changes or exposed non-source data.
- [ ] Commit each repository on a `codex/` branch, push both branches, and open one pull request per repository.
