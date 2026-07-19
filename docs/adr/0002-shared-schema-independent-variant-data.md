# Shared Content Schema, Independent Variant Data

We're running a client bake-off with multiple design variants of the Moof site (`a/`, `b/`, `c/`, `d/`), and the client may ask for features to be combined across variants rather than picking one outright. This creates two competing pressures: variants need a compatible content shape so a section can move from one variant to another cheaply, but a content edit made while iterating on one variant must never silently change another variant the client hasn't approved yet.

We resolve this by keeping the *schema* shared and the *data* independent:

- **Schema**: Astro Content Collections with Zod validation (per `0001-astro-content-files-for-ai-maintenance.md`) is the canonical content model for every variant, using the field names and shapes in `docs/ai-knowledge-base/google-form-field-map.md`. A section built against this schema in one variant can be ported to another with minimal rework.
- **Data**: each variant owns its own copy of content files and images under `<variant>/src/content/` and `<variant>/public/images/`. Nothing is symlinked or shared at build time. Editing `b/src/content/menu/core.json` never affects `a/`, `c/`, or `d/`.

Design B, C, and D were built quickly (via parallel agents) using plain JS data modules instead of Content Collections, deviating from the canonical schema. We're accepting that drift for now rather than migrating all three immediately — the client hasn't picked which sections survive yet, and migrating three data layers ahead of that decision risks wasted work. Each variant's delta spec flags this as a known gap; migrate to Content Collections only for whichever variant(s)/sections the client actually selects going forward.

This was a genuine trade-off (schema consistency vs. build speed for a comparison-only deliverable), it's hard to reverse once client feedback starts referencing specific sections by variant, and it would be surprising to a future agent that three of the four sites don't validate content the way the platform spec says they should — hence the ADR.
