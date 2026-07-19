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

export function sortMenusForDisplay(menus) {
  return [...menus].sort((a, b) => Number(isSeasonalMenu(b)) - Number(isSeasonalMenu(a)));
}
