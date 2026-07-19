# Design C Delta Spec: Editorial Calm

## Purpose And Audience

Design C is the aesthetics-first Moof concept. Its primary audience is an aesthetics-conscious matcha customer who values tasteful cafés, photo-worthy seasonal drinks, visual identity, and places worth sharing. The experience should feel aspirational and considered without becoming cold, inaccessible, or luxury-coded beyond Moof's everyday menu.

This document only describes C's visual and feature differences. The root Moof platform spec remains authoritative for shared business facts, routes, deployment, and maintenance boundaries.

## Reference And Deliberate Differences

The composition takes inspiration from Kyō Kohee's warm neutrals, editorial typography, generous whitespace, restrained navigation, location storytelling, and guest-review rhythm. It does not copy Kyō Kohee assets, wording, layouts, trade dress, commerce controls, full-bleed café media, or multi-location presentation.

C remains recognizably Moof through:

- matcha green and hojicha brown accents;
- Moof's existing drink cutouts and menu facts;
- the compact core-and-seasonal menu;
- the Mori and Shiran ritual story;
- a quieter, smaller-scale Singapore CBD hospitality voice;
- an original numbered Seasonal Edit composed from local menu data.

## Page Structure

The homepage preserves the sparse hero, ritual section, compact menu, testimonial band, and visit card. Between the menu and testimonials, the Seasonal Edit presents all three current seasonal drinks as a photo-led editorial sequence and finishes with an explicit `@moof__bar` Instagram path.

The `/menu` route remains a focused list view. Both routes use the `/moof-website/c/` deployment base.

## Responsive Navigation

Desktop keeps the restrained letter-spaced navigation. At 640px and below, it becomes a native disclosure with a clearly labelled control and 44px link targets. The open panel must fit inside the viewport at 320px without forcing horizontal scrolling.

## Content Contract

For this bake-off release, C retains its independent plain-JavaScript data module as permitted by ADR 0002. The Seasonal Edit imports and maps the existing `seasonal` array; it must never duplicate seasonal names, descriptions, or image paths in the component. Migration to the canonical Content Collection schema is deferred until client selection.
