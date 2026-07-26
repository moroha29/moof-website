import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [
  nav,
  css,
  astroConfig,
  menuAdapter,
  siteAdapter,
  menuJson,
  siteJson,
  drinkCard,
  hero,
  teamSection,
  homePage,
  menuPage
] = await Promise.all([
  read("../src/components/Nav.astro"),
  read("../src/styles/global.css"),
  read("../astro.config.mjs"),
  read("../src/data/menu.js"),
  read("../src/data/site.js"),
  read("../src/assets/content/menu.json"),
  read("../src/assets/content/site.json"),
  read("../src/components/DrinkCard.astro"),
  read("../src/components/Hero.astro"),
  read("../src/components/TeamSection.astro"),
  read("../src/pages/index.astro"),
  read("../src/pages/menu.astro")
]);

test("Design B uses editable JSON content as the manager contract", () => {
  assert.match(siteAdapter, /assets\/content\/site\.json/);
  assert.match(menuAdapter, /assets\/content\/menu\.json/);
  assert.match(siteJson, /70 Shenton Way/);
  assert.match(siteJson, /Mori/);
  assert.match(siteJson, /instagram\.com\/moof__bar/);
  assert.match(siteJson, /"image": "images\/specialty-matcha-latte-cutout\.png"/);
  assert.match(menuJson, /"image": "images\/classic-matcha-latte-cutout\.png"/);
  assert.match(menuJson, /"seasonalMenu"/);
});

test("editable copy and images flow through the rendered components", () => {
  assert.match(homePage, /data\/site\.js/);
  assert.match(menuPage, /data\/menu\.js/);
  assert.match(hero, /site\.hero\.image/);
  assert.match(hero, /site\.hero\.imageCaption/);
  assert.match(drinkCard, /withBase\(image\)/);
  assert.match(teamSection, /withBase\(member\.image\)/);
});

test("menu-route navigation qualifies homepage fragments", () => {
  assert.match(nav, /withBase\("\/"\)/);
  assert.doesNotMatch(nav, /href:\s*"#(?:origin|find-us)"/);
});

test("phone navigation remains operable", () => {
  assert.match(nav, /class="mobile-nav"/);
  assert.match(nav, /aria-label="(?:Open|Toggle) navigation"/);
  assert.match(css, /@media\s*\(max-width:\s*860px\)/);
  assert.match(css, /\.mobile-nav\s*\{[^}]*display:\s*block/s);
});

test("Design B uses its GitHub Pages base path", () => {
  assert.match(astroConfig, /base:\s*"\/moof-website\/b"/);
});
