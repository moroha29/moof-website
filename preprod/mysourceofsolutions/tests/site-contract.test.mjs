import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage contains every requested preview and contact section", async () => {
  const page = await read("src/pages/index.astro");
  for (const section of ["hero", "categories", "benefits", "solutions", "work", "testimonials", "quote"]) {
    assert.match(page, new RegExp(`id=["']${section}["']`), `missing ${section} section`);
  }
  for (const phrase of ["Featured products", "Why MySOS", "Success stories", "WhatsApp"]) {
    assert.match(page, new RegExp(phrase, "i"), `homepage is missing ${phrase}`);
  }
  assert.match(page, /data-cms-path/);
  assert.match(page, /data-cms-paths/);
});

test("all blueprint pages and detail routes are implemented", async () => {
  const routes = [
    "src/pages/products/index.astro",
    "src/pages/products/[slug].astro",
    "src/pages/why-mysos.astro",
    "src/pages/solutions.astro",
    "src/pages/success-stories/index.astro",
    "src/pages/success-stories/[slug].astro",
    "src/pages/blog/index.astro",
    "src/pages/blog/[slug].astro"
  ];
  for (const route of routes) assert.ok((await read(route)).length > 200, `${route} is missing or empty`);
});

test("products page has six categories, six printing methods and FAQ without the deferred buying guide", async () => {
  const content = JSON.parse(await read("src/assets/content/pages.json"));
  assert.deepEqual(content.products.categories.map((item) => item.name), ["Apparel", "Bags", "Drinkware", "Stationery", "Corporate gifts", "Event essentials"]);
  assert.deepEqual(content.products.printingMethods.map((item) => item.name), ["Silkscreen", "DTF", "DTG", "Embroidery", "Sublimation", "UV"]);
  assert.ok(content.products.faq.length >= 5);
  assert.equal("buyingGuide" in content.products, false);
  for (const category of content.products.categories) {
    assert.equal(category.products.length, 3, `${category.name} needs product cards`);
    assert.ok(category.methods.length >= 3, `${category.name} needs printing recommendations`);
  }
});

test("why, solutions, stories and blog match the requested section counts", async () => {
  const content = JSON.parse(await read("src/assets/content/pages.json"));
  assert.equal(content.why.reasons.length, 5);
  assert.deepEqual(content.why.process.map((step) => step.title), ["Enquiry", "Recommendation", "Quotation", "Sampling", "Production", "Delivery"]);
  assert.deepEqual(content.solutions.industries.map((item) => item.name), ["Schools", "Businesses", "Events", "Churches", "Sports Teams"]);
  for (const solution of content.solutions.industries) {
    assert.ok(solution.bundle.length >= 4);
    assert.ok(solution.problem && solution.outcome && solution.storySlug);
  }
  assert.ok(content.stories.items.length >= 3);
  for (const story of content.stories.items) {
    assert.ok(story.challenge && story.solution && story.outcome && story.testimonial);
    assert.ok(story.gallery.length >= 2);
    assert.ok(story.relatedProducts.length && story.relatedSolutions.length);
  }
  assert.deepEqual(content.blog.categories, ["Printing", "Materials", "Design Tips", "Buying Guides", "Behind the Scenes", "Case Studies"]);
  assert.ok(content.blog.articles.some((article) => article.featured));
  assert.ok(content.blog.articles.some((article) => article.popular));
  assert.ok(content.blog.newsletter.heading);
});

test("all content imagery has useful alternative text and internal cards have real destinations", async () => {
  const site = JSON.parse(await read("src/assets/content/site.json"));
  const pages = JSON.parse(await read("src/assets/content/pages.json"));
  const images = [
    site.brand,
    site.hero,
    ...site.categories,
    ...site.caseStudies,
    pages.products.hero,
    ...pages.products.categories,
    ...pages.products.printingMethods,
    pages.why.hero,
    pages.solutions.hero,
    ...pages.solutions.industries,
    pages.stories.hero,
    ...pages.stories.items,
    pages.blog.hero,
    ...pages.blog.articles
  ];
  for (const item of images) {
    assert.match(item.image, /^\/images\//);
    assert.ok(item.imageAlt?.length >= 8, `missing useful alt text for ${item.image}`);
  }
  const source = (await Promise.all([
    read("src/pages/index.astro"),
    read("src/pages/products/index.astro"),
    read("src/pages/success-stories/index.astro"),
    read("src/pages/blog/index.astro")
  ])).join("\n");
  assert.doesNotMatch(source, /href=["']#["']/);
});

test("mobile styles keep the logo, navigation, wordmarks and content grids visible", async () => {
  const css = await read("src/styles/global.css");
  const header = await read("src/components/SiteHeader.astro");
  assert.match(css, /\.brand img\{[^}]*object-fit:contain/);
  assert.match(css, /\.brand\{[^}]*overflow:visible/);
  assert.match(css, /\.mobile-nav nav\{[^}]*overflow-y:auto/);
  assert.match(css, /\.trust \.logo-row\{[^}]*grid-template-columns:1fr 1fr/);
  assert.match(css, /@media\(max-width:380px\)/);
  assert.match(css, /\.portrait-grid[^}]*grid-template-columns:1fr/);
  assert.match(css, /input,select,textarea\{max-width:100%\}/);
  assert.match(header, /class="mobile-nav"/);
  assert.match(header, /aria-label="Mobile navigation"/);
});

test("desktop header logo, menu and quote action share one alignment height", async () => {
  const css = await read("src/styles/global.css");
  assert.match(css, /\.site-header\{--header-control-height:44px;[^}]*align-items:center/);
  assert.match(css, /\.brand\{[^}]*height:var\(--header-control-height\)[^}]*align-items:center/);
  assert.match(css, /\.site-header \.desktop-nav\{height:var\(--header-control-height\);align-items:center\}/);
  assert.match(css, /\.site-header \.desktop-nav a\{[^}]*height:var\(--header-control-height\)[^}]*line-height:1/);
  assert.match(css, /\.site-header \.header-quote\{[^}]*height:var\(--header-control-height\)[^}]*line-height:1/);
});
