import editorialContent from "../assets/content/editorial.json";
import { site } from "./site.js";

const addCredit = (item) => ({
  ...item,
  credit: item.credit ?? site.credit,
  image: item.image
    ? {
        ...item.image,
        credit: item.image.credit ?? site.credit
      }
    : item.image
});

export const editorialMedia = editorialContent.editorialMedia.map(addCredit);
export const menuMedia = editorialContent.menuMedia.map(addCredit);
