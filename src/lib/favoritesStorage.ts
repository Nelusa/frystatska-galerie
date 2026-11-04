import { hasSanityImage } from "./sanityImage"

import type { SanityImage } from "./sanity"

export interface FavoriteProduct {
  _id: string
  title: string
  slug: { current: string }
  image?: SanityImage | null
  price: number
  artist?: string | null
  inStock?: boolean
  description?: string
  originalPrice?: number
  dimensions?: string
  featured?: boolean
  material?: string
  subcategory?: string
  technique?: string
  year?: number
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
        (item.artist == null || typeof item.artist === "string") &&
        (item.image == null || hasSanityImage(item.image)) &&
        [item.description, item.dimensions, item.material, item.subcategory, item.technique].every(
          value => value == null || typeof value === "string",
        ) &&
        [item.originalPrice, item.year].every(value => value == null || Number.isFinite(value)) &&
        [item.inStock, item.featured].every(value => value == null || typeof value === "boolean")
      if (!valid || seen.has(item._id)) return false
      seen.add(item._id)
      return true
    })
  } catch {
    return []
  }
}
