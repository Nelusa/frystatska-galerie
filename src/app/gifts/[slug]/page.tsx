import React from 'react'
import { getProductBySlug, getProductsByType } from "@/lib/sanity"
import { productTypeConfigs } from "@/config/productConfigs"
import { notFound } from "next/navigation"
import {ProductDetailPage} from "@/components/products/ProductDetailPage";

interface Props {
  params: Promise<{ slug: string }>
}

export default async function GiftDetailPage({ params }: Props) {
  const { slug } = await params
  const giftItem = await getProductBySlug(slug)

  if (!giftItem || giftItem._type !== 'gifts') {
    notFound()
  }

  const relatedGifts = await getProductsByType('gifts')
  const otherGifts = relatedGifts
      .filter(item => item._id !== giftItem._id)
      .slice(0, 4)

  const breadcrumbItems = [
    { label: "Domů", href: "/" },
    { label: "Dárkové předměty", href: "/darkove-predmety" },
    { label: giftItem.title }
  ]

  return (
      <ProductDetailPage
          product={giftItem}
          relatedProducts={otherGifts}
          breadcrumbItems={breadcrumbItems}
          productTypeConfig={productTypeConfigs.gifts}
      />
  )
}
