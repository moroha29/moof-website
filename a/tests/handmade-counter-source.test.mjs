import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("Home is composed as a handmade counter with daily pours and a vertical visit board", () => {
  const source = readSource("../src/pages/index.astro");

  assert.match(source, /class="counter-hero"/);
  assert.match(source, /id="today"/);
  assert.match(source, /class="counter-notes"/);
  assert.match(source, /class="visit-board"/);
});

test("Home and Menu offer accessible base-path navigation in both directions", () => {
  const home = readSource("../src/pages/index.astro");
  const menu = readSource("../src/pages/menu.astro");

  assert.match(home, /href={withBase\("menu"\)}/);
  assert.match(menu, /href={withBase\(""\)}/);
  assert.match(home, /aria-label="Primary navigation"/);
  assert.match(menu, /aria-label="Primary navigation"/);
});

test("counter layout is constrained on phones without document-level horizontal overflow", () => {
  const styles = readSource("../src/styles/global.css");
  const phoneRules = styles.slice(styles.indexOf("@media (max-width: 680px)"));

  assert.match(styles, /body\s*\{[\s\S]*?overflow-x:\s*clip;/);
  assert.match(phoneRules, /\.visit-board\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(phoneRules, /\.counter-hero\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
});
