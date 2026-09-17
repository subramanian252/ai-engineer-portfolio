import assert from "node:assert/strict";

const origin = new URL(process.argv[2] || "http://127.0.0.1:3000").origin;
async function get(path, options) {
  return fetch(new URL(path, origin), {
    ...options,
    signal: AbortSignal.timeout(30_000),
  });
}
const home = await get("/");
assert.equal(home.status, 200, "Home page loads");
const html = await home.text();
for (const id of [
  "main",
  "projects",
  "about",
  "stack",
  "mission-control",
  "contact",
]) {
  assert.ok(html.includes('id="' + id + '"'), "Section exists: " + id);
}
assert.equal(
  [...html.matchAll(/data-station="([^"]+)"/g)].length,
  8,
  "Eight pipeline steps",
);
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes('id="' + id + '"'), "Anchor resolves: " + id);
}
assert.ok(html.includes("/favicon.svg"), "Favicon configured");
assert.ok(
  html.includes('property="og:image"'),
  "Social sharing image configured",
);
assert.ok(
  html.includes('name="twitter:card" content="summary_large_image"'),
  "Large social preview",
);
assert.ok(
  html.includes("/_next/image?"),
  "Responsive image optimization enabled",
);
assert.ok(!html.includes('id="chat-question"'), "Chat loads only when opened");
console.log(
  "PASS homepage, navigation, eight stations, metadata, on-demand chat",
);

const lazyChat = await get("/projects/lazychat");
assert.equal(lazyChat.status, 200, "LazyChat case study loads");
const lazyChatHtml = await lazyChat.text();
assert.ok(lazyChatHtml.includes("Meet LazyChat"), "LazyChat hero renders");
assert.ok(
  lazyChatHtml.includes("BACKEND / BUILT BY ME"),
  "Backend authorship is explicit",
);
assert.ok(
  lazyChatHtml.includes("FRONTEND / BUILT WITH AI"),
  "Frontend authorship is explicit",
);
assert.ok(
  lazyChatHtml.includes("full-rag-chatbot"),
  "LazyChat source link is present",
);
console.log("PASS LazyChat case study, authorship and source link");

const pdf = await get("/subramanian-resume.pdf");
assert.equal(pdf.status, 200);
assert.ok(pdf.headers.get("content-type")?.includes("application/pdf"));
assert.equal(
  Buffer.from(await pdf.arrayBuffer())
    .subarray(0, 5)
    .toString(),
  "%PDF-",
);
console.log("PASS résumé download");

const ogPath = html.match(/property="og:image" content="([^"]+)"/)?.[1];
assert.ok(ogPath);
const ogUrl = new URL(ogPath.replaceAll("&amp;", "&"), origin);
const social = await get(ogUrl.pathname + ogUrl.search);
assert.equal(social.status, 200);
const png = Buffer.from(await social.arrayBuffer());
assert.equal(png.subarray(1, 4).toString(), "PNG");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log("PASS social preview (1200 × 630)");

assert.equal((await get("/robots.txt")).status, 200);
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.match(await sitemap.text(), /<urlset/);
const missing = await get("/this-page-does-not-exist");
assert.equal(missing.status, 404);
assert.ok((await missing.text()).includes("Even Pip gets"));
console.log("PASS robots, sitemap, themed 404");

for (const filename of ["hero.png", "mid.png", "end.png"]) {
  const optimized = await get(
    "/_next/image?url=" +
      encodeURIComponent("/art/" + filename) +
      "&w=1080&q=75",
    { headers: { Accept: "image/webp" } },
  );
  assert.equal(optimized.status, 200, filename);
  assert.ok(
    optimized.headers.get("content-type")?.includes("image/webp"),
    "Optimized WebP: " + filename,
  );
  const bytes = (await optimized.arrayBuffer()).byteLength;
  assert.ok(
    bytes < 1_000_000,
    "Night image should be under 1 MB at 1080px: " + filename,
  );
  console.log(
    "PASS optimized " + filename + " (" + Math.round(bytes / 1024) + " KB)",
  );
}

const status = await get("/api/chat");
assert.equal(status.status, 200);
assert.match(status.headers.get("cache-control"), /no-store/);
const mode = (await status.json()).mode;
const post = (body, headers = {}) =>
  get("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin, ...headers },
    body: JSON.stringify(body),
  });
assert.equal((await post({ messages: [] })).status, 400);
assert.equal(
  (await post({ messages: [{ role: "system", content: "hello" }] })).status,
  400,
);
assert.equal(
  (await post({ messages: [{ role: "user", content: "x".repeat(2001) }] }))
    .status,
  400,
);
assert.equal(
  (
    await post(
      { messages: [{ role: "user", content: "hello" }] },
      { Origin: "https://unrelated.example" },
    )
  ).status,
  403,
);
if (mode === "profile") {
  for (const question of [
    "What does he build?",
    "What is his tech stack?",
    "Tell me about his background",
    "Is he open to opportunities?",
  ]) {
    const answer = await post({
      messages: [{ role: "user", content: question }],
    });
    assert.equal(answer.status, 200);
    const data = await answer.json();
    assert.equal(data.mode, "profile");
    assert.ok(data.answer?.length > 40);
    assert.ok(
      !data.answer.includes("enough information"),
      "Suggested question has an answer: " + question,
    );
  }
  const unknown = await post({
    messages: [{ role: "user", content: "What is his salary?" }],
  });
  assert.match((await unknown.json()).answer, /isn’t included/);
  console.log(
    "PASS profile answers, suggested questions, unknown facts, request validation",
  );
} else {
  console.log(
    "PASS chat validation; live AI calls skipped to avoid spending provider credits",
  );
}
console.log("Production smoke checks passed for " + origin);
