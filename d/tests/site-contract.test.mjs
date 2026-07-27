import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [
  css,
  homePage,
  menuPageSource,
  baseLayout,
  header,
  hero,
  featuredDrinks,
  menuPreview,
  visitSection,
  menuRow,
  teamSection,
  siteAdapter,
  menuAdapter,
  siteJson,
  menuJson,
  baseHelper,
  astroConfig
] = await Promise.all([
  read("../src/styles/global.css"),
  read("../src/pages/index.astro"),
  read("../src/pages/menu.astro"),
  read("../src/layouts/BaseLayout.astro"),
  read("../src/components/Header.astro"),
  read("../src/components/Hero.astro"),
  read("../src/components/FeaturedDrinks.astro"),
  read("../src/components/MenuPreview.astro"),
  read("../src/components/VisitSection.astro"),
  read("../src/components/MenuRow.astro"),
  read("../src/components/TeamSection.astro"),
  read("../src/data/site.js"),
  read("../src/data/menu.js"),
  read("../src/assets/content/site.json"),
  read("../src/assets/content/menu.json"),
  read("../src/lib/base.js"),
  read("../astro.config.mjs")
]);

test("Design D uses editable JSON content as the manager contract", () => {
  assert.match(siteAdapter, /assets\/content\/site\.json/);
  assert.match(menuAdapter, /assets\/content\/menu\.json/);
  assert.match(siteJson, /"homepage":/);
  assert.match(siteJson, /"menuPage":/);
  assert.match(siteJson, /"image": "\/images\/specialty-matcha-latte-cutout\.png"/);
  assert.match(menuJson, /"coreItems"/);
  assert.match(menuJson, /"seasonalItems"/);
});

test("home keeps a short, minimal sequence with editable drink imagery", () => {
  assert.match(homePage, /site\.seo\.homeTitle/);
  assert.match(homePage, /<Hero\s*\/>[\s\S]*<FeaturedDrinks\s*\/>[\s\S]*<MenuPreview\s*\/>[\s\S]*<VisitSection\s*\/>/);
  assert.match(hero, /homepage\.hero\.image/);
  assert.match(featuredDrinks, /coreItems/);
  assert.match(featuredDrinks, /<img/);
  assert.match(menuPreview, /withBase\("\/menu\/"\)/);
  assert.match(visitSection, /site\.addressLine1/);
  assert.match(visitSection, /site\.hours/);
});

test("home and menu navigation stay accessible and base-path aware", () => {
  assert.match(header, /<nav aria-label="Primary">/);
  assert.match(header, /href=\{withBase\("\/"\)\}/);
  assert.match(header, /href=\{withBase\("\/menu\/"\)\}/);
  assert.match(menuPreview, /href=\{withBase\("\/menu\/"\)\}/);
  assert.match(baseHelper, /import\.meta\.env\.BASE_URL/);
  assert.match(astroConfig, /base:\s*["']\/moof-website\/d["']/);
});

test("menu is one readable list with deployable additional categories", () => {
  assert.match(menuPageSource, /const menuItems = \[\.\.\.coreItems, \.\.\.seasonalItems\]/);
  assert.equal((menuPageSource.match(/<MenuRow/g) ?? []).length, 2);
  assert.match(menuPageSource, /menuItems\.map\(\(item\) => <MenuRow item=\{item\} \/>\)/);
  assert.match(menuPageSource, /additionalCategories\.map/);
  assert.match(menuPageSource, /category\.items\.map\(\(item\) => <MenuRow item=\{item\} \/>\)/);
  assert.match(menuPageSource, /menuPage\.headline/);
  assert.match(menuRow, /item\.tags\.join/);
  assert.match(menuRow, /withBase\(item\.image\)/);
});

test("minimal responsive styles fit narrow screens without document overflow", () => {
  assert.match(css, /--moof-green:/);
  assert.match(baseLayout, /name="theme-color" content="#2f6b42"/);
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*clip;/s);
  assert.match(css, /\.site-header\s*\{[^}]*flex-wrap:\s*wrap;/s);
  assert.match(css, /\.hero\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /@media\s*\(min-width:\s*700px\)/);
  assert.match(css, /img\s*\{[^}]*max-width:\s*100%;/s);
  assert.match(teamSection, /withBase\(person\.image\)/);
});
