import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'lbgdxh20',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-06-16',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityBlock {
  _type: 'block'
  children: Array<{
    _type: 'span'
    text: string
    marks?: string[]
  }>
  markDefs?: unknown[]
  style?: string
}

export interface BaseArtwork {
  _id: string
  _type: string
  title: string
  slug: { current: string }
  description: string
  image: SanityImage
  gallery?: SanityImage[]
  price: number
  originalPrice?: number
  artist?: string
  technique?: string
  dimensions?: string
  material?: string
  year?: number
  subcategory?: string
  featured?: boolean
  inStock?: boolean
  published: boolean
  giftWrapping?: boolean
  occasions?: string[]
  collection?: string
  category: string
}

export interface Artwork extends BaseArtwork {
  _type: 'artwork'
}

export interface Ceramics extends BaseArtwork {
  _type: 'ceramics'
}

export interface Glass extends BaseArtwork {
  _type: 'glass'
  collection?: string
}

export interface Gifts extends BaseArtwork {
  _type: 'gifts'
  giftWrapping: boolean
  occasions?: string[]
}

export type AllProducts = Artwork | Ceramics | Glass | Gifts

export interface HomepageContent {
  _id: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  aboutTitle?: string
  aboutText?: SanityBlock[]
  aboutImage?: SanityImage
}

export interface SeasonalBanner {
  _id: string
  message: string
  image?: SanityImage
  activeFrom: string
  activeTo: string
  published: boolean
}

export const queries = {
  allProducts: `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && published == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      description,
      image,
      gallery,
      price,
      originalPrice,
      artist,
      technique,
      dimensions,
      material,
      year,
      subcategory,
      featured,
      inStock,
      published,
      giftWrapping,
      occasions,
      collection,
      "category": select(
      _type == "artwork" => "artworks",
      _type == "ceramics" => "ceramics",
      _type == "glass" => "glass",
      _type == "gifts" => "gifts",
      true => "unknown"
    )
    }
  `,

  productsByType: (type: string) => `
    *[_type == "${type}" && published == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      description,
      image,
      gallery,
      price,
      originalPrice,
      artist,
      technique,
      dimensions,
      material,
      year,
      subcategory,
      featured,
      inStock,
      published,
      giftWrapping,
      occasions,
      collection,
      "category": select(
      _type == "artwork" => "artworks",
      _type == "ceramics" => "ceramics",
      _type == "glass" => "glass",
      _type == "gifts" => "gifts",
      true => "unknown"
    )
    }
  `,

  featuredProducts: `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && featured == true && published == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      description,
      image,
      gallery,
      price,
      originalPrice,
      artist,
      technique,
      dimensions,
      material,
      year,
      subcategory,
      featured,
      inStock,
      published,
      giftWrapping,
      occasions,
      collection,
     "category": select(
      _type == "artwork" => "artworks",
      _type == "ceramics" => "ceramics",
      _type == "glass" => "glass",
      _type == "gifts" => "gifts",
      true => "unknown"
    )
    }
  `,

  productBySlug: (slug: string) => `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && slug.current == "${slug}" && published == true][0] {
      _id,
      _type,
      title,
      slug,
      description,
      image,
      gallery,
      price,
      originalPrice,
      artist,
      technique,
      dimensions,
      material,
      year,
      subcategory,
      featured,
      inStock,
      published,
      giftWrapping,
      occasions,
      collection,
      "category": select(
      _type == "artwork" => "artworks",
      _type == "ceramics" => "ceramics",
      _type == "glass" => "glass",
      _type == "gifts" => "gifts",
      true => "unknown"
    )
    }
  `,

  homepageContent: `
    *[_type == "homepageContent"][0] {
      _id,
      heroTitle,
      heroSubtitle,
      heroImage,
      aboutTitle,
      aboutText,
      aboutImage
    }
  `,

  activeSeasonalBanner: `
    *[_type == "seasonalBanner" && published == true && now() >= activeFrom && now() <= activeTo][0] {
      _id,
      message,
      image,
      activeFrom,
      activeTo,
      published
    }
  `,

  searchProducts: (searchTerm: string) => `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && published == true && (
      title match "${searchTerm}*" ||
      description match "${searchTerm}*" ||
      artist match "${searchTerm}*" ||
      material match "${searchTerm}*"
    )] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      description,
      image,
      gallery,
      price,
      originalPrice,
      artist,
      technique,
      dimensions,
      material,
      year,
      subcategory,
      featured,
      inStock,
      published,
      giftWrapping,
      occasions,
      collection,
      "category": select(
      _type == "artwork" => "artworks",
      _type == "ceramics" => "ceramics",
      _type == "glass" => "glass",
      _type == "gifts" => "gifts",
      true => "unknown"
    )
    }
  `
}

export async function getAllProducts(): Promise<AllProducts[]> {
  return client.fetch(queries.allProducts)
}

export async function getProductsByType(type: string): Promise<AllProducts[]> {
  return client.fetch(queries.productsByType(type))
}

export async function getArtworksByCategory(): Promise<Artwork[]> {
  return client.fetch(queries.productsByType('artwork'))
}

export async function getCeramics(): Promise<Ceramics[]> {
  return client.fetch(queries.productsByType('ceramics'))
}

export async function getGlass(): Promise<Glass[]> {
  return client.fetch(queries.productsByType('glass'))
}

export async function getGifts(): Promise<Gifts[]> {
  return client.fetch(queries.productsByType('gifts'))
}

export async function getFeaturedProducts(): Promise<AllProducts[]> {
  return client.fetch(queries.featuredProducts)
}

export async function getFeaturedArtworks(): Promise<AllProducts[]> {
  return client.fetch(queries.featuredProducts)
}

export async function getProductBySlug(slug: string): Promise<AllProducts | null> {
  return client.fetch(queries.productBySlug(slug))
}

export async function getArtworkBySlug(slug: string): Promise<AllProducts | null> {
  return client.fetch(queries.productBySlug(slug))
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  return client.fetch(queries.homepageContent)
}

export async function getActiveSeasonalBanner(): Promise<SeasonalBanner | null> {
  return client.fetch(queries.activeSeasonalBanner)
}

export async function searchProducts(searchTerm: string): Promise<AllProducts[]> {
  return client.fetch(queries.searchProducts(searchTerm))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function getCategoryName(type: string): string {
  const categoryNames = {
    'artwork': 'artworks',
    'ceramics': 'ceramics',
    'glass': 'glass',
    'gifts': 'gifts'
  }
  return categoryNames[type as keyof typeof categoryNames] || type
}

export function getCategoryUrl(type: string): string {
  return `/${getCategoryName(type)}`
}
