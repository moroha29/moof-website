import assert from "node:assert/strict";
import test from "node:test";
import { getCarouselDrinks, sortMenusForDisplay } from "../src/lib/carousel.js";

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
