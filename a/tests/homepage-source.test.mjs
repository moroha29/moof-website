import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage uses custom announcement instead of Instagram embed section", () => {
  const source = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");

  assert.equal(source.includes("InstagramEmbed"), false);
  assert.equal(source.includes("AnnouncementSection"), true);
  assert.equal(source.includes("customAnnouncement"), true);
});

test("featured carousel omits review and tasting panels", () => {
  const source = readFileSync(new URL("../src/components/DrinkCarousel.astro", import.meta.url), "utf8");

  assert.equal(source.includes("hero-review"), false);
  assert.equal(source.includes("hero-tasting"), false);
  assert.equal(source.includes("data-review-quote"), false);
  assert.equal(source.includes("data-tasting-row"), false);
});

test("Find Us stacks vertically without horizontal scrolling on mobile", () => {
  const source = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");
  const mobileRules = source.slice(source.indexOf("@media (max-width: 759px)"), source.indexOf("@media (max-width: 430px)"));

  assert.match(mobileRules, /\.find-us-grid\s*\{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?overflow-x:\s*visible;/);
  assert.match(mobileRules, /\.find-us-grid article,\s*\.instagram-card\s*\{[\s\S]*?width:\s*100%;[\s\S]*?min-width:\s*0;/);
});

test("desktop carousel keeps the remaining featured drink centered", () => {
  const source = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");
  const desktopRules = source.slice(source.indexOf("@media (min-width: 760px)"), source.indexOf("@media (max-width: 759px)"));

  assert.match(desktopRules, /\.hero-stage\s*\{[\s\S]*?grid-template-columns:\s*minmax\(300px,\s*1fr\);/);
});

test("hero layout can shrink to the mobile viewport width", () => {
  const source = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");
  const heroRules = source.match(/\.hero-products\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(heroRules, /grid-template-columns:\s*minmax\(0,\s*1fr\);/);
  assert.match(heroRules, /overflow-x:\s*clip;/);
});
