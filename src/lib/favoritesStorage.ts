import type { SanityImage } from "./sanity"

export interface FavoriteProduct {
  _id: string
  title: string
  slug: { current: string }
  image?: SanityImage
  price: number
  artist?: string
  _type: string
}

export const FAVORITES_KEY = "frystatska-galerie-favorites"

export function parseFavorites(raw: string | null): FavoriteProduct[] {
  try {
    const data: unknown = JSON.parse(raw || "[]")
    if (!Array.isArray(data)) return []
    const seen = new Set<string>()
    return data.filter((item): item is FavoriteProduct => {
      if (!item || typeof item !== "object") return false
      const valid = typeof item._id === "string" && item._id.length > 0 &&
        typeof item.title === "string" && typeof item.slug?.current === "string" &&
        item.slug.current.length > 0 && typeof item.price === "number" && Number.isFinite(item.price) &&
        ["artwork", "ceramics", "glass", "gifts"].includes(item._type) &&
        (item.artist === undefined || typeof item.artist === "string") &&
        (item.image === undefined || (item.image?._type === "image" &&
          typeof item.image?.asset?._ref === "string" && /^image-[\w-]+$/.test(item.image.asset._ref)))
      if (!valid || seen.has(item._id)) return false
      seen.add(item._id)
      return true
    })
  } catch {
    return []
  }
}
