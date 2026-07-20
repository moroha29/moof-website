import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [
  css,
  homePage,
  menuPage,
  baseLayout,
  header,
  hero,
  featuredDrinks,
  menuPreview,
  visitSection,
  menuRow,
  siteData,
  menuData,
  baseHelper,
  astroConfig
] = await Promise.all([
  readSource("../src/styles/global.css"),
  readSource("../src/pages/index.astro"),
  readSource("../src/pages/menu.astro"),
  readSource("../src/layouts/BaseLayout.astro"),
  readSource("../src/components/Header.astro"),
  readSource("../src/components/Hero.astro"),
  readSource("../src/components/FeaturedDrinks.astro"),
  readSource("../src/components/MenuPreview.astro"),
  readSource("../src/components/VisitSection.astro"),
  readSource("../src/components/MenuRow.astro"),
  readSource("../src/data/site.js"),
  readSource("../src/data/menu.js"),
  readSource("../src/lib/base.js"),
  readSource("../astro.config.mjs")
]);

test("home keeps a short, minimal sequence with prominent supplied drink imagery", () => {
  assert.match(homePage, /import Hero/);
  assert.match(homePage, /import FeaturedDrinks/);
  assert.match(homePage, /import MenuPreview/);
  assert.match(homePage, /import VisitSection/);
  assert.match(homePage, /<Hero\s*\/>[\s\S]*<FeaturedDrinks\s*\/>[\s\S]*<MenuPreview\s*\/>[\s\S]*<VisitSection\s*\/>/);
  assert.match(hero, /withBase\("\/images\//);
  assert.match(featuredDrinks, /coreItems/);
  assert.match(featuredDrinks, /<img/);
  assert.match(menuPreview, /withBase\("\/menu\/"\)/);
  assert.match(visitSection, /site\.addressLine1/);
  assert.match(visitSection, /site\.hours/);
});

test("the minimal design omits urgency, reviews, and persistent directions UI", () => {
  const renderedSource = [
    homePage,
    menuPage,
    baseLayout,
    header,
    hero,
    featuredDrinks,
    menuPreview,
    visitSection,
    css,
    siteData,
    menuData
  ].join("\n");

  assert.doesNotMatch(baseLayout, /StickyDirectionsBar/);
  assert.doesNotMatch(renderedSource, /position:\s*sticky/);
  assert.doesNotMatch(renderedSource, /sticky-cta|social-proof|review-card|seasonal-urgency/i);
  assert.doesNotMatch(renderedSource, /limited batch|small batches|once this batch is gone|limited-time|before it rotates out|pouring now/i);
  assert.doesNotMatch(menuData, /export const reviews/);
});

test("home and menu navigation stay accessible and base-path aware", () => {
  assert.match(header, /<nav aria-label="Primary">/);
  assert.match(header, /href=\{withBase\("\/"\)\}/);
  assert.match(header, /href=\{withBase\("\/menu\/"\)\}/);
  assert.match(menuPreview, /href=\{withBase\("\/menu\/"\)\}/);
  assert.match(baseHelper, /import\.meta\.env\.BASE_URL/);
  assert.match(astroConfig, /base:\s*["']\/moof-website\/d["']/);
});

test("menu is one readable, complete product list", () => {
  assert.match(menuPage, /const menuItems = \[\.\.\.coreItems, \.\.\.seasonalItems\]/);
  assert.equal((menuPage.match(/<MenuRow/g) ?? []).length, 1);
  assert.match(menuPage, /menuItems\.map\(\(item\) => <MenuRow item=\{item\} \/>\)/);
  assert.match(menuRow, /item\.tags\.join/);
  assert.match(menuRow, /withBase\(item\.image\)/);
});

test("presentation copy stays grounded in supplied facts", () => {
  assert.match(menuPage, /Fresh or oat milk\. \{site\.hours\}/);
  assert.doesNotMatch(menuPage, /on request/i);
  assert.match(siteData, /headline: "Matcha at Eon Shenton\."/);
  assert.doesNotMatch(siteData, /quiet matcha bar/i);
});

test("minimal responsive styles fit narrow screens without document overflow", () => {
  assert.match(css, /--moof-green:/);
  assert.match(baseLayout, /name="theme-color" content="#2f6b42"/);
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*clip;/s);
  assert.match(css, /\.site-header\s*\{[^}]*flex-wrap:\s*wrap;/s);
  assert.match(css, /\.hero\s*\{[^}]*display:\s*grid;/s);
  assert.match(css, /@media\s*\(min-width:\s*700px\)/);
  assert.match(css, /img\s*\{[^}]*max-width:\s*100%;/s);
});
