import { defineConfig } from "astro/config";

const site = process.env.GITHUB_PAGES_SITE || "https://moroha29.github.io";
const root = (process.env.GITHUB_PAGES_BASE || "/moof-website").replace(/\/$/, "");

export default defineConfig({ site, base: `${root}/f`, output: "static" });
