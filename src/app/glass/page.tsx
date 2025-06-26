import { getGlass } from "@/lib/sanity"
import {ProductPage} from "@/components/products/ProductPage";

export default async function GlassPage() {
  const glassItems = await getGlass()

  return (
      <ProductPage
          items={glassItems}
          title="Sklo"
          description="Ručně vyráběné skleněné výrobky od českých i zahraničních umělců. Každý kus je originál a přinese do vašeho domova jedinečný design."
          basePath="/sklo"
      />
  )
}
