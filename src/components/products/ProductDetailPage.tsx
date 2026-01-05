import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import { Badge } from "@/app/hooks/badge"
import Image from "next/image"
import Link from "next/link"
import { urlFor, formatPrice, SanityImage, AllProducts } from "@/lib/sanity"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import {ComponentType, Fragment, SVGProps} from "react"
import { FavoriteButton } from "@/components/ui/favorite-button"
import { cn } from "@/lib/utils"

interface ProductDetailPageProps {
  product: AllProducts
  relatedProducts: AllProducts[]
  breadcrumbItems: Array<{ label: string; href?: string }>
  productTypeConfig: {
    name: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    colorScheme: string
    features?: Array<{
      icon: ComponentType<SVGProps<SVGSVGElement>>
      title: string
      description: string
    }>
    detailFields?: Array<{
      icon: ComponentType<SVGProps<SVGSVGElement>>
      label: string
      field: string
    }>
  }
}

const colorSchemeClasses = {
  purple: {
    bg50: "bg-purple-50",
    bg100: "bg-purple-100",
    text600: "text-purple-600",
    border100: "border-purple-100",
    gradientFrom: "from-purple-50",
    gradientTo: "to-purple-100",
  },
  info: {
    bg50: "bg-info-50",
    bg100: "bg-info-100",
    text600: "text-info-600",
    border100: "border-info-100",
    gradientFrom: "from-info-50",
    gradientTo: "to-info-100",
  },
  success: {
    bg50: "bg-success-50",
    bg100: "bg-success-100",
    text600: "text-success-600",
    border100: "border-success-100",
    gradientFrom: "from-success-50",
    gradientTo: "to-success-100",
  },
  warning: {
    bg50: "bg-warning-50",
    bg100: "bg-warning-100",
    text600: "text-warning-600",
    border100: "border-warning-100",
    gradientFrom: "from-warning-50",
    gradientTo: "to-warning-100",
  },
} as const

export function ProductDetailPage({
                                    product,
                                    relatedProducts,
                                    breadcrumbItems,
                                    productTypeConfig
                                  }: ProductDetailPageProps) {
  const { name, icon: Icon, colorScheme, features = [], detailFields = [] } = productTypeConfig
  const colors = colorSchemeClasses[colorScheme as keyof typeof colorSchemeClasses] || colorSchemeClasses.purple

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
            <div className="relative w-full min-h-[400px] max-h-[800px] flex items-center justify-center overflow-hidden rounded-lg border bg-muted/30">
              {product.image ? (
                  <Image
                      src={urlFor(product.image).width(1200).url()}
                      alt={product.title}
                      width={1200}
                      height={1200}
                      className="object-contain w-full h-auto max-h-[800px]"
                      priority
                  />
              ) : (
                  <div className={cn("w-full h-full min-h-[400px] bg-gradient-to-br flex items-center justify-center", colors.gradientFrom, colors.gradientTo)}>
                    <div className="text-center text-muted-foreground">
                      <Icon className="h-24 w-24 mx-auto mb-4 opacity-50" />
                      <Text variant="h5">{product.title}</Text>
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
            </div>

            {product.gallery && product.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.slice(0, 4).map((image: SanityImage, index: number) => (
                      <div key={index} className="relative w-full min-h-[100px] flex items-center justify-center overflow-hidden rounded border cursor-pointer hover:opacity-75 transition-opacity bg-muted/30">
                        <Image
                            src={urlFor(image).width(300).url()}
                            alt={`${product.title} - detail ${index + 1}`}
                            width={300}
                            height={300}
                            className="object-contain w-full h-auto"
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
                <Icon className={cn("h-4 w-4", colors.text600)} />
              </div>
              <Text variant="h2" className="tracking-tight mb-2">
                {product.title}
              </Text>
              {product.artist && (
                  <Text variant="h5" color="neutral">
                    {product.artist}
                  </Text>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Text variant="h2" className="font-bold">
                  {formatPrice(product.price)}
                </Text>
                {product.originalPrice && product.originalPrice > product.price && (
                    <Text variant="h5" color="neutral" className="line-through">
                      {formatPrice(product.originalPrice)}
                    </Text>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                  <Text variant="body2" color="success" className="font-medium">
                    Ušetříte {formatPrice(product.originalPrice - product.price)}
                  </Text>
              )}
            </div>

            <div>
              <Text variant="h5" className="mb-2">Popis</Text>
              <Text variant="body1" color="neutral" className="leading-relaxed">
                {product.description}
              </Text>
            </div>

            {detailFields.length > 0 && (
                <div className="space-y-4">
                  <Text variant="h5">Specifikace</Text>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detailFields.map((field, index) => {
                      const FieldIcon = field.icon
                      const value = ((product as unknown) as Record<string, unknown>)[field.field]
                      if (!value) return null

                      return (
                          <div key={index} className={cn("flex items-center gap-3 p-3 rounded-lg border", colors.bg50, colors.border100)}>
                            <FieldIcon className={cn("h-5 w-5", colors.text600)} />
                            <div>
                              <Text variant="label">{field.label}</Text>
                              <Text variant="body2" color="neutral">{String(value)}</Text>
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
                <Text variant="h3">Podobné {name.toLowerCase()}</Text>
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
                              <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center", colors.gradientFrom, colors.gradientTo)}>
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
                          <div className="font-bold">
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
                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mx-auto", colors.bg100)}>
                          <FeatureIcon className={cn("h-6 w-6", colors.text600)} />
                        </div>
                        <Text variant="h5">{feature.title}</Text>
                        <Text variant="body2" color="neutral">
                          {feature.description}
                        </Text>
                      </div>
                  )
                })}
              </div>
            </div>
        )}
      </div>
  )
}
