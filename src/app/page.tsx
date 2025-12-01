import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/text"
import Link from "next/link"
import Image from "next/image"
import { Palette, Cookie, Wine, Gift } from "lucide-react"
import {
  getFeaturedArtworks,
  getHomepageContent,
  urlFor,
} from "@/lib/sanity"
import type { AllProducts } from "@/lib/sanity"
import { ProductCard } from "@/components/products/ProductCard"

const categories = [
  {
    title: "Obrazy",
    description: "Originální obrazy od českých umělců",
    icon: <Palette className="h-12 w-12 text-primary" />,
    href: "/artworks",
    image: "/images/paintings-preview.jpg"
  },
  {
    title: "Keramika",
    description: "Ručně vyráběná keramika s jedinečným designem",
    icon: <Cookie className="h-12 w-12 text-primary" />,
    href: "/ceramics",
    image: "/images/ceramics-preview.jpg"
  },
  {
    title: "Sklo",
    description: "Tradiční české sklo a křišťál",
    icon: <Wine className="h-12 w-12 text-primary" />,
    href: "/glass",
    image: "/images/glass-preview.jpg"
  },
  {
    title: "Dárkové předměty",
    description: "Dárky pro každou příležitost",
    icon: <Gift className="h-12 w-12 text-primary" />,
    href: "/gifts",
    image: "/images/gifts-preview.jpg"
  }
]

export default async function Home() {
  const [featuredArtworks, homepageContent] = await Promise.all([
    getFeaturedArtworks(),
    getHomepageContent(),
  ])

  return (
      <div className="flex flex-col">
        <section className="relative bg-gradient-to-b from-background to-secondary/20 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Text as="h1" variant="hero" className="tracking-tighter">
                  {homepageContent?.hero?.title || "Fryštátská Galerie"}
                </Text>
                <Text variant="description" color="neutral" className="mx-auto max-w-[700px]">
                  {homepageContent?.hero?.subtitle || "Objevte krásu umění v srdci Karviné. Naše galerie nabízí jedinečný výběr obrazů, keramiky, skla a dárkových předmětů."}
                </Text>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={homepageContent?.hero?.primaryButton?.link || "/artworks"}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {homepageContent?.hero?.primaryButton?.text || "Prohlédnout kolekci"}
                  </Button>
                </Link>
                <Link href={homepageContent?.hero?.secondaryButton?.link || "/contact"}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {homepageContent?.hero?.secondaryButton?.text || "Kontaktujte nás"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {featuredArtworks.length > 0 && (
            <section className="py-16 md:py-24 bg-secondary/5">
              <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                  <Text variant="h2" className="mb-4 tracking-tighter">
                    Doporučená díla
                  </Text>
                  <Text variant="description" color="neutral" className="max-w-[600px] mx-auto">
                    Nejnovější a nejkrásnější kousky z naší kolekce
                  </Text>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {featuredArtworks.slice(0, 8).map((product: AllProducts) => (
                    <ProductCard
                      key={product._id}
                      item={product}
                      basePath={`/${product._type === 'artwork' ? 'artworks' : product._type === 'ceramics' ? 'ceramics' : product._type === 'glass' ? 'glass' : 'gifts'}`}
                      variant="grid"
                    />
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link href="/all">
                    <Button variant="outline" size="lg">
                      Zobrazit všechna díla
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
        )}

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Text variant="h2" className="mb-4 tracking-tighter">
                Naše kolekce
              </Text>
              <Text variant="description" color="neutral" className="max-w-[600px] mx-auto">
                Každá kategorie představuje pečlivě vybrané umělecké díla a řemeslné výrobky
              </Text>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                  <Link key={index} href={category.href} className="group">
                    <Card
                        className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                          {category.icon}
                        </div>
                        <CardTitle className="font-heading text-xl">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-center text-sm leading-relaxed">
                          {category.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <Text variant="h2" className="tracking-tighter">
                  {homepageContent?.aboutSection?.title || "Umění s tradicí"}
                </Text>
                <div className="flex flex-col gap-y-4 text-muted-foreground">
                  <Text variant="body1" color="neutral" className="leading-relaxed">
                    Fryštátská Galerie je místem, kde se setkává tradiční řemeslo s moderním uměním.
                    Již více než 15 let přinášíme našim zákazníkům jedinečné umělecké zážitky.
                  </Text>
                  <Text variant="body1" color="neutral" className="leading-relaxed">
                    Spolupracujeme s místními umělci, abychom vám mohli nabídnout
                    tu nejširší paletu uměleckých děl a řemeslných výrobků nejvyšší kvality.
                  </Text>
                  <Link href={homepageContent?.aboutSection?.button?.link || "/about"}>
                    <Button variant="outline" size="lg">
                      {homepageContent?.aboutSection?.button?.text || "Více o nás"}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:order-first">
                <div
                    className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {homepageContent?.aboutSection?.image ? (
                      <Image
                          src={urlFor(homepageContent.aboutSection.image).width(600).height(600).url()}
                          alt="O galerii"
                          width={600}
                          height={600}
                          className="rounded-lg object-cover"
                      />
                  ) : (
                      <div className="text-center text-muted-foreground">
                        <Palette className="h-24 w-24 mx-auto mb-4 opacity-50"/>
                        <Text variant="body2" color="neutral">Zde bude obrázek galerie</Text>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <Text as="h2" variant="h2" className="tracking-tighter">
                {homepageContent?.ctaSection?.title || "Navštivte nás"}
              </Text>
              <Text variant="body1" color="neutral" className="text-lg max-w-[600px] mx-auto">
                {homepageContent?.ctaSection?.description || "Naše galerie je otevřena každý den. Přijďte si prohlédnout naše kolekce osobně a nechte se inspirovat krásou umění."}
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {homepageContent?.ctaSection?.buttons ? (
                    homepageContent.ctaSection.buttons.map((button, index) => (
                        <Link key={index} href={button.link}>
                          <Button
                              size="lg"
                              variant={button.style === 'primary' ? 'default' : 'outline'}
                          >
                            {button.text}
                          </Button>
                        </Link>
                    ))
                ) : (
                    <>
                      <Link href="/contact">
                        <Button size="lg">
                          Kontakt a otevírací doba
                        </Button>
                      </Link>
                      <Link href="/artworks">
                        <Button variant="outline" size="lg">
                          Procházet galerii
                        </Button>
                      </Link>
                    </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
