import {ProductCard} from "@/components/products/ProductCard";

interface ProductGridProps {
  items: any[]
  basePath: string
  title: string
  emptyMessage?: string
  showFeatured?: boolean
}

export function ProductGrid({ items, basePath, title, emptyMessage, showFeatured = true }: ProductGridProps) {
  const featuredItems = items.filter(item => item.featured)
  const hasFeatures = showFeatured && featuredItems.length > 0

  return (
      <>
        {hasFeatures && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold mb-6">Doporučené výrobky</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredItems.map((item) => (
                    <ProductCard
                        key={item._id}
                        item={item}
                        basePath={basePath}
                        variant="featured"
                    />
                ))}
              </div>
            </div>
        )}

        <div>
          <h2 className="font-heading text-2xl font-bold mb-6">
            {hasFeatures ? `Všechny ${title.toLowerCase()}` : title}
          </h2>

          {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{emptyMessage || `Zatím zde nejsou žádné ${title.toLowerCase()}.`}</p>
              </div>
          ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <ProductCard
                        key={item._id}
                        item={item}
                        basePath={basePath}
                        variant="grid"
                    />
                ))}
              </div>
          )}
        </div>
      </>
  )
}
