# Moof Redesign: A, B, and D

## Scope

Replace the existing visual and interaction designs for A, B, and D. Keep C unchanged. Every redesign retains a responsive Home page and Menu page, uses the existing Moof product imagery and factual store/menu content, and builds beneath its existing GitHub Pages base path.

## A — Handmade Local, Lightly Whimsical

Create a warm neighbourhood drinks counter: paper-like cream, ink, deep matcha, terracotta and butter-yellow accents; imperfect rule lines; hand-drawn drink/ingredient motifs; and small playful labels. The Home page should feel like a daily counter board: a crafted hero, today's pour, local/seasonal notes, a concise menu preview, and a vertically readable visit section. The Menu page should feel like a curated counter card rather than a dense catalogue. Whimsy supports legibility and never creates horizontal overflow on phones.

## B — Wellness, Curated Ingredients

Create a clear, calming ingredient-led experience using soft matcha, mineral cream, muted sage, and restrained warm accents. Frame drinks around source, ritual, flavours, and choice—not medical outcomes or unsupported health claims. The Home page should move from an ingredient-led hero to ingredient standards, drink choices, a gentle menu preview, and visit information. The Menu page should prioritise ingredient descriptions and easy scanning.

## D — Simplistic

Create an intentionally minimal site: a mostly monochrome palette with one Moof-green accent, ample whitespace, a single decisive typographic hierarchy, prominent drink imagery, and no decorative excess. The Home page should be a short sequence of introduction, featured drinks, concise menu entry point, and location. The Menu page should be a highly readable product list. Remove conversion-first urgency, social-proof, and persistent/sticky conversion UI that conflict with the simplified direction.

## Shared Rules

- C is out of scope and must not change.
- Preserve valid local navigation, accessible controls, base-path links, and phone layouts.
- Use only supplied menu, ingredient, location, and image facts; do not invent reviews, health outcomes, urgency, or operational promises.
- Each variant adds/updates focused contract tests that cover its defining responsive/navigation/content behaviour.
- Every variant passes `npm --prefix <variant> test` and `npm --prefix <variant> run build` before integration.
