import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {ProductGrid} from "@/components/products/ProductGrid";
import type { AllProducts } from '@/lib/sanity'

interface ProductPageProps {
  items: AllProducts[]
  title: string
  description: string
  basePath: string
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
}

export function ProductPage({
                              items,
                              title,
                              description,
                              basePath,
                              ctaTitle,
                              ctaDescription,
                              ctaButtonText = "Kontaktujte nás"
                            }: ProductPageProps) {
  return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na hlavní stránku
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Text as="h1" variant="h1" className="mb-4 tracking-tighter">
            {title}
          </Text>
          <Text variant="body1" color="neutral" className="max-w-[600px] mx-auto">
            {description}
          </Text>
        </div>

        <ProductGrid
            items={items}
            basePath={basePath}
            title={title}
        />

        <div className="text-center mt-16 py-12 bg-secondary/10 rounded-lg">
          <Text variant="h3" className="mb-4">
            {ctaTitle || (title === "Sklo" 
              ? "Zajímá vás některý ze skleněných výrobků?" 
              : title === "Keramika"
              ? "Zajímá vás některý z keramických výrobků?"
              : `Zajímá vás některý z ${title.toLowerCase()}?`)}
          </Text>
          <Text variant="body1" color="neutral" className="mb-6 max-w-[500px] mx-auto">
            {ctaDescription || `Kontaktujte nás pro více informací, možnost osobní prohlídky nebo rezervace ${title.toLowerCase().slice(0, -1)}u.`}
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                {ctaButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}
