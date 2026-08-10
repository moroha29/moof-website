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

function renderRow({ slug, metadata, live }) {
  const lead = metadata.lead;
  const status = live
    ? '<span class="status status-live">Live</span>'
    : '<span class="status status-failed">Build failed</span>';
  const demoLink = live
    ? `<a class="button" href="./${encodeURIComponent(slug)}/">View demo</a>`
    : '<span class="missing">&mdash;</span>';
  return `<tr>
    <td class="col-row">${escapeHtml(String(lead.rowNumber))}</td>
    <td class="col-company">
      <p class="company-name">${escapeHtml(lead.companyName)}</p>
      <p class="category">${escapeHtml(lead.category)}</p>
      <details class="brief">
        <summary>Design brief</summary>
        <p>${displayValue(metadata.designBrief)}</p>
        <p class="created">Created ${displayValue(metadata.createdDate)}</p>
      </details>
    </td>
    <td class="col-status">${status}</td>
    <td class="col-maps">${linkedValue(lead.googleMapsUrl)}</td>
    <td class="col-contact">${linkedValue(lead.emailOrWhatsapp, "contact")}</td>
    <td class="col-contact">${linkedValue(lead.otherContact, "contact")}</td>
    <td class="col-remarks">${displayValue(lead.remarks)}</td>
    <td class="col-sample">${linkedValue(lead.sampleWebsite)}</td>
    <td class="col-demo">${demoLink}</td>
  </tr>`;
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
    main{width:min(1400px,calc(100% - 2rem));margin:0 auto;padding:3rem 0 5rem}.intro{max-width:760px;margin-bottom:1.5rem}
    h1{margin:0 0 .5rem;font-size:clamp(2rem,5vw,4rem);line-height:1}.generated{color:var(--muted);margin:.25rem 0}
    .table-wrap{overflow-x:auto;border:1px solid var(--rule);border-radius:16px;background:var(--card);box-shadow:0 8px 28px rgba(23,33,27,.05)}
    table{width:100%;border-collapse:collapse;min-width:920px}
    thead th{position:sticky;top:0;background:var(--card);text-align:left;font-size:.76rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding:.85rem 1rem;border-bottom:1px solid var(--rule);white-space:nowrap}
    tbody td{padding:.85rem 1rem;border-bottom:1px solid #ecece8;vertical-align:top}
    tbody tr:last-child td{border-bottom:0}tbody tr:hover{background:#faf9f4}
    .col-row{color:var(--muted);font-variant-numeric:tabular-nums}
    .company-name{margin:0;font-weight:700;font-size:1.02rem}.category{margin:.15rem 0 0;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.06em}
    .brief{margin-top:.4rem}.brief summary{cursor:pointer;color:#075c9e;font-size:.82rem}.brief p{margin:.4rem 0 0;max-width:36ch;overflow-wrap:anywhere;color:var(--ink)}.brief .created{color:var(--muted);font-size:.8rem}
    .status{font-weight:700;white-space:nowrap}.status-live{color:var(--green)}.status-failed{color:var(--red)}
    .missing{color:#8b938e;font-style:italic}
    td.col-maps,td.col-contact,td.col-remarks,td.col-sample{max-width:220px;overflow-wrap:anywhere}
    a{color:#075c9e;text-underline-offset:.18em}
    .button{display:inline-block;white-space:nowrap;border-radius:999px;background:var(--ink);color:#fff;padding:.45rem .9rem;text-decoration:none;font-weight:700;font-size:.85rem}
    @media(max-width:560px){main{width:min(100% - 1rem,1400px);padding-top:1.5rem}}
  </style>
</head>
<body><main>
  <section class="intro"><h1>Preprod business leads</h1><p>Original outreach inputs and demo status in one place.</p><p class="generated">Generated ${escapeHtml(generatedAt)}</p></section>
  <div class="table-wrap">
    <table aria-label="Business leads">
      <thead>
        <tr>
          <th scope="col">Row</th>
          <th scope="col">Company</th>
          <th scope="col">Status</th>
          <th scope="col">Google Maps</th>
          <th scope="col">Email / WhatsApp</th>
          <th scope="col">Other contact</th>
          <th scope="col">Original remarks</th>
          <th scope="col">Original sample website</th>
          <th scope="col">Demo</th>
        </tr>
      </thead>
      <tbody>${demos.map(renderRow).join("\n")}</tbody>
    </table>
  </div>
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
