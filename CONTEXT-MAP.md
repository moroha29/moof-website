# Context Map

This repo holds multiple parallel design variants of the Moof static website, built for a client bake-off. Each variant is a separate bounded context with its own glossary — same business, different presentation.

| Variant | Path | Glossary | Delta Spec |
| --- | --- | --- | --- |
| A | `a/` | `a/CONTEXT.md` | `a/docs/superpowers/specs/` |
| B | `b/` | `b/CONTEXT.md` | `b/docs/superpowers/specs/` |
| C | `c/` | `c/CONTEXT.md` | `c/docs/superpowers/specs/` |
| D | `d/` | `d/CONTEXT.md` | `d/docs/superpowers/specs/` |

System-wide decisions (framework, content model, deploy pipeline) live in root `docs/adr/`. The shared platform spec lives in `docs/superpowers/specs/2026-07-19-moof-platform-spec.md`. Shared AI maintenance docs live in `docs/ai-knowledge-base/`; variant-specific maintenance notes live in `<variant>/docs/ai-knowledge-base/`.
