import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { generatePreprodIndex } from "../scripts/generate-preprod-index.mjs";

const requiredLeadFields = [
  "rowNumber",
  "category",
  "companyName",
  "googleMapsUrl",
  "emailOrWhatsapp",
  "otherContact",
  "remarks",
  "sampleWebsite",
];

test("every committed preprod demo preserves the complete original lead input", async () => {
  const preprodDir = new URL("../preprod/", import.meta.url);
  const originalInputs = JSON.parse(
    await readFile(new URL("./fixtures/original-outreach-leads.json", import.meta.url), "utf8"),
  );
  const entries = await import("node:fs/promises").then(({ readdir }) =>
    readdir(preprodDir, { withFileTypes: true }),
  );

  for (const entry of entries.filter((candidate) => candidate.isDirectory())) {
    const metadata = JSON.parse(
      await readFile(new URL(`${entry.name}/demo.json`, preprodDir), "utf8"),
    );
    assert.ok(metadata.lead, `${entry.name} is missing lead`);
    assert.deepEqual(
      Object.keys(metadata.lead),
      requiredLeadFields,
      `${entry.name} must preserve every original input field in source order`,
    );
    assert.deepEqual(
      metadata.lead,
      originalInputs.leadsBySlug[entry.name],
      `${entry.name} must match the captured original outreach row exactly`,
    );
  }
  assert.equal(
    entries.filter((candidate) => candidate.isDirectory()).length,
    Object.keys(originalInputs.leadsBySlug).length,
    "the outreach snapshot and committed preprod demos must cover the same leads",
  );
});

test("the generated index exposes complete, escaped, business-friendly lead details", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "preprod-index-"));
  const preprodDir = path.join(root, "preprod");
  const siteDir = path.join(root, "site", "preprod");
  const outputFile = path.join(siteDir, "index.html");

  try {
    await mkdir(path.join(preprodDir, "alpha"), { recursive: true });
    await mkdir(path.join(preprodDir, "beta"), { recursive: true });
    await mkdir(path.join(siteDir, "alpha"), { recursive: true });
    await writeFile(path.join(siteDir, "alpha", "index.html"), "built");
    await writeFile(
      path.join(preprodDir, "alpha", "demo.json"),
      JSON.stringify({
        businessName: "Alpha & Sons",
        designBrief: "Warm <script>alert(1)</script>",
        createdDate: "2026-08-08",
        lead: {
          rowNumber: 5,
          category: "Contact New Website",
          companyName: "Alpha & Sons",
          googleMapsUrl: "https://maps.example/alpha",
          emailOrWhatsapp: "hello@example.com",
          otherContact: "+65 6123 4567",
          remarks: "Call after lunch",
          sampleWebsite: "",
        },
      }),
    );
    await writeFile(
      path.join(preprodDir, "beta", "demo.json"),
      JSON.stringify({
        businessName: "Beta",
        designBrief: "Simple",
        createdDate: "2026-08-07",
        lead: {
          rowNumber: 6,
          category: "Contact New Website",
          companyName: "Beta",
          googleMapsUrl: "",
          emailOrWhatsapp: "https://instagram.com/beta",
          otherContact: "",
          remarks: "",
          sampleWebsite: "https://example.com/beta",
        },
      }),
    );

    await generatePreprodIndex({
      preprodDir,
      siteDir,
      outputFile,
      generatedAt: "2026-08-08T12:00:00Z",
    });

    const html = await readFile(outputFile, "utf8");
    assert.match(html, /Alpha &amp; Sons/);
    assert.doesNotMatch(html, /<script>alert/);
    assert.match(html, /Warm &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.match(html, /mailto:hello@example\.com/);
    assert.match(html, /tel:\+6561234567/);
    assert.match(html, /https:\/\/maps\.example\/alpha/);
    assert.match(html, /Call after lunch/);
    assert.match(html, /Not provided/);
    assert.match(html, /class="status status-live">Live/);
    assert.match(html, /class="status status-failed">Build failed/);
    assert.match(html, /href="\.\/alpha\/"/);
    assert.match(html, /https:\/\/example\.com\/beta/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
