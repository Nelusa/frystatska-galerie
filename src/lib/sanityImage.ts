import type { SanityImage } from "./sanity"

export function hasSanityImage(image: unknown): image is SanityImage {
  if (!image || typeof image !== "object" || !("asset" in image)) return false
  const asset = image.asset
  return Boolean(asset && typeof asset === "object" && "_ref" in asset &&
    typeof asset._ref === "string" && /^image-[a-zA-Z0-9]+-[1-9]\d*x[1-9]\d*-[a-zA-Z0-9]+$/.test(asset._ref))
}
