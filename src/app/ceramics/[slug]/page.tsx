import { notFound } from "next/navigation"

import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { productTypeConfigs } from "@/config/productConfigs"
import { getProductBySlug, getProductsByType } from "@/lib/sanity"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CeramicDetailPage({ params }: Props) {
  const { slug } = await params
  const ceramic = await getProductBySlug(slug)

  if (!ceramic || ceramic._type !== "ceramics") {
    notFound()
  }

  const relatedCeramics = await getProductsByType("ceramics")
  const otherCeramics = relatedCeramics
      .filter(item => item._id !== ceramic._id)
      .slice(0, 4)

  const breadcrumbItems = [
    { label: "Domů", href: "/" },
    { label: "Keramika", href: "/ceramics" },
    { label: ceramic.title }
  ]

  return (
      <ProductDetailPage
        product={ceramic}
        relatedProducts={otherCeramics}
        breadcrumbItems={breadcrumbItems}
        productTypeConfig={productTypeConfigs.ceramics}
      />
  )
}
