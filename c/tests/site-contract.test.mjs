import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [
  header,
  indexPage,
  menuPage,
  footer,
  edit,
  teamSection,
  menuAdapter,
  siteAdapter,
  menuJson,
  siteJson,
  css,
  config
] = await Promise.all([
  read("../src/components/Header.astro"),
  read("../src/pages/index.astro"),
  read("../src/pages/menu.astro"),
  read("../src/components/Footer.astro"),
  read("../src/components/SeasonalSocialEdit.astro"),
  read("../src/components/TeamSection.astro"),
  read("../src/data/menu.js"),
  read("../src/data/site.js"),
  read("../src/assets/content/menu.json"),
  read("../src/assets/content/site.json"),
  read("../src/styles/global.css"),
  read("../astro.config.mjs")
]);

test("Design C uses editable JSON content as the manager contract", () => {
  assert.match(siteAdapter, /assets\/content\/site\.json/);
  assert.match(menuAdapter, /assets\/content\/menu\.json/);
  assert.match(siteJson, /"hero":/);
  assert.match(siteJson, /"ritual":/);
  assert.match(siteJson, /"visit":/);
  assert.match(siteJson, /instagram\.com\/moof__bar/);
  assert.match(menuJson, /"testimonials"/);
  assert.match(menuJson, /images\/team\/staff-placeholder\.png|classic-matcha-latte-cutout/);
});

test("homepage, menu page, and seasonal edit stay data-driven", () => {
  assert.match(indexPage, /site\.menuIntro\.coreTitle/);
  assert.match(menuPage, /site\.menuPage\.heading/);
  assert.match(menuPage, /site\.seo\.menuTitle/);
  assert.match(edit, /seasonal\.map/);
  assert.match(edit, /site\.seasonalEdit\./);
  assert.match(footer, /data\/site\.js/);
  assert.match(teamSection, /withBase\(site\.team\.image\)/);
});

test("the editorial header has an accessible phone treatment", () => {
  assert.match(header, /aria-label="(?:Open|Toggle) navigation"/);
});

test("phone navigation remains contained, tappable, and separate from desktop navigation", () => {
  assert.match(css, /\.mobile-nav nav a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.mobile-nav nav\s*\{[^}]*left:\s*1\.5rem[^}]*right:\s*1\.5rem[^}]*width:\s*auto/s);
  assert.match(css, /@media\s*\(min-width:\s*641px\)[\s\S]*?\.desktop-nav\s*\{[^}]*display:\s*flex[^}]*\}[\s\S]*?\.mobile-nav\s*\{[^}]*display:\s*none/s);
});

test("the production base targets Design C", () => {
  assert.match(config, /base:\s*["']\/moof-website\/c["']/);
});
