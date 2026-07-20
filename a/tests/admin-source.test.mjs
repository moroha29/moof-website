import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../src/pages/admin.astro", import.meta.url), "utf8");

test("Admin sandbox previews full website pages and supports menu edits/removal", () => {
  assert.match(source, /const menuCatalog = menus\.map/);
  assert.match(source, /data-home-page-preview/);
  assert.match(source, /data-menu-page-preview/);
  assert.match(source, /function renderFullMenu/);
  assert.match(source, /function renderHomePage/);
  assert.match(source, /function renderMenuPage/);
  assert.match(source, /data-menu-editor-list/);
  assert.match(source, /data-remove-item/);
  assert.match(source, /data-remove-selected/);
  assert.match(source, /data-add-item/);
  assert.match(source, /data-add-category/);
});
