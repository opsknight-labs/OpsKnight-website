import test from "node:test";
import assert from "node:assert/strict";
import { resolveDocLink } from "../src/lib/docs/link-resolver.mjs";
test("README references map to directory pages", () =>
  assert.equal(
    resolveDocLink("../incidents/README.md", "v2.0.0", "guides/dashboard"),
    "/docs/v2.0.0/guides/incidents/",
  ));
test("historical root-relative shortcuts resolve within their own release", () =>
  assert.equal(
    resolveDocLink("security/oidc-setup.md", "v1", "administration"),
    "/docs/v1/security/oidc-setup/",
  ));
test("missing historical documents are not guessed", () =>
  assert.equal(resolveDocLink("core-concepts/war-rooms.md", "v1.3"), null));
test("links cannot leave version directory", () =>
  assert.equal(resolveDocLink("../../../../LICENSE", "v2.0.0"), null));
