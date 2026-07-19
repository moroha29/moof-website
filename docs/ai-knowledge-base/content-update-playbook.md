# Content Update Playbook

## Standard Flow

1. Read the owner's Google Form response.
2. Identify the update type: seasonal menu, core menu, store info, homepage announcement, hours, or promotion.
3. Edit only the matching JSON content files.
4. Run `npm run build`.
5. Present a preview.
6. If the preview is wrong, apply the corrected owner instructions and rebuild.

## Seasonal Updates

Treat one Google Form response as a complete seasonal update batch. Replace the current seasonal content with the submitted batch unless the owner explicitly asks for an append, removal, or single-item correction.

Do not mark seasonal items inactive just because a date has passed. Visibility follows the owner-provided `active` state and the preview review.

## Missing Or Ambiguous Fields

If a required schema field is missing, ask the user before changing content. If the build passes but the business meaning is unclear, show the preview and let the owner correct the submitted update.

## Images

Use existing images from `public/images/` when possible. If the owner provides a new image, add it to `public/images/` with a descriptive lowercase filename and update the matching content item.
