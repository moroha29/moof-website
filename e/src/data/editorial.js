import { site } from "./site.js";

const credit = site.credit;

export const editorialMedia = [
  {
    href: "/menu/",
    label: "The pour",
    title: "Menu",
    image: { src: "/images/editorial/01-moof-exterior.jpg", alt: "Moof matcha bar at Eon Shenton", credit, focal: "center" }
  },
  {
    href: "#story",
    label: "Made at the counter",
    title: "The counter",
    image: { src: "/images/editorial/02-counter.jpg", alt: "A matcha drink being prepared at Moof", credit, focal: "center" }
  },
  {
    href: "#visit",
    label: "Eon Shenton, Singapore",
    title: "Visit",
    image: { src: "/images/editorial/04-drink-trio.jpg", alt: "Three Moof matcha and hojicha drinks on the counter", credit, focal: "center" }
  }
];

export const menuMedia = [
  { src: "/images/editorial/05-black-sesame.jpg", alt: "Black sesame matcha at Moof", credit, focal: "center" },
  { src: "/images/editorial/06-hojicha.jpg", alt: "Classic hojicha latte at Moof", credit, focal: "center" },
  { src: "/images/editorial/07-strawberry.jpg", alt: "Strawberry royal milk pudding matcha at Moof", credit, focal: "center" }
];
