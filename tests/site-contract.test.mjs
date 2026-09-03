import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";

const read=(path)=>readFile(new URL(path,import.meta.url),"utf8");
test("The Moof site uses independent CMS content and base-aware images",async()=>{const [home,menuPage,siteRaw,menuRaw]=await Promise.all([read("../src/pages/index.astro"),read("../src/pages/menu/index.astro"),read("../src/assets/content/site.json"),read("../src/assets/content/menu.json")]);const site=JSON.parse(siteRaw),menu=JSON.parse(menuRaw);assert.notEqual(site.brand.headerWordmark,site.brand.footerWordmark);assert.ok(home.includes("data-cms-path"));assert.ok(home.includes("data-cms-paths"));assert.ok(home.includes("withBase(site.hero.image)"));assert.ok(menuPage.includes("menuGroups"));assert.ok(menu.coreMenu.every(i=>i.imageAlt&&i.id));assert.ok(menu.seasonalMenu.every(i=>i.isSeasonal));assert.ok(Array.isArray(menu.additionalCategories));});
test("blank layout containers are not editable",async()=>{const home=await read("../src/pages/index.astro");assert.doesNotMatch(home,/hero-shade[^>]+data-cms/);assert.doesNotMatch(home,/drink-track[^>]+data-cms/);});

// Every image referenced by content must ship in public/, or the deployed page
// renders a broken drink card that no build step would have caught.
test("every referenced image exists in public/",async()=>{
  const [siteRaw,menuRaw]=await Promise.all([read("../src/assets/content/site.json"),read("../src/assets/content/menu.json")]);
  const site=JSON.parse(siteRaw),menu=JSON.parse(menuRaw);
  const referenced=[
    site.brand.logoImage,site.hero.image,site.about.image,site.events.image,
    ...[...menu.coreMenu,...menu.seasonalMenu].map((item)=>item.image),
  ];
  for (const ref of referenced) {
    assert.ok(ref?.startsWith("/"),`${ref} is a root-relative public path`);
    await access(new URL(`../public${ref}`,import.meta.url));
  }
});

test("the site publishes at the repository root, not under a variant folder",async()=>{
  const config=await read("../astro.config.mjs");
  assert.doesNotMatch(config,/\/f`|\/f"|\/f'/, "base must not append a variant segment");
  assert.match(config,/base(?!\w)/);
});

// A missing favicon is invisible in the build but shows up as a 404 on every
// page load, so both pages must declare one and the files must ship.
test("both pages declare a favicon that exists in public/",async()=>{
  for (const page of ["../src/pages/index.astro","../src/pages/menu/index.astro"]) {
    const html=await read(page);
    assert.match(html,/rel="icon"/,`${page} declares a favicon`);
    assert.match(html,/rel="apple-touch-icon"/,`${page} declares a touch icon`);
  }
  for (const icon of ["favicon-32.png","favicon-180.png"]) {
    await access(new URL(`../public/${icon}`,import.meta.url));
  }
});

// The image test above only covers content JSON. A background referenced from
// CSS would break just as loudly and nothing else would catch it.
test("every url() in the stylesheet resolves to a file in public/",async()=>{
  const css=await read("../public/styles.css");
  const urls=[...css.matchAll(/url\(\s*['"]?([^'"()]+?)['"]?\s*\)/g)].map((m)=>m[1].trim());
  assert.ok(urls.length>0,"the stylesheet references at least one asset");
  for (const ref of urls) {
    if (/^(https?:|data:)/.test(ref)) continue;
    assert.ok(!ref.startsWith("/"),`${ref} must be relative so the deploy base path applies`);
    await access(new URL(`../public/${ref}`,import.meta.url));
  }
});

// The map must point at Moof's own coordinates. A text-search embed renders a
// results map full of neighbouring cafes instead of one pin on the shop.
test("the map embeds a single pin at Moof's coordinates",async()=>{
  const site=JSON.parse(await read("../src/assets/content/site.json"));
  for (const field of ["mapUrl","mapEmbedUrl"]) {
    assert.match(site.visit[field],/1\.27\d+(%2C|,)103\.84\d+/,`visit.${field} targets Moof's coordinates`);
  }
  assert.match(site.visit.mapEmbedUrl,/output=embed/);
});
