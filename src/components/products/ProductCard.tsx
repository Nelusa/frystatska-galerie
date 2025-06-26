import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Share2 } from "lucide-react"
import { urlFor, formatPrice } from "@/lib/sanity"
import { FavoriteButton } from "@/components/ui/favorite-button"
import {cn} from "@/lib/utils";

interface ProductCardProps {
  item: any
  basePath: string
  variant?: 'featured' | 'grid'
}

export function ProductCard({ item, basePath, variant = 'grid' }: ProductCardProps) {
  const aspectRatio = variant === 'featured' ? 'aspect-[4/3]' : 'aspect-[3/4]'
  const iconSize = 'h-6 w-6'

  return (
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className={`${aspectRatio} relative overflow-hidden`}>
          {item.image ? (
              <Image
                  src={urlFor(item.image).width(variant === 'featured' ? 600 : 400).height(variant === 'featured' ? 450 : 533).url()}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
          ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-sm mb-2">{variant === 'featured' ? `Obrázek: ${item.title}` : item.title}</div>
                  <div className="text-xs text-muted-foreground/60">{item.dimensions}</div>
                </div>
              </div>
          )}

          <div className={`absolute ${variant === 'featured' ? 'top-4 left-4' : 'top-3 left-3'} flex flex-col gap-1`}>
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

          <div className={`absolute ${variant === 'featured' ? 'top-4 right-4' : 'top-3 right-3'} opacity-0 group-hover:opacity-100 transition-opacity`}>
            <div className={`flex ${variant === 'featured' ? 'gap-2' : 'gap-1'}`}>
              <FavoriteButton
                product={item}
                variant="secondary"
                size="icon"
                className={cn(iconSize, "p-1")}
              />
              <Button size="icon" variant="secondary" className={cn(iconSize, "p-1")}>
                <Share2 className={iconSize} />
              </Button>
            </div>
          </div>
        </div>

        <CardHeader className={variant === 'featured' ? '' : 'pb-2'}>
          <div className={variant === 'featured' ? 'flex justify-between items-start' : ''}>
            <div>
              <CardTitle className={`font-heading ${variant === 'featured' ? 'text-xl' : 'text-lg'} line-clamp-1`}>
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {item.artist} {item.year && `• ${item.year}`}
              </CardDescription>
            </div>
            {variant === 'featured' && (
                <div className="text-right">
                  <div className="font-bold text-primary text-lg">{formatPrice(item.price)}</div>
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
                    <div className="font-bold text-primary">{formatPrice(item.price)}</div>
                    {item.originalPrice && item.originalPrice > item.price && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </div>
                    )}
                  </div>
                  {item.subcategory && (
                      <Badge variant="outline" className="text-xs capitalize">{item.subcategory}</Badge>
                  )}
                </div>
              </>
          )}

          <p className={`text-muted-foreground mb-${variant === 'featured' ? '4' : '3'} ${variant === 'featured' ? 'text-sm' : 'text-xs'} line-clamp-2`}>
            {item.description}
          </p>

          {variant === 'featured' && (
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                {item.technique && <span>• {item.technique}</span>}
                {item.dimensions && <span>• {item.dimensions}</span>}
                {item.material && <span>• {item.material}</span>}
              </div>
          )}

          {variant === 'grid' && (
              <div className="text-xs text-muted-foreground mb-3">
                {[item.technique, item.dimensions, item.material].filter(Boolean).join(' • ')}
              </div>
          )}

          <div className={`flex ${variant === 'featured' ? 'gap-2' : ''}`}>
            <Link href={`${basePath}/${item.slug.current}`} className={variant === 'featured' ? 'flex-1' : 'w-full'}>
              <Button
                  className={variant === 'featured' ? 'w-full' : 'w-full'}
                  size="sm"
                  disabled={!item.inStock}
              >
                {item.inStock ? 'Zobrazit detail' : 'Prodáno'}
              </Button>
            </Link>
            {variant === 'featured' && (
                <Link href="/kontakt">
                  <Button variant="outline" size="sm">
                    Kontakt
                  </Button>
                </Link>
            )}
          </div>
        </CardContent>
      </Card>
  )
}
