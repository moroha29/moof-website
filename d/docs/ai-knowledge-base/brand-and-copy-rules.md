# Design D Brand and Copy Rules

Use these rules for Design D after reading the shared repository knowledge base and the Design D delta spec.

## Preserve

- Forest and cream as the dominant color blocks, with coral reserved for decisive actions and urgency accents.
- A phone-first, conversion-oriented sequence with persistent access to directions.
- Direct, practical copy focused on what Moof serves, where it is, when it is open, and why to visit now.
- Compact menu rows, clear prices, product cutouts, and short supporting descriptions.
- Seasonal prominence without fabricated countdowns, quantities, or dates.
- The shared safe-area-aware sticky-bar height contract in `src/styles/global.css`.

## Customer Quotes

- Preserve quote wording and source labels from `src/data/menu.js`.
- Never invent a name, demographic, role, or relationship for an unattributed customer.
- `Regular customer` is a source label, not permission to infer an identity.
- Remove or correct a quote only when the owner supplies replacement information.

## Copy Style

- Lead with the useful fact or action.
- Use short sentences and concrete location, menu, and visit language.
- Prefer `Get Directions`, `See Today's Menu`, and `Walk in today` over vague calls to action.
- Do not add ordering, reservations, delivery, loyalty, or stock claims unless the owner supplies them.

## Safe Maintenance

Routine updates should change the independent files in `src/data/` and existing image assets. Keep internal links base-path aware through `withBase`, keep directions sourced from `site.directionsUrl`, and run `npm test` followed by `npm run build` before publishing.
