# Google Form Field Map

Use this map when converting owner responses into repo content files.

| Google Form Field | Content Field | File |
| --- | --- | --- |
| update type | determines target file | n/a |
| season name | `seasonName` | `src/content/menu/seasonal.json` |
| homepage announcement | `hero.announcement` | `src/content/site/homepage.json` |
| featured drink name/id | `hero.featuredDrinkId` | `src/content/site/homepage.json` |
| top carousel drink order | `hero.carouselDrinkIds` | `src/content/site/homepage.json` |
| ingredient update notes | `ingredients[]` | `src/content/site/homepage.json` |
| about image | `about.image` | `src/content/site/homepage.json` |
| Instagram embed copy | `instagramEmbed.*` | `src/content/site/homepage.json` |
| Instagram preview image | `instagramEmbed.posts[].image` | `src/content/site/homepage.json` |
| Instagram preview caption | `instagramEmbed.posts[].caption` | `src/content/site/homepage.json` |
| Instagram preview URL | `instagramEmbed.posts[].url` | `src/content/site/homepage.json` |
| Instagram preview active status | `instagramEmbed.posts[].active` | `src/content/site/homepage.json` |
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

Prices are display strings such as `$8.50`. Image paths should start with `/images/`. Tasting ratings must be whole numbers from 1 to 5.
