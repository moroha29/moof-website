import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: process.env.GITHUB_PAGES_SITE ?? "https://moroha29.github.io",
  base: "/moof-website/d".replace(
    "/moof-website",
    process.env.GITHUB_PAGES_BASE ?? "/moof-website"
  )
});
