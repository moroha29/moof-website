# Site A Mobile Find Us Design

## Goal

Make Site A's featured-drink area lighter on small screens and make store information readable through normal vertical scrolling.

## Decisions

- Remove the review and tasting-profile panels from the featured-drink carousel for every viewport. The carousel continues to show the selected drink, description, image, rail, and previous/next controls.
- Remove the now-unused review and tasting update data and script handling from the carousel component. Content schema is unchanged because the menu route still consumes the same drink records.
- On viewports below `760px`, render Find Us as a one-column grid with no horizontal overflow. Each existing card occupies the available width and follows the previous card vertically.
- Preserve the existing multi-card row on desktop.

## Verification

- Source contract tests assert the carousel has no review/tasting panels or update data and that the mobile Find Us rules prevent horizontal scrolling and create a single-column layout.
- The Site A test suite and production build pass.
