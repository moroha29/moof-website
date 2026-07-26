import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [
  config,
  workflow,
  siteAdapter,
  menuAdapter,
  mediaAdapter,
  siteJson,
  menuJson,
  mediaJson,
  baseHelper,
  homePage,
  menuPage,
  menuList,
  css
] = await Promise.all([
  read("../astro.config.mjs"),
  read("../../.github/workflows/deploy.yml"),
  read("../src/data/site.js"),
  read("../src/data/menu.js"),
  read("../src/data/editorial.js"),
  read("../src/assets/content/site.json"),
  read("../src/assets/content/menu.json"),
  read("../src/assets/content/editorial.json"),
  read("../src/lib/base.js"),
  read("../src/pages/index.astro"),
  read("../src/pages/menu.astro"),
  read("../src/components/MenuList.astro"),
  read("../src/styles/global.css")
]);

test("Design E is a Pages-ready editorial variant with editable local media", () => {
  assert.match(config, /base:\s*["']\/moof-website\/e["']/);
  assert.match(workflow, /for dir in a b c d e;/);
  assert.match(siteAdapter, /assets\/content\/site\.json/);
  assert.match(menuAdapter, /assets\/content\/menu\.json/);
  assert.match(mediaAdapter, /assets\/content\/editorial\.json/);
  assert.match(siteJson, /Photos: Zawani Abdul Ghani \/ HungryGoWhere/);
  assert.match(mediaJson, /editorial\/01-moof-exterior\.jpg/);
  assert.match(mediaJson, /"title": "Our story"/);
  assert.match(baseHelper, /base\.endsWith\("\/"\)/);
});

test("the Lula-inspired home stays an image-led index with editable intro and story", () => {
  assert.match(homePage, /site\.intro\.headline/);
  assert.match(homePage, /site\.story\.kicker/);
  assert.match(homePage, /<Header\s*\/>[\s\S]*editorialMedia\.map[\s\S]*<VisitSection\s*\/>[\s\S]*<Footer\s*\/>/);
  assert.match(homePage, /<EditorialPanel item=\{item\} \/>/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /\.editorial-panel/);
  assert.match(css, /@media\s*\(min-width:\s*900px\)[\s\S]*\.editorial-index\s*\{[^}]*grid-template-columns:/);
  assert.match(css, /\.editorial-panel:nth-child\(1\)\s*\{[^}]*grid-row:\s*span 2;/);
});

test("the menu is a complete, expandable list with editable page copy", () => {
  assert.match(menuPage, /site\.menuPage\.headline/);
  assert.match(menuPage, /<MenuList title=\{site\.menuPage\.coreTitle\} items=\{coreMenu\} \/>/);
  assert.match(menuPage, /<MenuList title=\{site\.menuPage\.seasonalTitle\} items=\{seasonalMenu\} \/>/);
  assert.match(menuList, /<details/);
  assert.match(menuList, /specialIngredients/);
  assert.match(menuList, /distinctivePoint/);
  assert.match(menuJson, /"coreMenu"/);
  assert.match(menuJson, /"seasonalMenu"/);
});
