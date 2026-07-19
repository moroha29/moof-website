# Google Form Field Map

Use this map when converting owner responses into repo content files.

| Google Form Field | Content Field | File |
| --- | --- | --- |
| update type | determines target file | n/a |
| season name | `seasonName` | `src/content/menu/seasonal.json` |
| homepage announcement | `hero.announcement` | `src/content/site/homepage.json` |
| featured drink name/id | `hero.featuredDrinkId` | `src/content/site/homepage.json` |
| ingredient update notes | `ingredients[]` | `src/content/site/homepage.json` |
| drink name | `items[].name` | `src/content/menu/*.json` |
| drink category | `items[].category` | `src/content/menu/*.json` |
| price | `items[].price` | `src/content/menu/*.json` |
| short description | `items[].description` | `src/content/menu/*.json` |
| temperature options | `items[].temperatureOptions` | `src/content/menu/*.json` |
| milk options | `items[].milkOptions` | `src/content/menu/*.json` |
| image filename | `items[].image` | `src/content/menu/*.json` |
| active status | `items[].active` | `src/content/menu/*.json` |
| owner notes for AI agent | use as instructions, do not store unless useful | n/a |

Prices are display strings such as `$8.50`. Image paths should start with `/images/`.
