import { getGifts } from "@/lib/sanity"
import {ProductPage} from "@/components/products/ProductPage";

export default async function GiftsPage() {
  const giftItems = await getGifts()

  return (
      <ProductPage
          items={giftItems}
          title="Dárkové předměty"
          description="Originální dárkové předměty pro každou příležitost. Každý kus je jedinečný a přinese radost vašim blízkým."
          basePath="/darkove-predmety"
          ctaTitle="Zajímá vás některý z dárků?"
          ctaDescription="Kontaktujte nás pro více informací, možnost osobní prohlídky nebo rezervace dárku."
      />
  )
}
