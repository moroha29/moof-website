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

After changing seasonal items, update `hero.carouselDrinkIds` in `src/content/site/homepage.json` so seasonal drinks appear first in the top carousel. The carousel accepts menu item IDs and displays active matching drinks in that exact order. If `hero.carouselDrinkIds` is empty, the site falls back to active seasonal drinks first, followed by active core drinks.

## Hero Review And Tasting Panels

Every drink needs a `review` object and a `tasting` object. These fields appear beside the selected drink in the hero carousel, so they must be filled for both seasonal and core menu items.

Use short, casual review quotes that look good in a compact phone layout. Use `reviewerImage` paths from `public/images/`, and do not imply that generated reviewer photos are verified real customers. Set bitterness, aroma, nuttiness, and sweetness as whole-number scores from 1 to 5.

## Missing Or Ambiguous Fields

If a required schema field is missing, ask the user before changing content. If the build passes but the business meaning is unclear, show the preview and let the owner correct the submitted update.

## Images

Use existing images from `public/images/` when possible. If the owner provides a new image, add it to `public/images/` with a descriptive lowercase filename and update the matching content item.

Use individual drink cutouts for individual menu cards and carousel cards. `menu-drink-group-cutout.png` is a fallback/overview asset, not the normal image for a single drink.

## Instagram

The site uses a static Instagram profile block under the hero, plus an Instagram icon in the top navigation. Updating the profile URL or text is a content-only change in `src/content/site/homepage.json`. A live Instagram feed would require a widget, API, or third-party service and is outside routine static maintenance.
