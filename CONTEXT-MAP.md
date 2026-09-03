# Context Map

This repo holds the Moof static website — a single Astro project at the repository root,
published at `https://moroha29.github.io/moof-website/`.

| Item | Path |
| --- | --- |
| Site source | `src/` |
| Images and static assets | `public/` |
| Editable content | `src/assets/content/site.json`, `src/assets/content/menu.json` |
| Contract tests | `tests/` |
| Deploy pipeline | `.github/workflows/deploy.yml` |

System-wide decisions (framework, content model, deploy pipeline) live in `docs/adr/`. The
platform spec lives in `docs/superpowers/specs/2026-07-19-moof-platform-spec.md`. AI
maintenance docs live in `docs/ai-knowledge-base/`.

## History

The repo previously held six parallel design variants (`a/` through `f/`) for a client
bake-off, each a separate bounded context with its own glossary. **Design F was chosen**, so
`f/` was promoted to the repository root and variants `a/` through `e/` were removed, along
with the `pages/` chooser page that linked them.

The bake-off plans and specs under `docs/superpowers/` are kept as design history and
describe variants that no longer exist. Read them as an archive, not as current structure.
Earlier variants remain in git history if their content is ever needed.

## Not part of the client site

`preprod/` holds unconverted demo sites for prospective clients. They build independently
and deploy under `/preprod/`; a failed preprod build never blocks the Moof deploy.
