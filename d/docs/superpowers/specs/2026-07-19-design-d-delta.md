# Design D Delta Spec: Conversion-First Mobile

This delta spec defines the presentation choices unique to Design D. The root platform spec remains authoritative for shared store facts, maintenance, framework, and deployment behavior.

## Direction

Design D is the direct-response concept in the Moof bake-off. It is independent from the Tsujiri structural reference used by Design B and the Kyō Kohee editorial reference used by Design C. It uses Moof's own forest, cream, and coral system to move a nearby mobile visitor quickly from interest to an in-person visit.

## Phone-First Sequence

1. A concise hero states the product and proximity promise, then offers directions and the menu.
2. Social Proof reduces uncertainty with only the supplied customer quotes and source labels.
3. Seasonal Urgency presents the current limited menu and repeats the Directions CTA.
4. A compact core menu makes products and prices scannable without interrupting the visit path.
5. The visit section provides address, hours, transport note, map, Instagram, and directions.
6. A persistent phone Directions CTA remains available above the device safe area. Page content reserves the same bar-height contract so footer content is never covered.

## Visual Rules

- Use bold forest sections, warm cream surfaces, and coral for the primary action.
- Keep the navigation small and the content hierarchy direct.
- Prefer short scannable blocks, visible prices, product cutouts, and decisive calls to action.
- Preserve generous enough spacing for 320px-wide screens; desktop enhancement must not weaken the phone journey.

## Content Integrity

Store facts, menu items, prices, images, links, and customer quotes come from existing D data. Do not invent customer attribution, business claims, scarcity dates, stock quantities, or service capabilities. Plain JavaScript data modules remain acceptable for this comparison release under ADR 0002.

## Routes and Deployment

The Astro project generates `/` and `/menu` beneath `/moof-website/d/`. Internal routes and assets must remain base-path aware, and the existing multi-variant GitHub Pages workflow remains the release path.
