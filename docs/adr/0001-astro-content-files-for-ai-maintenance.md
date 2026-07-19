# Astro Content Files For AI Maintenance

Moof's first website will use Astro with repo-local content files as the source of truth for AI-assisted maintenance. We chose this over a CMS, live Google Forms integration, or a more app-heavy framework because the owner supplies structured update requests and the business goal is low-cost content maintenance by an AI agent: update content files, validate the static build, show a preview, then publish. This keeps routine maintenance inside the repository and avoids server-side infrastructure until the store has a clear need for it.
