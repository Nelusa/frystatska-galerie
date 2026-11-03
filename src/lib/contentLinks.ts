const legacyRoutes: Record<string, string> = {
  "/obrazy": "/artworks",
  "/keramika": "/ceramics",
  "/sklo": "/glass",
  "/darkove-predmety": "/gifts",
  "/kontakt": "/contact",
  "/o-nas": "/about",
}

/** Keep older CMS links working and reject executable or protocol-relative URLs. */
export function contentLink(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback
  const link = value.trim()
  if (!link || /[\\\u0000-\u0020]/.test(link)) return fallback
  if (link.startsWith("/") && !link.startsWith("//")) {
    const route = link.split(/[?#]/)[0]
    return (legacyRoutes[route] || route) + link.slice(route.length)
  }
  if (/^(https?:|mailto:|tel:)/i.test(link) || link.startsWith("#")) return link
  return fallback
}
