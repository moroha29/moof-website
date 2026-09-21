import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

/*
 * Text styles from the website manager reach the live site.
 *
 * They were published into site.json as appearance.overrides and never read.
 * TextStyles.astro applies them on the page they were set on; it was checked in
 * a real browser against a build carrying styles.
 */

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("both pages apply the styles set on them", async () => {
  const [home, menuPage] = await Promise.all([read("../src/pages/index.astro"), read("../src/pages/menu/index.astro")]);
  assert.match(home, /<TextStyles page="homepage" \/>/);
  assert.match(menuPage, /<TextStyles page="menu" \/>/);
});

test("only the choices the manager offers, and never inside its preview", async () => {
  const component = await read("../src/components/TextStyles.astro");
  assert.match(component, /item\.page === page/);
  // Any size the manager's slider offers, and nothing wild.
  assert.match(component, /const scales = \{ has: \(value\) => Number\.isFinite\(value\) && value >= 0\.5 && value <= 3 && value !== 1 \};/);
  assert.match(component, /\/\^#\[0-9a-f\]\{6\}\$\/i/);
  assert.match(component, /document\.documentElement\.hasAttribute\('data-manager-preview'\)/);
  // Nothing is sent to a page with no styles.
  assert.match(component, /\{overrides\.length > 0 && <script is:inline/);
});
