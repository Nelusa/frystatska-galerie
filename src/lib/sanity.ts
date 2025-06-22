import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ========== SANITY KLIENT ==========

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

// ========== SDÍLENÉ GROQ BLOKY ==========

const categorySelect = `
  "category": select(
    _type == "artwork" => "obrazy",
    _type == "ceramics" => "keramika",
    _type == "glass" => "sklo",
    _type == "gifts" => "darkove-predmety"
  )
`

const productFields = `
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
  ${categorySelect}
`

const seasonalBannerFields = `
  _id,
  title,
  type,
  content {
    message,
    subMessage,
    icon,
    actionButton { text, link }
  },
  styling {
    backgroundColor,
    priority
  },
  schedule {
    activeFrom,
    activeTo,
    timezone
  },
  targeting {
    showOnPages,
    maxDisplayCount
  },
  published
`

// ========== TYPY ==========

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanityBlock {
  _type: 'block'
  children: Array<{ _type: 'span'; text: string; marks?: string[] }>
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
}
export interface Gifts extends BaseArtwork {
  _type: 'gifts'
  giftWrapping: boolean
  occasions?: string[]
}

export type AllProducts = Artwork | Ceramics | Glass | Gifts

export interface HomepageContent {
  _id: string
  hero: {
    title: string
    subtitle: string
    backgroundImage?: SanityImage
    primaryButton: { text: string; link: string }
    secondaryButton: { text: string; link: string }
  }
  aboutSection: {
    title: string
    content: SanityBlock[]
    image?: SanityImage
    button: { text: string; link: string }
  }
  ctaSection: {
    title: string
    description: string
    buttons: Array<{ text: string; link: string; style: 'primary' | 'secondary' }>
  }
  featuredCategories?: Array<{
    title: string
    description: string
    link: string
    image?: SanityImage
    icon: 'palette' | 'cookie' | 'wine' | 'gift'
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
  published: boolean
}

export interface SeasonalBanner {
  _id: string
  title: string
  type:
      | 'christmas' | 'newyear' | 'valentine'
      | 'spring' | 'summer' | 'autumn' | 'winter'
      | 'sale' | 'general'
  content: {
    message: string
    subMessage?: string
    icon?: SanityImage
    actionButton?: { text: string; link: string }
  }
  styling: {
    backgroundColor: 'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'dark' | 'light'
    priority: number
  }
  schedule: {
    activeFrom: string
    activeTo: string
    timezone: string
  }
  targeting: {
    showOnPages: string[]
    maxDisplayCount: number
  }
  published: boolean
}

// ========== GROQ DOTAZY ==========

export const queries = {
  allProducts: `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && published == true]
    | order(_createdAt desc) {
      ${productFields}
    }
  `,
  productsByType: (type: string) => `
    *[_type == "${type}" && published == true]
    | order(_createdAt desc) {
      ${productFields}
    }
  `,
  featuredProducts: `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && featured == true && published == true]
    | order(_createdAt desc) {
      ${productFields}
    }
  `,
  productBySlug: (slug: string) => `
    *[_type in ["artwork", "ceramics", "glass", "gifts"] && slug.current == "${slug}" && published == true][0] {
      ${productFields}
    }
  `,
  homepageContent: `
    *[_type == "homepageContent" && published == true][0] {
      _id,
      hero {
        title,
        subtitle,
        backgroundImage,
        primaryButton { text, link },
        secondaryButton { text, link }
      },
      aboutSection {
        title,
        content,
        image,
        button { text, link }
      },
      ctaSection {
        title,
        description,
        buttons[] { text, link, style }
      },
      featuredCategories[] {
        title,
        description,
        link,
        image,
        icon
      },
      seo {
        metaTitle,
        metaDescription,
        ogImage
      },
      published
    }
  `,
  activeSeasonalBanners: `
    *[_type == "seasonalBanner" && published == true && now() >= schedule.activeFrom && now() <= schedule.activeTo]
    | order(styling.priority desc) {
      ${seasonalBannerFields}
    }
  `,
  activeSeasonalBannerForPage: (page: string) => `
    *[
      _type == "seasonalBanner" &&
      published == true &&
      now() >= schedule.activeFrom &&
      now() <= schedule.activeTo &&
      ("all" in targeting.showOnPages || "${page}" in targeting.showOnPages)
    ]
    | order(styling.priority desc)[0] {
      ${seasonalBannerFields}
    }
  `,
  searchProducts: (searchTerm: string) => `
    *[
      _type in ["artwork", "ceramics", "glass", "gifts"] &&
      published == true &&
      (
        title match "${searchTerm}*" ||
        description match "${searchTerm}*" ||
        artist match "${searchTerm}*" ||
        material match "${searchTerm}*"
      )
    ] | order(_createdAt desc) {
      ${productFields}
    }
  `
}

// ========== FETCH FUNKCE ==========

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
  return client.fetch(queries.activeSeasonalBanners)
}
export async function getActiveSeasonalBannerForPage(page: string): Promise<SeasonalBanner | null> {
  return client.fetch(queries.activeSeasonalBannerForPage(page))
}
export async function searchProducts(searchTerm: string): Promise<AllProducts[]> {
  return client.fetch(queries.searchProducts(searchTerm))
}

// ========== HELPER FUNKCE ==========

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...'
}

export function getCategoryName(type: string): string {
  const categoryNames = {
    'artwork': 'obrazy',
    'ceramics': 'keramika',
    'glass': 'sklo',
    'gifts': 'darkove-predmety'
  }
  return categoryNames[type as keyof typeof categoryNames] || type
}

export function getCategoryUrl(type: string): string {
  return `/${getCategoryName(type)}`
}
