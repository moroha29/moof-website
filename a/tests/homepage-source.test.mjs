import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("redesigned pages continue to draw the menu and visit facts from source content", () => {
  const home = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");
  const menu = readFileSync(new URL("../src/pages/menu.astro", import.meta.url), "utf8");

  assert.match(home, /getEntry\("site", "homepage"\)/);
  assert.match(home, /getCollection\("menu"\)/);
  assert.match(home, /homepage\.data\.findUs/);
  assert.match(menu, /getCollection\("menu"\)/);
  assert.equal(/\.review\b/.test(home), false);
  assert.equal(/\.review\b/.test(menu), false);
});
