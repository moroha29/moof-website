import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

test("homepage renders every approved content section with editable mappings", async () => {
  const page = await readFile(new URL("src/pages/index.astro", root), "utf8");
  for (const section of ["hero", "categories", "benefits", "solutions", "work", "process", "testimonials", "quote"]) {
    assert.match(page, new RegExp(`id=["']${section}["']`), `missing ${section} section`);
  }
  assert.match(page, /data-cms-path/);
  assert.match(page, /data-cms-paths/);
});

test("content keeps all owner-approved images paired with useful alt text", async () => {
  const content = JSON.parse(await readFile(new URL("src/assets/content/site.json", root), "utf8"));
  const images = [content.brand, content.hero, ...content.categories, ...content.caseStudies];
  for (const item of images) {
    assert.match(item.image, /^\/images\//);
    assert.ok(item.imageAlt?.length >= 8, `missing useful alt text for ${item.image}`);
  }
});
