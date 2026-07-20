import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const nav = await readFile(new URL("../src/components/Nav.astro", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const astroConfig = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
const menuData = await readFile(new URL("../src/data/menu.js", import.meta.url), "utf8");
const siteData = await readFile(new URL("../src/data/site.js", import.meta.url), "utf8").catch(
  () => ""
);
const contentSources = await Promise.all(
  [
    "../src/components/Hero.astro",
    "../src/components/IngredientStory.astro",
    "../src/components/FindUs.astro",
    "../src/components/Footer.astro",
    "../src/components/InstaFollow.astro",
    "../src/components/MenuShowcase.astro",
    "../src/components/Nav.astro",
    "../src/pages/index.astro",
    "../src/pages/menu.astro"
  ].map(async (path) => ({ path, source: await readFile(new URL(path, import.meta.url), "utf8") }))
);

test("menu-route navigation qualifies homepage fragments", () => {
  assert.match(nav, /withBase\("\/"\)/);
  assert.doesNotMatch(nav, /href:\s*"#(?:origin|find-us)"/);
});

test("phone navigation remains operable", () => {
  assert.match(nav, /class="mobile-nav"/);
  assert.match(nav, /aria-label="(?:Open|Toggle) navigation"/);
  assert.match(css, /@media\s*\(max-width:\s*860px\)/);
  assert.match(css, /\.mobile-nav\s*\{[^}]*display:\s*block/s);
});

test("orange surfaces do not place white text on the orange accent", () => {
  assert.doesNotMatch(
    css,
    /\.btn-pink\s*\{[^}]*background:\s*var\(--pink\);[^}]*color:\s*#fff;/s
  );
  assert.doesNotMatch(
    css,
    /\.find-us\s*\{[^}]*background:\s*var\(--pink\);[^}]*color:\s*#fff;/s
  );
});

test("dark-orange badges use an accessible ink foreground", () => {
  assert.match(
    css,
    /\.badge-pink\s*\{[^}]*background:\s*var\(--pink-dark\);[^}]*color:\s*var\(--ink\);/s
  );
});

test("phone navigation uses a contrast-safe focus indicator", () => {
  assert.match(
    css,
    /\.mobile-nav summary:focus-visible,[^{]*\.mobile-nav a:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--ink\);/s
  );
});

test("editable homepage and store facts come from the site data module", () => {
  assert.match(siteData, /export const site\s*=/);
  assert.match(siteData, /70 Shenton Way/);
  assert.match(siteData, /Mori/);
  assert.match(siteData, /instagram\.com\/moof__bar/);

  for (const { path, source } of contentSources) {
    assert.match(source, /data\/site\.js/, `${path} should consume the shared site data module`);
    assert.doesNotMatch(
      source,
      /70 Shenton Way|Mori goes|instagram\.com\/moof__bar|9am\s*(?:&ndash;|-|–)\s*6pm/i,
      `${path} should not hard-code editable business facts`
    );
  }
});

test("site copy avoids unsupported comparative and customer claims", () => {
  const renderedCopySources = [siteData, menuData, ...contentSources.map(({ source }) => source)].join(
    "\n"
  );
  assert.doesNotMatch(
    renderedCopySources,
    /CBD['’]s chunkiest|No syrups pretending|people keep coming back|people build routines|come back often|zero shortcuts|FAN FAVE|criminally underrated/i
  );
});

test("menu data exposes only the collections used by the pages", () => {
  assert.doesNotMatch(menuData, /export const allMenu/);
});

test("Design B uses its GitHub Pages base path", () => {
  assert.match(astroConfig, /base:\s*"\/moof-website\/b"/);
});

test("ingredient-led home is built around source, ritual, flavour, and choice", () => {
  const homeCopy = [siteData, ...contentSources.map(({ source }) => source)].join("\n");

  assert.match(homeCopy, /source/i);
  assert.match(homeCopy, /ritual/i);
  assert.match(homeCopy, /flavou?r/i);
  assert.match(homeCopy, /choice/i);
  assert.match(homeCopy, /Mori/);
  assert.match(homeCopy, /Shiran/);
});

test("ingredient-led copy avoids medical and wellbeing promises", () => {
  const renderedCopySources = [siteData, menuData, ...contentSources.map(({ source }) => source)].join(
    "\n"
  );

  assert.doesNotMatch(
    renderedCopySources,
    /\b(?:wellness|wellbeing|health(?:y)?|detox|healing|immunity|immune|energy boost|focus|stress relief)\b/i
  );
});

test("calm mineral-and-sage visual system has a single-column phone layout", () => {
  assert.match(css, /--mineral:\s*#/);
  assert.match(css, /--sage:\s*#/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*\.hero-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /body\s*\{[^}]*overflow-x:\s*hidden;/s);
});
