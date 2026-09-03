# Content Update Playbook

## Standard Flow

1. Read the owner's Google Form response.
2. Identify the update type: seasonal menu, core menu, store info, homepage announcement, hours, or promotion.
3. Edit only `src/assets/content/site.json` and `src/assets/content/menu.json`.
4. Run `npm test` and `npm run build` at the repository root.
5. Present a preview.
6. If the preview is wrong, apply the corrected owner instructions and rebuild.

## Seasonal Updates

Treat one Google Form response as a complete seasonal update batch. Replace the current seasonal content with the submitted batch unless the owner explicitly asks for an append, removal, or single-item correction.

Do not mark seasonal items inactive just because a date has passed. Visibility follows the owner-provided `active` state and the preview review.

The homepage drink carousel renders `coreMenu` then `seasonalMenu` in file order, filtered to `active` items, so the order of the arrays is the order on the page.

## Review And Tasting Fields

The canonical content model (see `docs/adr/0002-shared-schema-independent-variant-data.md`) defines a `review` object (quote, reviewer name, reviewer image) and a `tasting` object (bitterness, aroma, nuttiness, sweetness as whole-number 1-5 scores). The current design renders neither, so do not chase the owner for them — but keep any values that already exist.

If review quotes are added back, use short, casual ones that look good in a compact phone layout, take `reviewerImage` paths from `public/images/`, and do not imply that generated reviewer photos are verified real customers.

## Missing Or Ambiguous Fields

If a required schema field is missing, ask the user before changing content. If the build passes but the business meaning is unclear, show the preview and let the owner correct the submitted update.

## Images

Use existing images from `public/images/` when possible. If the owner provides a new image, add it there with a descriptive lowercase filename and update the matching content item. Drink images are background-removed cutouts — the design floats them on a solid orange or walnut panel, so a photo with its own background will not sit right. Prefer individual drink cutouts over any shared group/overview image for single-drink cards.

## Location And Hours

Keep address, operating hours, map links, and Instagram link together in the `visit` and `business` blocks of `src/assets/content/site.json`. Keep each field short enough to scan on a phone.

## Site-Specific Behavior

The homepage drink carousel and the full menu page both read the same `menu.json`. The
`review` and `tasting` objects in the canonical model are not rendered by the current
design, so they are optional here — but keep any that already exist rather than dropping
them, so a future design change can use them.
