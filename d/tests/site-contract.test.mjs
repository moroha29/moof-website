import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const stickyBar = await readFile(
  new URL("../src/components/StickyDirectionsBar.astro", import.meta.url),
  "utf8"
);
const astroConfig = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");

test("sticky directions spacing shares one safe-area-aware contract", () => {
  assert.match(css, /--sticky-cta-height:\s*70px/);
  assert.match(
    css,
    /padding-bottom:\s*calc\(var\(--sticky-cta-height\)\s*\+\s*env\(safe-area-inset-bottom\)\)/
  );
  assert.match(css, /min-height:\s*var\(--sticky-cta-height\)/);
  assert.match(
    css,
    /\.sticky-cta\s*{[^}]*padding:\s*[^;]*env\(safe-area-inset-bottom\)[^;]*;/s
  );
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
