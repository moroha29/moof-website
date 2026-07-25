import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [header, indexPage, footer, edit, teamSection, menuData, siteData, css, config] = await Promise.all([
  read("../src/components/Header.astro"),
  read("../src/pages/index.astro"),
  read("../src/components/Footer.astro"),
  read("../src/components/SeasonalSocialEdit.astro"),
  read("../src/components/TeamSection.astro"),
  read("../src/data/menu.js"),
  read("../src/data/site.js"),
  read("../src/styles/global.css"),
  read("../astro.config.mjs")
]);

test("the seasonal edit stays data-driven and social", () => {
  assert.match(indexPage, /SeasonalSocialEdit/);
  assert.match(edit, /seasonal\.map/);
  assert.match(edit, /site\.social\.instagramUrl/);
  assert.match(siteData, /instagram\.com\/moof__bar/);
  assert.match(siteData, /seasonalEdit:\s*\{/);
  assert.match(edit, /site\.seasonalEdit\./);
  assert.doesNotMatch(edit, /The seasonal edit|Three drinks worth pausing for|A small rotation for the season|See what is being whisked this week|Follow/);
});

test("the editorial header has an accessible phone treatment", () => {
  assert.match(header, /aria-label="(?:Open|Toggle) navigation"/);
});

test("phone navigation remains contained, tappable, and separate from desktop navigation", () => {
  assert.match(css, /\.mobile-nav nav a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.mobile-nav nav\s*\{[^}]*left:\s*1\.5rem[^}]*right:\s*1\.5rem[^}]*width:\s*auto/s);
  assert.match(css, /@media\s*\(min-width:\s*641px\)[\s\S]*?\.desktop-nav\s*\{[^}]*display:\s*flex[^}]*\}[\s\S]*?\.mobile-nav\s*\{[^}]*display:\s*none/s);
});

test("testimonial labels do not invent customer or product context", () => {
  assert.doesNotMatch(menuData, /a regular|a guest/i);
  assert.equal(menuData.match(/name:\s*"Anonymous customer"/g)?.length, 5);
  assert.match(menuData, /name:\s*"Tan Jun Jie"/);
  assert.doesNotMatch(siteData, /no shortcuts taken|regulars|keep coming back/i);
});

test("homepage and store copy comes from editable site data", () => {
  assert.match(indexPage, /import\s*\{\s*site\s*\}\s*from\s*"\.\.\/data\/site\.js"/);
  assert.match(footer, /import\s*\{\s*site\s*\}\s*from\s*"\.\.\/data\/site\.js"/);
  assert.doesNotMatch(`${indexPage}\n${footer}`, /70 Shenton Way|Mon–Fri|Tanjong Pagar MRT/);
  assert.match(siteData, /hero:\s*\{/);
  assert.match(siteData, /ritual:\s*\{/);
  assert.match(siteData, /visit:\s*\{/);
});

test("the production base targets Design C", () => {
  assert.match(config, /base:\s*["']\/moof-website\/c["']/);
});

test("the homepage includes a neutral staff-portrait placeholder", () => {
  assert.match(indexPage, /import TeamSection/);
  assert.match(indexPage, /<TeamSection\s*\/>/);
  assert.match(teamSection, /withBase\(site\.team\.image\)/);
  assert.match(siteData, /images\/team\/staff-placeholder\.png/);
});
