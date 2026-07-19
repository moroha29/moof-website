import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage uses custom announcement instead of Instagram embed section", () => {
  const source = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");

  assert.equal(source.includes("InstagramEmbed"), false);
  assert.equal(source.includes("AnnouncementSection"), true);
  assert.equal(source.includes("customAnnouncement"), true);
});
