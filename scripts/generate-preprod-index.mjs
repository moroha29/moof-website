import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const leadFields = [
  "rowNumber",
  "category",
  "companyName",
  "googleMapsUrl",
  "emailOrWhatsapp",
  "otherContact",
  "remarks",
  "sampleWebsite",
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function assertCompleteLead(slug, lead) {
  if (!lead || typeof lead !== "object" || Array.isArray(lead)) {
    throw new Error(`${slug}/demo.json must contain a lead object`);
  }
  const keys = Object.keys(lead);
  if (keys.length !== leadFields.length || leadFields.some((field, index) => keys[index] !== field)) {
    throw new Error(`${slug}/demo.json lead fields must be: ${leadFields.join(", ")}`);
  }
  if (!Number.isInteger(lead.rowNumber) || lead.rowNumber < 1) {
    throw new Error(`${slug}/demo.json lead.rowNumber must be a positive integer`);
  }
  for (const field of leadFields.slice(1)) {
    if (typeof lead[field] !== "string") {
      throw new Error(`${slug}/demo.json lead.${field} must be a string`);
    }
  }
}

function displayValue(value) {
  return value ? escapeHtml(value) : '<span class="missing">Not provided</span>';
}

function linkedValue(value, kind = "auto") {
  if (!value) return '<span class="missing">Not provided</span>';
  const text = escapeHtml(value);
  let href = "";
  if (/^https?:\/\//i.test(value)) href = value;
  else if (kind === "contact" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) href = `mailto:${value}`;
  else if (kind === "contact" && /^[+\d][\d\s()-]{5,}$/.test(value)) href = `tel:${value.replace(/[^+\d]/g, "")}`;
  return href
    ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${text}</a>`
    : text;
}

function detail(label, value) {
  return `<div class="detail"><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`;
}

function renderCard({ slug, metadata, live }) {
  const lead = metadata.lead;
  const status = live
    ? '<span class="status status-live">Live</span>'
    : '<span class="status status-failed">Build failed</span>';
  const demoLink = live ? `<a class="button" href="./${encodeURIComponent(slug)}/">View demo</a>` : "";
  return `<article class="lead-card">
    <header>
      <div><p class="row">Lead ${lead.rowNumber} · ${escapeHtml(lead.category)}</p><h2>${escapeHtml(lead.companyName)}</h2></div>
      ${status}
    </header>
    <dl>
      ${detail("Google Maps", linkedValue(lead.googleMapsUrl))}
      ${detail("Email / WhatsApp", linkedValue(lead.emailOrWhatsapp, "contact"))}
      ${detail("Other contact", linkedValue(lead.otherContact, "contact"))}
      ${detail("Original remarks", displayValue(lead.remarks))}
      ${detail("Original sample website", linkedValue(lead.sampleWebsite))}
      ${detail("Design brief", displayValue(metadata.designBrief))}
      ${detail("Created", displayValue(metadata.createdDate))}
    </dl>
    <footer>${demoLink}</footer>
  </article>`;
}

export async function generatePreprodIndex({ preprodDir, siteDir, outputFile, generatedAt = new Date().toISOString() }) {
  const entries = await readdir(preprodDir, { withFileTypes: true });
  const demos = [];
  for (const entry of entries.filter((candidate) => candidate.isDirectory())) {
    const slug = entry.name;
    const metadata = JSON.parse(await readFile(path.join(preprodDir, slug, "demo.json"), "utf8"));
    assertCompleteLead(slug, metadata.lead);
    const live = await readFile(path.join(siteDir, slug, "index.html"), "utf8").then(() => true, () => false);
    demos.push({ slug, metadata, live });
  }
  demos.sort((a, b) => a.metadata.lead.rowNumber - b.metadata.lead.rowNumber);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Preprod business leads</title>
  <style>
    :root{color-scheme:light;--ink:#17211b;--muted:#667169;--paper:#f4f1e9;--card:#fff;--rule:#d7d9d2;--green:#176b3a;--red:#a1322c}
    *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 system-ui,sans-serif}
    main{width:min(1180px,calc(100% - 2rem));margin:0 auto;padding:3rem 0 5rem}.intro{max-width:760px;margin-bottom:2rem}
    h1{margin:0 0 .5rem;font-size:clamp(2rem,5vw,4rem);line-height:1}.generated,.row{color:var(--muted)}.generated{margin:.25rem 0}.grid{display:grid;gap:1rem}
    .lead-card{background:var(--card);border:1px solid var(--rule);border-radius:16px;padding:1.25rem;box-shadow:0 8px 28px rgba(23,33,27,.05)}
    .lead-card header{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;padding-bottom:1rem;border-bottom:1px solid var(--rule)}
    h2{margin:.2rem 0 0;font-size:1.35rem}.row{margin:0;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em}.status{font-weight:700;white-space:nowrap}.status-live{color:var(--green)}.status-failed{color:var(--red)}
    dl{margin:0}.detail{display:grid;grid-template-columns:minmax(150px,1fr) 2fr;gap:1rem;padding:.7rem 0;border-bottom:1px solid #ecece8}.detail:last-child{border:0}dt{color:var(--muted);font-size:.82rem}dd{margin:0;overflow-wrap:anywhere}.missing{color:#8b938e;font-style:italic}
    a{color:#075c9e;text-underline-offset:.18em}.lead-card footer{padding-top:1rem}.button{display:inline-block;border-radius:999px;background:var(--ink);color:#fff;padding:.6rem 1rem;text-decoration:none;font-weight:700}
    @media(min-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){main{width:min(100% - 1rem,1180px);padding-top:1.5rem}.detail{grid-template-columns:1fr;gap:.2rem}.lead-card header{display:grid}}
  </style>
</head>
<body><main>
  <section class="intro"><h1>Preprod business leads</h1><p>Original outreach inputs and demo status in one place.</p><p class="generated">Generated ${escapeHtml(generatedAt)}</p></section>
  <section class="grid" aria-label="Business leads">${demos.map(renderCard).join("\n")}</section>
</main></body></html>`;

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isCli) {
  const root = process.cwd();
  await generatePreprodIndex({
    preprodDir: path.join(root, "preprod"),
    siteDir: path.join(root, "site", "preprod"),
    outputFile: path.join(root, "site", "preprod", "index.html"),
  });
}
