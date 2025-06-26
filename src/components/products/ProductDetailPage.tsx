import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Share2 } from "lucide-react"
import { urlFor, formatPrice } from "@/lib/sanity"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import {ComponentType, Fragment} from "react"
import { FavoriteButton } from "@/components/ui/favorite-button"

//TODO (NL): Upravit typy
interface ProductDetailPageProps {
  product: any
  relatedProducts: any[]
  breadcrumbItems: Array<{ label: string; href?: string }>
  productTypeConfig: {
    name: string
    icon: ComponentType<any>
    colorScheme: string
    features?: Array<{
      icon: ComponentType<any>
      title: string
      description: string
    }>
    detailFields?: Array<{
      icon: ComponentType<any>
      label: string
      field: string
    }>
  }
}

export function ProductDetailPage({
                                    product,
                                    relatedProducts,
                                    breadcrumbItems,
                                    productTypeConfig
                                  }: ProductDetailPageProps) {
  const { name, icon: Icon, colorScheme, features = [], detailFields = [] } = productTypeConfig

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

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              {product.image ? (
                  <Image
                      src={urlFor(product.image).width(600).height(600).url()}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                  />
              ) : (
                  <div className={`w-full h-full bg-gradient-to-br from-${colorScheme}-50 to-${colorScheme}-100 flex items-center justify-center`}>
                    <div className="text-center text-muted-foreground">
                      <Icon className="h-24 w-24 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{product.title}</p>
                    </div>
                  </div>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                    <Badge variant="secondary">Doporučeno</Badge>
                )}
                {!product.inStock && (
                    <Badge variant="destructive">Prodáno</Badge>
                )}
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <FavoriteButton
                  product={product}
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 backdrop-blur-sm bg-white/80"
                />
                <Button size="icon" variant="secondary" className="h-10 w-10 backdrop-blur-sm bg-white/80">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {product.gallery && product.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.slice(0, 4).map((image: any, index: number) => (
                      <div key={index} className="aspect-square relative overflow-hidden rounded border cursor-pointer hover:opacity-75 transition-opacity">
                        <Image
                            src={urlFor(image).width(150).height(150).url()}
                            alt={`${product.title} - detail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                      </div>
                  ))}
                </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.subcategory || name}
                </Badge>
                <Icon className={`h-4 w-4 text-${colorScheme}-600`} />
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight mb-2">
                {product.title}
              </h1>
              {product.artist && (
                  <p className="text-lg text-muted-foreground">
                    {product.artist}
                  </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className={`text-3xl font-bold text-${colorScheme}-600`}>
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </div>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-green-600 font-medium">
                    Ušetříte {formatPrice(product.originalPrice - product.price)}
                  </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Popis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {detailFields.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Specifikace</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detailFields.map((field, index) => {
                      const FieldIcon = field.icon
                      const value = product[field.field]
                      if (!value) return null

                      return (
                          <div key={index} className={`flex items-center gap-3 p-3 bg-${colorScheme}-50 rounded-lg border border-${colorScheme}-100`}>
                            <FieldIcon className={`h-5 w-5 text-${colorScheme}-600`} />
                            <div>
                              <p className="text-sm font-medium">{field.label}</p>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                          </div>
                      )
                    })}
                  </div>
                </div>
            )}

            <div className="space-y-4 pt-4">
              <div className="flex gap-3">
                <FavoriteButton
                  product={product}
                  variant="outline"
                  size="lg"
                  showText={true}
                />
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-2xl font-bold">Podobné {name.toLowerCase()}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                    <Link key={relatedProduct._id} href={`/${name.toLowerCase()}/${relatedProduct.slug.current}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-square relative overflow-hidden">
                          {relatedProduct.image ? (
                              <Image
                                  src={urlFor(relatedProduct.image).width(300).height(300).url()}
                                  alt={relatedProduct.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                          ) : (
                              <div className={`w-full h-full bg-gradient-to-br from-${colorScheme}-50 to-${colorScheme}-100 flex items-center justify-center`}>
                                <Icon className="h-8 w-8 text-muted-foreground opacity-50" />
                              </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base line-clamp-1">{relatedProduct.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {relatedProduct.artist}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className={`font-bold text-${colorScheme}-600`}>
                            {formatPrice(relatedProduct.price)}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                ))}
              </div>
            </div>
        )}

        {features.length > 0 && (
            <div className="mt-16 border-t pt-8">
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-center`}>
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon
                  return (
                      <div key={index} className="space-y-2">
                        <div className={`w-12 h-12 bg-${colorScheme}-100 rounded-full flex items-center justify-center mx-auto`}>
                          <FeatureIcon className={`h-6 w-6 text-${colorScheme}-600`} />
                        </div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                  )
                })}
              </div>
            </div>
        )}
      </div>
  )
}
