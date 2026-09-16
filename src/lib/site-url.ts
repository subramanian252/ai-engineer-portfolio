/** The public deployment origin. Never invent a canonical domain. */
export function getSiteUrl(): string | undefined {
  const configured =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
      : undefined);
  if (!configured) return undefined;
  const url = new URL(configured);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) origin, without a path, credentials, query or fragment.",
    );
  }
  return url.origin;
}
