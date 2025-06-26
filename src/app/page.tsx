import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Palette, Cookie, Wine, Gift } from "lucide-react"
import {
  getFeaturedArtworks,
  getHomepageContent,
  urlFor,
  formatPrice,
  getCategoryName,
} from "@/lib/sanity"
import type { AllProducts } from "@/lib/sanity"

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
        <section className="relative bg-gradient-to-b from-background to-secondary/20 py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  {homepageContent?.hero?.title || "Fryštátská Galerie"}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                  {homepageContent?.hero?.subtitle || "Objevte krásu umění v srdci Karviné. Naše galerie nabízí jedinečný výběr obrazů, keramiky, skla a dárkových předmětů."}
                </p>
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
                  <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    Doporučená díla
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                    Nejnovější a nejkrásnější kousky z naší kolekce
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {featuredArtworks.slice(0, 8).map((artwork: AllProducts) => (
                      <Link key={artwork._id} href={`/${getCategoryName(artwork._type)}/${artwork.slug.current}`}
                            className="group">
                        <Card
                            className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
                          <div className="aspect-square relative overflow-hidden">
                            {artwork.image ? (
                                <Image
                                    src={urlFor(artwork.image).width(400).height(400).url()}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                  <div className="text-center text-muted-foreground">
                                    <Palette className="h-12 w-12 mx-auto mb-2 opacity-50"/>
                                    <p className="text-sm">{artwork.title}</p>
                                  </div>
                                </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <Badge variant="secondary" className="text-xs">
                                {artwork.category === 'artworks' && 'Obraz'}
                                {artwork.category === 'ceramics' && 'Keramika'}
                                {artwork.category === 'glass' && 'Sklo'}
                                {artwork.category === 'gifts' && 'Dárek'}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-heading line-clamp-1">{artwork.title}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              {artwork.artist}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex justify-between items-center">
                              <div className="font-bold text-primary">{formatPrice(artwork.price)}</div>
                              {artwork.subcategory && (
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {artwork.subcategory}
                                  </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link href="/artworks">
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
              <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Naše kolekce
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                Každá kategorie představuje pečlivě vybrané umělecké díla a řemeslné výrobky
              </p>
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
                <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {homepageContent?.aboutSection?.title || "Umění s tradicí"}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    Fryštátská Galerie je místem, kde se setkává tradiční řemeslo s moderním uměním.
                    Již více než 15 let přinášíme našim zákazníkům jedinečné umělecké zážitky.
                  </p>
                  <p className="leading-relaxed">
                    Spolupracujeme s místními umělci, abychom vám mohli nabídnout
                    tu nejširší paletu uměleckých děl a řemeslných výrobků nejvyšší kvality.
                  </p>
                </div>
                <Link href={homepageContent?.aboutSection?.button?.link || "/about"}>
                  <Button variant="outline" size="lg">
                    {homepageContent?.aboutSection?.button?.text || "Více o nás"}
                  </Button>
                </Link>
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
                        <p className="text-sm">Zde bude obrázek galerie</p>
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
              <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">
                {homepageContent?.ctaSection?.title || "Navštivte nás"}
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                {homepageContent?.ctaSection?.description || "Naše galerie je otevřena každý den. Přijďte si prohlédnout naše kolekce osobně a nechte se inspirovat krásou umění."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
