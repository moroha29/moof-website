# Design B Delta Spec: Playful Tsujiri Reinterpretation

This document defines how Design B differs from the shared Moof platform spec. Shared framework, deployment, business facts, and maintenance rules remain governed by the root documentation.

## Audience And Intent

Design B is the energetic client-bake-off option for customers who respond to bold color, casual language, and highly scannable product cards. The page should feel immediately friendly and memorable on a phone without sacrificing legibility or navigation.

## Reference And Divergence

Tsujiri Singapore is structural inspiration only. Design B follows a comparable progression from tea provenance to products, location, and social content because that sequence helps a first-time visitor understand the ingredients before choosing a drink.

The visual treatment deliberately diverges from the reference. Design B uses Moof's chunky rounded type, hard black outlines and drop shadows, sticker-like labels, saturated green/yellow/orange/lilac blocks, cutout drink imagery, and irreverent conversational copy. It must not copy Tsujiri logos, assets, layouts pixel-for-pixel, distinctive graphic motifs, or other trade dress.

## Page Contract

The homepage preserves:

- a product-led hero with menu and location actions;
- an Ingredient Story for Mori and Shiran;
- separate Core Lineup and Seasonal Drop grids;
- location and directions cards;
- a Social Mosaic with one explicit Instagram path.

The menu route presents the complete core and seasonal grids. Header links to the Ingredient Story and location must be qualified with the homepage base so they work from both routes.

## Responsive And Accessibility Rules

- At phone widths, navigation remains visible through a labelled, keyboard-operable compact menu.
- The layout must not depend on desktop-only spacing or hover states.
- Orange surfaces use ink-colored text, or another foreground that meets accessible contrast; white must not be placed on the bright orange accent.
- Focus indicators remain visible against every saturated background.

## Data Trade-off

For this comparison release, homepage/store content and menu content remain in local plain-JavaScript data modules as permitted by root ADR 0002. If the client selects Design B or one of its sections, migrate the surviving implementation to the canonical Content Collection schema before routine AI maintenance begins.
