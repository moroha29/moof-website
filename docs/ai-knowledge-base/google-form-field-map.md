# Google Form Field Map

This is the canonical, shared target schema for every design variant (see `docs/adr/0002-shared-schema-independent-variant-data.md`). Use this map when converting owner responses into a variant's content files — file paths are relative to the target variant's folder, e.g. `a/src/content/menu/core.json`. Rows marked *(variant-specific)* only apply to variants whose design actually has that feature (e.g. a hero carousel, a custom announcement block) — check the target variant's own `docs/ai-knowledge-base/` first.

| Google Form Field | Content Field | File |
| --- | --- | --- |
| update type | determines target file | n/a |
| season name | `seasonName` | `src/content/menu/seasonal.json` |
| homepage announcement | `hero.announcement` | `src/content/site/homepage.json` |
| featured drink name/id | `hero.featuredDrinkId` | `src/content/site/homepage.json` |
| top carousel drink order *(variant-specific)* | `hero.carouselDrinkIds` | `src/content/site/homepage.json` |
| ingredient update notes | `ingredients[]` | `src/content/site/homepage.json` |
| about image | `about.image` | `src/content/site/homepage.json` |
| custom announcement eyebrow *(variant-specific)* | `customAnnouncement.eyebrow` | `src/content/site/homepage.json` |
| custom announcement heading *(variant-specific)* | `customAnnouncement.heading` | `src/content/site/homepage.json` |
| custom announcement body *(variant-specific)* | `customAnnouncement.body` | `src/content/site/homepage.json` |
| custom announcement image *(variant-specific)* | `customAnnouncement.image` | `src/content/site/homepage.json` |
| store address | `findUs.address` and `findUs.unit` | `src/content/site/homepage.json` |
| MRT / directions note | `findUs.mrtNote` | `src/content/site/homepage.json` |
| operating hours | `findUs.operatingHours` | `src/content/site/homepage.json` |
| Instagram URL | `findUs.instagramUrl` | `src/content/site/homepage.json` |
| drink name | `items[].name` | `src/content/menu/*.json` |
| drink category | `items[].category` | `src/content/menu/*.json` |
| price | `items[].price` | `src/content/menu/*.json` |
| short description | `items[].description` | `src/content/menu/*.json` |
| review quote | `items[].review.quote` | `src/content/menu/*.json` |
| reviewer name | `items[].review.reviewerName` | `src/content/menu/*.json` |
| reviewer image filename | `items[].review.reviewerImage` | `src/content/menu/*.json` |
| bitterness rating | `items[].tasting.bitterness` | `src/content/menu/*.json` |
| aroma rating | `items[].tasting.aroma` | `src/content/menu/*.json` |
| nuttiness rating | `items[].tasting.nuttiness` | `src/content/menu/*.json` |
| sweetness rating | `items[].tasting.sweetness` | `src/content/menu/*.json` |
| temperature options | `items[].temperatureOptions` | `src/content/menu/*.json` |
| milk options | `items[].milkOptions` | `src/content/menu/*.json` |
| image filename | `items[].image` | `src/content/menu/*.json` |
| active status | `items[].active` | `src/content/menu/*.json` |
| owner notes for AI agent | use as instructions, do not store unless useful | n/a |

Prices are display strings such as `$8.50`. Image paths should start with `/images/` (resolved within the variant, e.g. Astro's `public/images/`). Tasting ratings must be whole numbers from 1 to 5.
