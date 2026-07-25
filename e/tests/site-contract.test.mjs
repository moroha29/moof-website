import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [config, workflow, siteData, mediaData, baseHelper, homePage, menuPage, menuList, css] = await Promise.all([
  read("../astro.config.mjs"),
  read("../../.github/workflows/deploy.yml"),
  read("../src/data/site.js"),
  read("../src/data/editorial.js"),
  read("../src/lib/base.js"),
  read("../src/pages/index.astro"),
  read("../src/pages/menu.astro"),
  read("../src/components/MenuList.astro"),
  read("../src/styles/global.css")
]);

test("Design E is a Pages-ready editorial variant with approved local media", () => {
  assert.match(config, /base:\s*["']\/moof-website\/e["']/);
  assert.match(workflow, /for dir in a b c d e;/);
  assert.match(siteData, /Photos: Zawani Abdul Ghani \/ HungryGoWhere/);
  assert.match(mediaData, /editorial\/01-moof-exterior\.jpg/);
  assert.match(baseHelper, /base\.endsWith\("\/"\)/);
});

test("the Lula-inspired home stays an image-led index with a readable mobile layout", () => {
  assert.match(homePage, /<Header\s*\/>[\s\S]*editorialMedia\.map[\s\S]*<VisitSection\s*\/>[\s\S]*<Footer\s*\/>/);
  assert.match(homePage, /<EditorialPanel item=\{item\} \/>/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /\.editorial-panel/);
  assert.match(css, /@media\s*\(min-width:\s*900px\)[\s\S]*\.editorial-index\s*\{[^}]*grid-template-columns:/);
  assert.match(css, /\.editorial-panel:nth-child\(1\)\s*\{[^}]*grid-row:\s*span 2;/);
});

test("the menu is a complete, expandable list with factual drink detail", () => {
  assert.match(menuPage, /<MenuList title="Core" items=\{coreMenu\} \/>/);
  assert.match(menuPage, /<MenuList title="Seasonal" items=\{seasonalMenu\} \/>/);
  assert.match(menuList, /<details/);
  assert.match(menuList, /specialIngredients/);
  assert.match(menuList, /distinctivePoint/);
});
