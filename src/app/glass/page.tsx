import { ProductPage } from "@/components/products/ProductPage";
import { getGlass } from "@/lib/sanity"

export default async function GlassPage() {
  const glassItems = await getGlass()

  return (
      <ProductPage
        items={glassItems}
        title="Sklo"
        description="Ručně vyráběné skleněné výrobky od českých i zahraničních umělců. Každý kus je originál a přinese do vašeho domova jedinečný design."
        basePath="/glass"
      />
  )
}
