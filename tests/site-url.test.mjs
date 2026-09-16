import test from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl } from "../src/lib/site-url.ts";

function configured(site, vercel, assertion) {
  const previous = {
    SITE_URL: process.env.SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  };
  try {
    if (site === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = site;
    if (vercel === undefined) delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    else process.env.VERCEL_PROJECT_PRODUCTION_URL = vercel;
    assertion();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}
test("canonical origin is omitted until a real deployment URL exists", () => {
  configured(undefined, undefined, () => assert.equal(getSiteUrl(), undefined));
});
test("explicit public domain takes precedence over the platform domain", () => {
  configured("https://portfolio.example/", "example.vercel.app", () =>
    assert.equal(getSiteUrl(), "https://portfolio.example"),
  );
  configured("", "example.vercel.app", () =>
    assert.equal(getSiteUrl(), "https://example.vercel.app"),
  );
});
test("bad deployment configuration fails instead of publishing misleading URLs", () => {
  for (const url of [
    "not-a-url",
    "ftp://portfolio.example",
    "https://portfolio.example/page",
    "https://user:password@portfolio.example",
    "https://portfolio.example/?preview=1",
  ]) {
    configured(url, undefined, () => assert.throws(getSiteUrl));
  }
});
