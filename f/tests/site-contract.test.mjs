import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read=(path)=>readFile(new URL(path,import.meta.url),"utf8");
test("Site F uses independent CMS content and base-aware images",async()=>{const [home,menuPage,siteRaw,menuRaw]=await Promise.all([read("../src/pages/index.astro"),read("../src/pages/menu/index.astro"),read("../src/assets/content/site.json"),read("../src/assets/content/menu.json")]);const site=JSON.parse(siteRaw),menu=JSON.parse(menuRaw);assert.notEqual(site.brand.headerWordmark,site.brand.footerWordmark);assert.ok(home.includes("data-cms-path"));assert.ok(home.includes("data-cms-paths"));assert.ok(home.includes("withBase(site.hero.image)"));assert.ok(menuPage.includes("menuGroups"));assert.ok(menu.coreMenu.every(i=>i.imageAlt&&i.id));assert.ok(menu.seasonalMenu.every(i=>i.isSeasonal));assert.ok(Array.isArray(menu.additionalCategories));});
test("blank layout containers are not editable",async()=>{const home=await read("../src/pages/index.astro");assert.doesNotMatch(home,/hero-shade[^>]+data-cms/);assert.doesNotMatch(home,/drink-track[^>]+data-cms/);});
