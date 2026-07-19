import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const stickyBar = await readFile(
  new URL("../src/components/StickyDirectionsBar.astro", import.meta.url),
  "utf8"
);
const astroConfig = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
const hero = await readFile(new URL("../src/components/Hero.astro", import.meta.url), "utf8");
const seasonalUrgency = await readFile(
  new URL("../src/components/SeasonalUrgency.astro", import.meta.url),
  "utf8"
);
const menuHighlight = await readFile(
  new URL("../src/components/MenuHighlight.astro", import.meta.url),
  "utf8"
);
const socialProof = await readFile(
  new URL("../src/components/SocialProof.astro", import.meta.url),
  "utf8"
);
const menuPage = await readFile(new URL("../src/pages/menu.astro", import.meta.url), "utf8");
const visitSection = await readFile(
  new URL("../src/components/VisitSection.astro", import.meta.url),
  "utf8"
);
const siteData = await readFile(new URL("../src/data/site.js", import.meta.url), "utf8");

test("sticky directions spacing shares one safe-area-aware contract", () => {
  assert.match(css, /--sticky-cta-height:\s*70px/);
  assert.match(
    css,
    /padding-bottom:\s*calc\(var\(--sticky-cta-height\)\s*\+\s*env\(safe-area-inset-bottom\)\)/
  );
  assert.match(
    css,
    /height:\s*calc\(var\(--sticky-cta-height\)\s*\+\s*env\(safe-area-inset-bottom\)\)/
  );
  assert.doesNotMatch(css, /\.sticky-cta\s*{[^}]*min-height:/s);
  assert.match(
    css,
    /\.sticky-cta\s*{[^}]*padding:\s*[^;]*env\(safe-area-inset-bottom\)[^;]*;/s
  );
  assert.match(css, /\.sticky-cta\s*{[^}]*box-sizing:\s*border-box;/s);
  assert.match(css, /\.sticky-cta a\s*{[^}]*height:\s*100%;/s);
});

test("desktop removes reserved spacing and the sticky directions bar", () => {
  assert.match(
    css,
    /@media\s*\(min-width:\s*641px\)\s*{\s*body\s*{\s*padding-bottom:\s*0;\s*}\s*}/
  );
  assert.match(
    css,
    /@media\s*\(min-width:\s*641px\)\s*{\s*\.sticky-cta\s*{\s*display:\s*none;\s*}\s*}/
  );
});

test("directions and deployment contracts remain source-driven", () => {
  assert.match(stickyBar, /href={site\.directionsUrl}/);
  assert.match(astroConfig, /base:\s*["']\/moof-website\/d["']/);
});

test("homepage copy is data-driven and avoids unsupported claims", () => {
  const renderedCopySources = `${hero}\n${seasonalUrgency}\n${menuPage}\n${siteData}`;

  assert.match(hero, /homepage\.hero\./);
  assert.match(seasonalUrgency, /homepage\.seasonal\./);
  assert.match(menuHighlight, /homepage\.menuHighlight\./);
  assert.match(socialProof, /homepage\.socialProofLabel/);
  assert.match(visitSection, /homepage\.visit\./);
  assert.doesNotMatch(
    renderedCopySources,
    /limited batch|small batches|once this batch is gone|small-batch|limited-time|before it rotates out|no sign-up|no queue app/i
  );
  assert.match(siteData, /export const homepage\s*=/);
  assert.match(menuPage, /during\s*{site\.hours}/);
  assert.doesNotMatch(menuPage, /Mon(?:–|-)Fri\s+9am(?:–|-)6pm/);
});

test("menu rows share one renderer", async () => {
  const menuRow = await readFile(
    new URL("../src/components/MenuRow.astro", import.meta.url),
    "utf8"
  ).catch(() => "");

  assert.match(menuHighlight, /import MenuRow/);
  assert.match(menuHighlight, /<MenuRow/);
  assert.match(menuPage, /import MenuRow/);
  assert.equal((menuPage.match(/<MenuRow/g) ?? []).length, 2);
  assert.match(menuRow, /item\.tags\.join/);
  assert.doesNotMatch(menuHighlight, /item\.tags\.join/);
  assert.doesNotMatch(menuPage, /item\.tags\.join/);
});

test("unused site and visit APIs are removed", () => {
  assert.doesNotMatch(siteData, /mapSearchUrl/);
  assert.doesNotMatch(visitSection, /compact|Astro\.props|interface Props/);
});
