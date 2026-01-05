"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Badge } from "@/app/hooks/badge"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { urlFor, formatPrice } from "@/lib/sanity"
import { FavoriteButton } from "@/components/ui/favorite-button"
import {cn} from "@/lib/utils";
import type { AllProducts } from '@/lib/sanity'

interface ProductCardProps {
  item: AllProducts
  basePath: string
  variant?: 'featured' | 'grid'
}

export function ProductCard({ item, basePath, variant = 'grid' }: ProductCardProps) {
  const router = useRouter()
  const aspectRatio = variant === 'featured' ? 'aspect-[4/3]' : 'aspect-[3/4]'
  const iconSize = 'h-6 w-6'
  const detailUrl = `${basePath}/${item.slug.current}`

  return (
      <Link href={detailUrl} className="block">
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer relative">
          <div className={cn(aspectRatio, "relative overflow-hidden bg-muted/30 flex items-center justify-center")}>
          {item.image ? (
              <Image
                  src={urlFor(item.image).width(variant === 'featured' ? 800 : 600).url()}
                  alt={item.title}
                  width={variant === 'featured' ? 800 : 600}
                  height={variant === 'featured' ? 600 : 800}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
          ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Text variant="body2" color="neutral" className="mb-2">{variant === 'featured' ? `Obrázek: ${item.title}` : item.title}</Text>
                  <Text variant="caption" color="neutral">{item.dimensions}</Text>
                </div>
              </div>
          )}

          <div className={cn("absolute flex flex-col gap-1", variant === 'featured' ? 'top-4 left-4' : 'top-3 left-3')}>
            {item.featured && (
                <Badge variant="secondary" className={variant === 'featured' ? '' : 'text-xs'}>
                  Doporučeno
                </Badge>
            )}
            {!item.inStock && (
                <Badge variant="destructive" className={variant === 'featured' ? '' : 'text-xs'}>
                  Prodáno
                </Badge>
            )}
          </div>

          <div className={cn("absolute opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto", variant === 'featured' ? 'top-4 right-4' : 'top-3 right-3')}>
            <FavoriteButton
              product={item}
              variant="secondary"
              size="icon"
              className={cn(iconSize, "p-1")}
            />
          </div>
        </div>

        <CardHeader className={variant === 'featured' ? '' : 'pb-2'}>
          <div className={variant === 'featured' ? 'flex justify-between items-start' : ''}>
            <div>
              <CardTitle className={cn("font-heading line-clamp-1", variant === 'featured' ? 'text-xl' : 'text-lg')}>
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {item.artist} {item.year && `• ${item.year}`}
              </CardDescription>
            </div>
            {variant === 'featured' && (
                <div className="text-right">
                  <Text variant="h5" color="primary">{formatPrice(item.price)}</Text>
                  {item.subcategory && (
                      <Badge variant="outline" className="text-xs capitalize">{item.subcategory}</Badge>
                  )}
                </div>
            )}
          </div>
        </CardHeader>

        <CardContent className={variant === 'featured' ? '' : 'pt-0'}>
          {variant === 'grid' && (
              <>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <Text variant="h5" color="primary" className="font-bold">{formatPrice(item.price)}</Text>
                    {item.originalPrice && item.originalPrice > item.price && (
                        <Text variant="caption" color="neutral" className="line-through">
                          {formatPrice(item.originalPrice)}
                        </Text>
                    )}
                  </div>
                  {item.subcategory && (
                      <Badge variant="outline" className="text-xs capitalize">{item.subcategory}</Badge>
                  )}
                </div>
              </>
          )}

          <Text variant={variant === 'featured' ? 'body2' : 'caption'} color="neutral" className={cn("line-clamp-2", variant === 'featured' ? 'mb-4' : 'mb-3')}>
            {item.description}
          </Text>

          {variant === 'featured' && (
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                {item.technique && <span>• {item.technique}</span>}
                {item.dimensions && <span>• {item.dimensions}</span>}
                {item.material && <span>• {item.material}</span>}
              </div>
          )}

          {variant === 'grid' && (
              <Text variant="caption" color="neutral" className="mb-3">
                {[item.technique, item.dimensions, item.material].filter(Boolean).join(' • ')}
              </Text>
          )}

          <div className={cn("flex relative z-10", variant === 'featured' && 'gap-2')}>
            <div className={cn(variant === 'featured' ? 'flex-1' : 'w-full')} onClick={(e) => e.stopPropagation()}>
              <Button
                  className={cn(variant === 'featured' ? 'w-full' : 'w-full', 'mt-4')}
                  size="sm"
                  disabled={!item.inStock}
              >
                {item.inStock ? 'Zobrazit detail' : 'Prodáno'}
              </Button>
            </div>
            {variant === 'featured' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    router.push('/contact')
                  }}
                >
                  Kontakt
                </Button>
            )}
          </div>
        </CardContent>
        </Card>
      </Link>
  )
}
