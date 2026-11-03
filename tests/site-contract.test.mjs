import assert from "node:assert/strict";
import test from "node:test";
import { readFile, access } from "node:fs/promises";
import { existsSync } from "node:fs";
import { problems } from "./owner-content.mjs";

const read=(path)=>readFile(new URL(path,import.meta.url),"utf8");
const shipped=(path)=>existsSync(new URL(`../public${path}`,import.meta.url));
test("The Moof site uses independent CMS content and base-aware images",async()=>{const [home,menuPage,siteRaw,menuRaw]=await Promise.all([read("../src/pages/index.astro"),read("../src/pages/menu/index.astro"),read("../src/assets/content/site.json"),read("../src/assets/content/menu.json")]);const site=JSON.parse(siteRaw),menu=JSON.parse(menuRaw);assert.ok(site.brand.headerWordmark&&site.brand.footerWordmark);assert.ok(home.includes("data-cms-path"));assert.ok(home.includes("data-cms-paths"));assert.ok(home.includes("picture(site.hero.image)"));assert.ok(menuPage.includes("menuGroups"));assert.ok(Array.isArray(menu.coreMenu)&&Array.isArray(menu.seasonalMenu));assert.ok(Array.isArray(menu.additionalCategories));});
test("blank layout containers are not editable",async()=>{const home=await read("../src/pages/index.astro");assert.doesNotMatch(home,/hero-shade[^>]+data-cms/);assert.doesNotMatch(home,/drink-track[^>]+data-cms/);});

// The hero shade is a full-size layer over the hero photo. If it takes clicks,
// the website manager can't select the photo on desktop (mobile hides the shade).
test("the hero shade lets clicks through to the photo",async()=>{
  const css=await read("../public/styles.css");
  const rule=css.match(/\.hero-shade\{position:absolute[^}]*\}/)?.[0];
  assert.ok(rule,"the desktop hero shade rule exists");
  assert.match(rule,/pointer-events:none/);
});
// Every picture is editable in the website manager, so no <img> may take a
// content path straight from the JSON: an owner who removes a picture would
// otherwise ship src="" and a broken-image icon. See src/lib/picture.js.
test("every picture on a page goes through the stand-in helper",async()=>{
  for (const page of ["../src/pages/index.astro","../src/pages/menu/index.astro"]) {
    const html=await read(page);
    assert.doesNotMatch(html,/src=\{withBase\((?:site|item|menu)\./,`${page} must not pass content straight to withBase`);
    assert.match(html,/import \{ picture, pictureAlt \}/,`${page} imports the stand-in helper`);
  }
});

// What the owner publishes has to pass these rules, so what is already live
// has to pass them too, or the repository ships content the website manager
// could never publish again. tests/owner-content.mjs holds the rules.
test("the published content passes the owner's gate",async()=>{
  const [siteRaw,menuRaw]=await Promise.all([read("../src/assets/content/site.json"),read("../src/assets/content/menu.json")]);
  assert.deepEqual(problems(JSON.parse(siteRaw),JSON.parse(menuRaw),shipped),[]);
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
// With a custom domain, GitHub Pages reports an empty base path. `||` treated
// that as missing and built for /moof-website/ anyway, so every page and asset
// would 404 on the domain. An empty base must mean the domain root.
test("an empty Pages base path builds for the domain root",async()=>{
  const config=await read("../astro.config.mjs");
  assert.match(config,/GITHUB_PAGES_BASE \?\?/,"the base falls back only when unset, not when empty");
  assert.doesNotMatch(config,/GITHUB_PAGES_BASE \|\|/);
});

// Preprod demos moved to their own repo so the Moof domain serves only Moof.
test("the Moof deploy ships no preprod demos",async()=>{
  const workflow=await read("../.github/workflows/deploy.yml");
  assert.doesNotMatch(workflow,/preprod\/\*|generate-preprod-index/,"the workflow builds no preprod demos");
  assert.match(workflow,/test ! -e site\/preprod/,"the deploy checks nothing lands under /preprod/");
  await assert.rejects(access(new URL("../preprod",import.meta.url)),"no preprod folder in this repo");
});
