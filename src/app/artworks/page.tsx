import { ProductPage } from "@/components/products/ProductPage";
import { getArtworksByCategory } from "@/lib/sanity"

export default async function ArtworkPage() {
  const paintings = await getArtworksByCategory()

  return (
      <ProductPage
        items={paintings}
        title="Obrazy"
        description="Originální umělecká díla od místních umělců. Každý obraz je jedinečný a přinese do vašeho domova kus umělecké krásy."
        basePath="/artworks"
        ctaTitle="Zajímá vás některý z obrazů?"
        ctaDescription="Kontaktujte nás pro více informací, možnost osobní prohlídky nebo rezervace obrazu."
      />
  )
}
