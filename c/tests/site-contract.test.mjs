import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8").catch(() => "");

const [header, indexPage, edit, config] = await Promise.all([
  read("../src/components/Header.astro"),
  read("../src/pages/index.astro"),
  read("../src/components/SeasonalSocialEdit.astro"),
  read("../astro.config.mjs")
]);

test("the seasonal edit stays data-driven and social", () => {
  assert.match(indexPage, /SeasonalSocialEdit/);
  assert.match(edit, /seasonal\.map/);
  assert.match(edit, /instagram\.com\/moof__bar/);
});

test("the editorial header has an accessible phone treatment", () => {
  assert.match(header, /aria-label="(?:Open|Toggle) navigation"/);
});

test("the production base targets Design C", () => {
  assert.match(config, /base:\s*["']\/moof-website\/c["']/);
});
