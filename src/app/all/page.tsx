import { getAllProducts } from "@/lib/sanity"
import { ProductPage } from "@/components/products/ProductPage"

export default async function AllProductsPage() {
  const allProducts = await getAllProducts()

  return (
    <ProductPage
      items={allProducts}
      title="Všechna díla"
      description="Kompletní kolekce všech uměleckých děl a řemeslných výrobků v naší galerii. Objevte jedinečné kousky od místních umělců."
      basePath="/all"
      ctaTitle="Zajímá vás některé z děl?"
      ctaDescription="Kontaktujte nás pro více informací, možnost osobní prohlídky nebo rezervace vybraného díla."
    />
  )
} 