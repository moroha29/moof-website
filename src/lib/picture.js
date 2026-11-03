import { withBase } from "./base.js";

/*
 * A picture the owner has not chosen yet.
 *
 * Every picture on this site is editable in the website manager, and the
 * manager has a "remove picture" button — so any of them can arrive here as an
 * empty string, and a drink added from the manager arrives with no photograph
 * at all. `src=""` makes the browser re-request the page itself and draw a
 * broken-image icon in the card, and the repository's own check then refused to
 * publish the drink, which left the owner a red banner and no way forward.
 *
 * A drawn stand-in keeps the card whole until a photograph is chosen. It stays
 * an <img> on purpose: that element is what the manager's preview binds
 * "choose a picture" to, so removing it would take away the way back.
 */
const standIn = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" fill="none" stroke="#f4eadb" stroke-width="3" stroke-linejoin="round">'
    + '<path d="M28 34h64l-7 96a10 10 0 0 1-10 9H45a10 10 0 0 1-10-9z"/>'
    + '<path d="M22 34h76" stroke-linecap="round"/>'
    + '<path d="M60 64v44M44 78v16M76 78v16" stroke-linecap="round" opacity=".4"/>'
    + "</svg>",
)}`;

/** A picture's address, or the stand-in while there is no picture. */
export const picture = (value) => (String(value ?? "").trim() ? withBase(value) : standIn);

/** What a picture shows, described by the thing it is of when it says nothing. */
export const pictureAlt = (value, fallback = "") => String(value ?? "").trim() || String(fallback ?? "").trim();
