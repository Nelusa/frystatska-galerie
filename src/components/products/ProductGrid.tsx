import { ProductCard } from "@/components/products/ProductCard";
import { Text } from "@/components/ui/text";
import type { AllProducts } from "@/lib/sanity"

interface ProductGridProps {
  items: AllProducts[]
  basePath: string
  title: string
  emptyMessage?: string
  showFeatured?: boolean
}

export function ProductGrid({ items, basePath, title, emptyMessage, showFeatured = true }: ProductGridProps) {
  const featuredItems = items.filter(item => item.featured)
  const hasFeatures = showFeatured && featuredItems.length > 0

  const getProductPath = (product: AllProducts) => {
    if (basePath === "/all") {
      return `/${product._type === "artwork" ? "artworks" : product._type === "ceramics" ? "ceramics" : product._type === "glass" ? "glass" : "gifts"}`
    }
    return basePath
  }

  return (
      <>
        {hasFeatures && (
            <div className="mb-16">
              <Text
                variant="h3"
                className="mb-6">Doporučené výrobky</Text>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredItems.map((item) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      basePath={getProductPath(item)}
                      variant="featured"
                    />
                ))}
              </div>
            </div>
        )}

        <div>
          <Text
            variant="h3"
            className="mb-6">
            {hasFeatures ? `Všechny ${title.toLowerCase()}` : title}
          </Text>

          {items.length === 0 ? (
              <div className="text-center py-12">
                <Text
                  variant="body1"
                  color="neutral">
                  {emptyMessage || (title === "Sklo" 
                    ? "Zatím zde nejsou žádné skleněné výrobky." 
                    : title === "Keramika"
                    ? "Zatím zde nejsou žádné keramické výrobky."
                    : `Zatím zde nejsou žádné ${title.toLowerCase()}.`)}
                </Text>
              </div>
          ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      basePath={getProductPath(item)}
                      variant="grid"
                    />
                ))}
              </div>
          )}
        </div>
      </>
  )
}
