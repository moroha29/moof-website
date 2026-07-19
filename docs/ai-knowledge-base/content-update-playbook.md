# Content Update Playbook

## Standard Flow

1. Read the owner's Google Form response.
2. Identify the update type: seasonal menu, core menu, store info, homepage announcement, hours, or promotion.
3. Identify which design variant(s) the update targets (see `CONTEXT-MAP.md`). Default to all variants only if the owner explicitly says so.
4. Edit only the matching JSON content files inside that variant's folder.
5. Run `npm run build` inside that variant's folder.
6. Present a preview.
7. If the preview is wrong, apply the corrected owner instructions and rebuild.

## Seasonal Updates

Treat one Google Form response as a complete seasonal update batch. Replace the current seasonal content with the submitted batch unless the owner explicitly asks for an append, removal, or single-item correction.

Do not mark seasonal items inactive just because a date has passed. Visibility follows the owner-provided `active` state and the preview review.

Some variants derive a display order (e.g. a hero carousel) from seasonal-first drink ordering — check that variant's own `docs/ai-knowledge-base/` for whether an ordering field needs updating alongside the seasonal batch.

## Review And Tasting Fields

Every drink needs a `review` object (quote, reviewer name, reviewer image) and a `tasting` object (bitterness, aroma, nuttiness, sweetness as whole-number 1-5 scores) — this is part of the canonical content model (see `docs/adr/0002-shared-schema-independent-variant-data.md`) even for variants that don't currently display every field.

Use short, casual review quotes that look good in a compact phone layout. Use `reviewerImage` paths from that variant's `public/images/`, and do not imply that generated reviewer photos are verified real customers.

## Missing Or Ambiguous Fields

If a required schema field is missing, ask the user before changing content. If the build passes but the business meaning is unclear, show the preview and let the owner correct the submitted update.

## Images

Use existing images from the target variant's `public/images/` when possible. If the owner provides a new image, add it there with a descriptive lowercase filename and update the matching content item. Prefer individual drink cutouts over any shared group/overview image for single-drink cards.

## Location And Hours

Keep address, MRT guidance, operating hours, and Instagram link together in the variant's homepage/site-info content file. Keep each field short enough to scan on a phone.

## Variant-Specific Behavior

Some variants have unique interactive or layout behavior (e.g. a hero carousel, a custom announcement block) that affects how certain fields are maintained. Check that variant's own `docs/ai-knowledge-base/` for those specifics before editing.
