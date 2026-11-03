/*
 * The edits the website manager can produce, put back through the check that
 * decides whether they publish.
 *
 * A refusal here is not a red test for us — it is a red banner for the owner
 * saying "the check on your website found a problem", with no way to find out
 * which problem, and a drink that never reaches the menu. Five of these cases
 * were refused before this file existed: adding a drink, clearing a picture
 * description, removing a picture, matching the two names on the page, and
 * pasting Google's own embed link over the map.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { problems } from "./owner-content.mjs";

const shipped = (path) => existsSync(new URL(`../public${path}`, import.meta.url));
const content = async () => ({
  site: JSON.parse(await readFile(new URL("../src/assets/content/site.json", import.meta.url), "utf8")),
  menu: JSON.parse(await readFile(new URL("../src/assets/content/menu.json", import.meta.url), "utf8")),
});

/** A drink as the manager builds one: named and priced, picture chosen later. */
const addedDrink = (name = "Yuzu Matcha") => ({
  id: "item-4f21ab09", name, price: "$8", description: "Say what this drink is like.",
  image: "", imageAlt: "", active: true, isSeasonal: true,
  temperatureOptions: ["Iced"], milkOptions: ["Fresh milk"], tags: [],
});

const allowed = [
  ["the two names on the page are matched up", (site) => { site.brand.footerWordmark = site.brand.headerWordmark; }],
  ["a drink is added before its photograph is taken", (_site, menu) => { menu.seasonalMenu.push(addedDrink()); }],
  ["a picture description is cleared", (_site, menu) => { menu.coreMenu[0].imageAlt = ""; }],
  ["the About us picture is removed", (site) => { site.about.image = ""; }],
  ["the logo is removed", (site) => { site.brand.logoImage = ""; }],
  ["Google's own embed link is pasted over the map", (site) => {
    site.visit.mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.5!2d103.846!3d1.2738";
  }],
  ["the Open in maps link is a shortened Google link", (site) => { site.visit.mapUrl = "https://maps.app.goo.gl/abc123"; }],
  ["a drink under the seasonal heading is not marked seasonal", (_site, menu) => { menu.seasonalMenu[0].isSeasonal = false; }],
];

const refused = [
  ["a picture names a file that is not on the website", (_site, menu) => { menu.coreMenu[0].image = "/images/not-here.png"; }, /missing from the website/],
  ["the map searches for a place name", (site) => { site.visit.mapEmbedUrl = "https://www.google.com/maps?q=70+Shenton+Way+Singapore&output=embed"; }, /searches for a place name/],
  ["the map points somewhere that is not Google Maps", (site) => { site.visit.mapEmbedUrl = "https://example.com/map"; }, /not go to Google Maps/],
  ["the name at the top of the page is emptied", (site) => { site.brand.headerWordmark = "  "; }, /name at the top/],
];

test("the live content needs no edits to publish", async () => {
  const { site, menu } = await content();
  assert.deepEqual(problems(site, menu, shipped), []);
});

for (const [label, edit] of allowed) {
  test(`publishes: ${label}`, async () => {
    const { site, menu } = await content();
    edit(site, menu);
    assert.deepEqual(problems(site, menu, shipped), [], `${label} must not stop a publish`);
  });
}

for (const [label, edit, expected] of refused) {
  test(`refused, and says why: ${label}`, async () => {
    const { site, menu } = await content();
    edit(site, menu);
    const found = problems(site, menu, shipped);
    assert.equal(found.length, 1, `${label} raises exactly one problem, got ${JSON.stringify(found)}`);
    assert.match(found[0], expected);
    // Whatever it says reaches the owner, so it names the thing, not the test.
    assert.doesNotMatch(found[0], /undefined|\[object|assert/i);
  });
}
