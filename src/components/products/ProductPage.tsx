import { Button } from "@/components/ui/button"
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
          <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            {description}
          </p>
        </div>

        <ProductGrid
            items={items}
            basePath={basePath}
            title={title}
        />

        <div className="text-center mt-16 py-12 bg-secondary/10 rounded-lg">
          <h3 className="font-heading text-2xl font-bold mb-4">
            {ctaTitle || `Zajímá vás některý z ${title.toLowerCase()}?`}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-[500px] mx-auto">
            {ctaDescription || `Kontaktujte nás pro více informací, možnost osobní prohlídky nebo rezervace ${title.toLowerCase().slice(0, -1)}u.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button size="lg">
                {ctaButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}
