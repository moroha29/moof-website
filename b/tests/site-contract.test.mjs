import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const nav = await readFile(new URL("../src/components/Nav.astro", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
const astroConfig = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");

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

test("Design B uses its GitHub Pages base path", () => {
  assert.match(astroConfig, /base:\s*"\/moof-website\/b"/);
});
