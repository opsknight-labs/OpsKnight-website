import test from "node:test";
import assert from "node:assert/strict";
import { extractHeadings, renderMarkdown } from "../src/lib/docs/markdown.ts";

test("headings containing underscores preserve underscores matching rendered HTML", async () => {
  const markdown = [
    "# Title",
    "## RATE_LIMIT_MAX",
    "## password_transport_max_code_units",
    "## Move from encryption_key to an encryption_keys keyring",
  ].join("\n");

  const headings = extractHeadings(markdown);
  const html = await renderMarkdown(markdown);

  assert.equal(headings.length, 3);
  assert.equal(headings[0].id, "rate_limit_max");
  assert.equal(headings[1].id, "password_transport_max_code_units");
  assert.equal(headings[2].id, "move-from-encryption_key-to-an-encryption_keys-keyring");

  for (const h of headings) {
    assert.ok(
      html.includes(`id="${h.id}"`),
      `Expected rendered HTML to include id="${h.id}" for heading "${h.text}"`,
    );
  }
});

test("headings with inline formatting generate TOC anchors matching rendered HTML", async () => {
  const markdown = [
    "# Formatting Test",
    "## `RATE_LIMIT_WINDOW_MS` setting",
    "## **Important** *Security* Guidelines",
    "## Refer to [External Spec](https://example.com) Now",
  ].join("\n");

  const headings = extractHeadings(markdown);
  const html = await renderMarkdown(markdown);

  assert.equal(headings.length, 3);
  assert.equal(headings[0].id, "rate_limit_window_ms-setting");
  assert.equal(headings[1].id, "important-security-guidelines");
  assert.equal(headings[2].id, "refer-to-external-spec-now");

  for (const h of headings) {
    assert.ok(
      html.includes(`id="${h.id}"`),
      `Expected rendered HTML to include id="${h.id}" for heading "${h.text}"`,
    );
  }
});

test("duplicate heading names produce sequential suffix counters matching rendered HTML", async () => {
  const markdown = [
    "# Repeated Headings",
    "## Advanced Configuration",
    "## Advanced Configuration",
    "## Advanced Configuration",
  ].join("\n");

  const headings = extractHeadings(markdown);
  const html = await renderMarkdown(markdown);

  assert.equal(headings.length, 3);
  assert.equal(headings[0].id, "advanced-configuration");
  assert.equal(headings[1].id, "advanced-configuration-1");
  assert.equal(headings[2].id, "advanced-configuration-2");

  for (const h of headings) {
    assert.ok(
      html.includes(`id="${h.id}"`),
      `Expected rendered HTML to include id="${h.id}" for heading "${h.text}"`,
    );
  }
});

test("preceding H1 headings register slug sequence so subsequent matching H2 gets counter", async () => {
  const markdown = [
    "# Authentication",
    "## Authentication",
    "### Authentication",
  ].join("\n");

  const headings = extractHeadings(markdown);
  const html = await renderMarkdown(markdown);

  assert.equal(headings.length, 2);
  assert.equal(headings[0].id, "authentication-1");
  assert.equal(headings[1].id, "authentication-2");

  for (const h of headings) {
    assert.ok(
      html.includes(`id="${h.id}"`),
      `Expected rendered HTML to include id="${h.id}" for heading "${h.text}"`,
    );
  }
});

test("headings inside code blocks are ignored and do not affect slug counts", async () => {
  const markdown = [
    "# Code Block Test",
    "```bash",
    "## Not A Heading",
    "```",
    "## Real Heading",
  ].join("\n");

  const headings = extractHeadings(markdown);
  const html = await renderMarkdown(markdown);

  assert.equal(headings.length, 1);
  assert.equal(headings[0].text, "Real Heading");
  assert.equal(headings[0].id, "real-heading");
  assert.ok(html.includes(`id="real-heading"`));
});

test("nested relative image paths resolve to base assets path", async () => {
  const markdown = "![Screenshot](../../assets/authentication-provider-workspace-desktop.png)";
  const html = await renderMarkdown(markdown, { imageBasePath: "/docs/v2.1.0" });
  assert.ok(
    html.includes('src="/docs/v2.1.0/assets/authentication-provider-workspace-desktop.png"'),
    `Expected html to rewrite ../../assets to /docs/v2.1.0/assets, got: ${html}`,
  );
});
