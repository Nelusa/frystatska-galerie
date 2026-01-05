import { notFound } from "next/navigation"

import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { productTypeConfigs } from "@/config/productConfigs"
import { getProductBySlug, getProductsByType } from "@/lib/sanity"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GlassDetailPage({ params }: Props) {
  const { slug } = await params
  const glassItem = await getProductBySlug(slug)

  if (!glassItem || glassItem._type !== "glass") {
    notFound()
  }

  const relatedGlass = await getProductsByType("glass")
  const otherGlass = relatedGlass
      .filter(item => item._id !== glassItem._id)
      .slice(0, 4)

  const breadcrumbItems = [
    { label: "Domů", href: "/" },
    { label: "Sklo", href: "/glass" },
    { label: glassItem.title }
  ]

  return (
      <ProductDetailPage
        product={glassItem}
        relatedProducts={otherGlass}
        breadcrumbItems={breadcrumbItems}
        productTypeConfig={productTypeConfigs.glass}
      />
  )
}
