"use client"

import { useFavorites } from "@/lib/useFavorites"
import { ProductCard } from "@/components/products/ProductCard"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import {Fragment} from "react";

export default function FavoritesPage() {
  const { favorites, clearFavorites, isLoaded } = useFavorites()

  if (!isLoaded) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Načítání...</p>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Domů", href: "/" },
    { label: "Oblíbené" }
  ]

  return (
    <div className="container px-4 md:px-6 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="font-heading text-3xl font-bold">Oblíbené produkty</h1>
            <p className="text-muted-foreground">
              {favorites.length === 0
                ? "Zatím nemáte žádné oblíbené produkty"
                : `${favorites.length} ${favorites.length === 1 ? 'produkt' : favorites.length < 5 ? 'produkty' : 'produktů'}`
              }
            </p>
          </div>
        </div>
        {favorites.length > 0 && (
          <Button
            variant="outline"
            onClick={clearFavorites}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Vymazat vše
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Žádné oblíbené produkty</h2>
          <p className="text-muted-foreground mb-6">
            Zatím jste si neuložili žádné produkty do oblíbených.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/artworks">
              <Button>Procházet obrazy</Button>
            </Link>
            <Link href="/ceramics">
              <Button variant="outline">Procházet keramiku</Button>
            </Link>
          </div>
        </div>
      ) : (
          //TOOD (NL): Upravit typ
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard
              key={product._id}
              item={product}
              basePath={`/${product._type === 'artwork' ? 'artworks' : product._type === 'ceramics' ? 'ceramics' : product._type === 'glass' ? 'glass' : 'gifts'}`}
              variant="grid"
            />
          ))}
        </div>
      )}
    </div>
  )
}
