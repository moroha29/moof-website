import assert from "node:assert/strict";
import test from "node:test";
import { getInstagramPreviewPosts } from "../src/lib/instagram.js";

test("getInstagramPreviewPosts keeps active curated posts capped at three", () => {
  const posts = [
    { caption: "seasonal", active: true },
    { caption: "bakes", active: false },
    { caption: "matcha", active: true },
    { caption: "hojicha", active: true },
    { caption: "extra", active: true }
  ];

  assert.deepEqual(
    getInstagramPreviewPosts(posts).map((post) => post.caption),
    ["seasonal", "matcha", "hojicha"]
  );
});
