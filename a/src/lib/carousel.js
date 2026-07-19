function activeDrinksFromMenus(menus) {
  return menus.flatMap((menu) => menu.items).filter((item) => item.active);
}

function isSeasonalMenu(menu) {
  return Boolean(menu.seasonName) || menu.items.some((item) => item.isSeasonal);
}

export function getCarouselDrinks(menus, carouselDrinkIds = []) {
  const activeDrinks = activeDrinksFromMenus(menus);

  if (carouselDrinkIds.length > 0) {
    const activeById = new Map(activeDrinks.map((drink) => [drink.id, drink]));
    return carouselDrinkIds.map((id) => activeById.get(id)).filter(Boolean);
  }

  return [...activeDrinks].sort((a, b) => Number(b.isSeasonal) - Number(a.isSeasonal));
}

export function getSelectedDrink(drinks, selectedDrinkId) {
  return drinks.find((drink) => drink.id === selectedDrinkId) ?? drinks[0] ?? null;
}

export function getAdjacentDrinkId(drinks, selectedDrinkId, direction) {
  if (drinks.length === 0) {
    return null;
  }

  const currentIndex = Math.max(
    0,
    drinks.findIndex((drink) => drink.id === selectedDrinkId)
  );
  const offset = direction === "previous" ? -1 : 1;
  const nextIndex = (currentIndex + offset + drinks.length) % drinks.length;
  return drinks[nextIndex].id;
}

export function getRatingStars(rating, max = 5) {
  const filledCount = Math.min(Math.max(Number(rating) || 0, 0), max);
  return Array.from({ length: max }, (_, index) => index < filledCount);
}

export function sortMenusForDisplay(menus) {
  return [...menus].sort((a, b) => Number(isSeasonalMenu(b)) - Number(isSeasonalMenu(a)));
}
