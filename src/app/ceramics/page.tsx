import { getCeramics } from "@/lib/sanity"
import {ProductPage} from "@/components/products/ProductPage";

export default async function CeramicsPage() {
  const ceramicsItems = await getCeramics()

  return (
      <ProductPage
          items={ceramicsItems}
          title="Keramika"
          description="Ručně vyráběná keramika od místních umělců. Každý kus je originál a přinese do vašeho domova jedinečný design."
          basePath="/ceramics"
      />
  )
}
