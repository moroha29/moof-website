import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { prefixBase } from "../src/lib/base.js";
import {
  getAdjacentDrinkId,
  getCarouselDrinks,
  getSelectedDrink,
  sortMenusForDisplay
} from "../src/lib/carousel.js";

const coreMenu = {
  title: "Specialty Matcha / Hojicha",
  items: [
    { id: "classic-matcha", name: "Classic Matcha", active: true, isSeasonal: false },
    { id: "inactive-core", name: "Inactive Core", active: false, isSeasonal: false }
  ]
};

const seasonalMenu = {
  title: "Seasonal Drinks",
  seasonName: "Summer",
  items: [
    { id: "strawberry-royal", name: "Strawberry Royal", active: true, isSeasonal: true },
    { id: "black-sesame", name: "Black Sesame", active: true, isSeasonal: true }
  ]
};

test("getCarouselDrinks uses explicit content order so agents can interchange hero drinks", () => {
  const ordered = getCarouselDrinks([coreMenu, seasonalMenu], [
    "black-sesame",
    "classic-matcha",
    "strawberry-royal",
    "missing-id",
    "inactive-core"
  ]);

  assert.deepEqual(
    ordered.map((drink) => drink.id),
    ["black-sesame", "classic-matcha", "strawberry-royal"]
  );
});

test("getCarouselDrinks defaults to active seasonal drinks before core drinks", () => {
  const ordered = getCarouselDrinks([coreMenu, seasonalMenu]);

  assert.deepEqual(
    ordered.map((drink) => drink.id),
    ["strawberry-royal", "black-sesame", "classic-matcha"]
  );
});

test("sortMenusForDisplay keeps seasonal menu sections above core menu sections", () => {
  const ordered = sortMenusForDisplay([coreMenu, seasonalMenu]);

  assert.deepEqual(
    ordered.map((menu) => menu.title),
    ["Seasonal Drinks", "Specialty Matcha / Hojicha"]
  );
});

test("getSelectedDrink returns the requested active drink or falls back to the first carousel drink", () => {
  const drinks = getCarouselDrinks([coreMenu, seasonalMenu]);

  assert.equal(getSelectedDrink(drinks, "black-sesame").id, "black-sesame");
  assert.equal(getSelectedDrink(drinks, "missing-id").id, "strawberry-royal");
});

test("getAdjacentDrinkId wraps carousel arrows around the drink list", () => {
  const drinks = getCarouselDrinks([coreMenu, seasonalMenu]);

  assert.equal(getAdjacentDrinkId(drinks, "strawberry-royal", "previous"), "classic-matcha");
  assert.equal(getAdjacentDrinkId(drinks, "classic-matcha", "next"), "strawberry-royal");
  assert.equal(getAdjacentDrinkId(drinks, "black-sesame", "next"), "classic-matcha");
});

test("DrinkCarousel does not change featured drink from rail scroll", () => {
  const source = readFileSync(new URL("../src/components/DrinkCarousel.astro", import.meta.url), "utf8");

  assert.equal(source.includes('addEventListener(\n          "scroll"'), false);
});

test("prefixBase prefixes public image paths for GitHub Pages project hosting", () => {
  assert.equal(
    prefixBase("/images/classic-matcha-latte-cutout.png", "/moof-website/"),
    "/moof-website/images/classic-matcha-latte-cutout.png"
  );
});
