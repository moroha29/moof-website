# Design E — Lula-inspired image index

## Goal

Create a fifth, standalone Moof website at `/moof-website/e/`. It must leave designs A–D unchanged and use the supplied HungryGoWhere Moof photography, which the owner has approved for reuse.

## Visual direction

Design E takes its structural cues from Lula Cafe's homepage: a warm cream canvas, small utility information, restrained navigation, oversized editorial link headings, and full-bleed photography that carries most of the page. It is an inspiration, not a copy of Lula Cafe's branding, copy, or assets.

## Home

- A compact header with the Moof wordmark, location, hours, Menu, and Visit.
- A sequence of large, linked image panels using the supplied photography:
  - `Menu` leads to the E menu route.
  - `The counter` anchors to a short origin and craft statement.
  - `Visit` anchors to the address and opening hours.
- Each panel has only a short title and small label; no card grid, review copy, or promotional claims.
- A compact visit block closes the page with the supplied Moof location and Instagram link.

## Menu

- A single, quiet list of the existing drink data, divided into core and seasonal groups.
- Each drink can be opened to reveal its description, serving options, specialised ingredients, and distinctive point.
- Selected HungryGoWhere drink images interrupt the list as editorial photography rather than as repeated product cards.

## Media

- Download and store a selected set of article images locally in `e/public/images/editorial/`.
- Preserve source attribution in the asset manifest and expose a compact photographer credit in the page footer: `Photos: Zawani Abdul Ghani / HungryGoWhere`.
- Use only the article assets the user has explicitly confirmed they own.

## Delivery and verification

- Add `e` to the existing GitHub Pages build loop, deploying it at `/moof-website/e/`.
- Build and test E locally.
- Push to `main`, then verify the deployed E URL and a representative local image URL.
