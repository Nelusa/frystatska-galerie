import { getProductBySlug, getProductsByType } from "@/lib/sanity"
import { productTypeConfigs } from "@/config/productConfigs"
import { notFound } from "next/navigation"
import {ProductDetailPage} from "@/components/products/ProductDetailPage";

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { slug } = await params
  const artwork = await getProductBySlug(slug)

  if (!artwork || artwork._type !== 'artwork') {
    notFound()
  }

  const relatedArtworks = await getProductsByType('artwork')
  const otherArtworks = relatedArtworks
      .filter(item => item._id !== artwork._id)
      .slice(0, 4)

  const breadcrumbItems = [
    { label: "Domů", href: "/" },
    { label: "Obrazy", href: "/obrazy" },
    { label: artwork.title }
  ]

  return (
      <ProductDetailPage
          product={artwork}
          relatedProducts={otherArtworks}
          breadcrumbItems={breadcrumbItems}
          productTypeConfig={productTypeConfigs.artwork}
      />
  )
}
