# Google Form Field Map

Use this map when converting owner responses into the site's content files. Paths are
relative to the repository root. See
`docs/adr/0002-shared-schema-independent-variant-data.md` for the canonical content model.

Rows marked *(not rendered)* are part of the canonical model but are not displayed by the
current design. Keep any existing values rather than dropping them, so a later design change
can use them — but do not chase the owner for them.

| Google Form Field | Content Field | File |
| --- | --- | --- |
| update type | determines target file | n/a |
| homepage announcement | `hero.announcement` | `src/assets/content/site.json` |
| hero headline | `hero.headline` | `src/assets/content/site.json` |
| hero supporting copy | `hero.supportingCopy` | `src/assets/content/site.json` |
| about copy | `about.heading` and `about.body` | `src/assets/content/site.json` |
| about image | `about.image` and `about.imageAlt` | `src/assets/content/site.json` |
| ingredient update notes | `story.body` | `src/assets/content/site.json` |
| seasonal section heading | `menuPage.seasonalTitle` / `menuPage.seasonalDescription` | `src/assets/content/site.json` |
| store address | `visit.address` and `visit.unit` | `src/assets/content/site.json` |
| MRT / directions note | `visit.body` | `src/assets/content/site.json` |
| operating hours | `visit.hours` | `src/assets/content/site.json` |
| map link | `visit.mapUrl` and `visit.mapEmbedUrl` | `src/assets/content/site.json` |
| Instagram URL | `business.instagramUrl` and `business.instagramLabel` | `src/assets/content/site.json` |
| business email | `business.emailUrl` and `business.emailLabel` | `src/assets/content/site.json` |
| events contact | `events.ctaUrl` and `events.ctaLabel` | `src/assets/content/site.json` |
| drink name | `name` | `src/assets/content/menu.json` |
| price | `price` | `src/assets/content/menu.json` |
| short description | `description` | `src/assets/content/menu.json` |
| image filename | `image` | `src/assets/content/menu.json` |
| image description | `imageAlt` | `src/assets/content/menu.json` |
| temperature options | `temperatureOptions` | `src/assets/content/menu.json` |
| milk options | `milkOptions` | `src/assets/content/menu.json` |
| active status | `active` | `src/assets/content/menu.json` |
| seasonal or core | which array the item lives in: `seasonalMenu` or `coreMenu` | `src/assets/content/menu.json` |
| badge / label | `tags[]` | `src/assets/content/menu.json` |
| review quote *(not rendered)* | `review.quote` | `src/assets/content/menu.json` |
| reviewer name *(not rendered)* | `review.reviewerName` | `src/assets/content/menu.json` |
| tasting ratings *(not rendered)* | `tasting.bitterness` / `.aroma` / `.nuttiness` / `.sweetness` | `src/assets/content/menu.json` |
| owner notes for AI agent | use as instructions, do not store unless useful | n/a |

Prices are display strings such as `$8.50`. Image paths start with `/images/` and resolve
against `public/images/`; the base path is added at build time, so never hardcode
`/moof-website/` into content. Tasting ratings must be whole numbers from 1 to 5.

There is no separate `seasonName` field — the seasonal group's heading and description are
`menuPage.seasonalTitle` and `menuPage.seasonalDescription` in `site.json`, and the admin
portal edits them as the second menu group's title and description.
