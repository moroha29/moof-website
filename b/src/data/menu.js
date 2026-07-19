// Core menu — always on the board.
export const coreMenu = [
  {
    id: "classic-matcha-latte",
    name: "Classic Matcha Latte",
    price: "$7",
    tag: "FAN FAVE",
    blurb: "Layered matcha + milk, soft clean finish. The gateway drink and we don't gatekeep.",
    temp: "Hot or Cold",
    milk: "Fresh or Oat",
    image: "images/classic-matcha-latte-cutout.png"
  },
  {
    id: "specialty-matcha-latte",
    name: "Specialty Matcha Latte",
    price: "$9",
    tag: "THE UPGRADE",
    blurb: "A richer pour using Moof's exclusive matcha profile. For when Classic just isn't hitting today.",
    temp: "Hot or Cold",
    milk: "Fresh or Oat",
    image: "images/specialty-matcha-latte-cutout.png"
  },
  {
    id: "specialty-usucha",
    name: "Specialty Usucha",
    price: "$8",
    tag: "PURIST MODE",
    blurb: "Pure matcha, zero milk, zero chill (well, actually very chill — it's cold only). No dilution, no apologies.",
    temp: "Cold Only",
    milk: "No Milk",
    image: "images/specialty-usucha-cutout.png"
  },
  {
    id: "classic-hojicha-latte",
    name: "Classic Hojicha Latte",
    price: "$7",
    tag: "COZY ARC",
    blurb: "Roasty hojicha + milk, mellow finish. Basically a hug that's also a caffeinated beverage.",
    temp: "Hot or Cold",
    milk: "Fresh or Oat",
    image: "images/classic-hojicha-latte-cutout.png"
  }
];

// Seasonal drops — rotating batch, subject to change (but this is what's on right now).
export const seasonalMenu = [
  {
    id: "strawberry-royal-matcha",
    name: "Strawberry Royal Milk Pudding",
    price: "$9",
    tag: "SEASONAL",
    blurb: "Strawberry puree + milk pudding, layered with matcha or hojicha (your call). Looks like a sunset, drinks like dessert.",
    temp: "Cold Only",
    milk: "Matcha or Hojicha",
    image: "images/strawberry-royal-matcha-cutout.png"
  },
  {
    id: "black-sesame-matcha",
    name: "Black Sesame",
    price: "$8.50",
    tag: "SEASONAL",
    blurb: "Black sesame paste + syrup, with matcha or hojicha. Nutty, toasty, criminally underrated flavor combo.",
    temp: "Cold Only",
    milk: "Matcha or Hojicha",
    image: "images/black-sesame-matcha-cutout.png"
  },
  {
    id: "pickled-ume-plum-iced-tea",
    name: "Pickled Ume & Plum Iced Tea",
    price: "$7",
    tag: "NO MILK GANG",
    blurb: "Bright, tart, ice-cold. The plot twist on our menu for people who like their drinks with attitude.",
    temp: "Cold Only",
    milk: "No Milk",
    image: "images/pickled-ume-plum-iced-tea-cutout.png"
  }
];

export const allMenu = [...coreMenu, ...seasonalMenu];
