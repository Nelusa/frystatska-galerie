"use client"

import { useState } from "react"

import { Menu, Palette, Wine, Gift, Phone, Info, Heart, Images } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Text } from "@/components/ui/text"
import { useFavorites } from "@/lib/useFavorites"


const mainNavItems = [
  {
    title: "Obrazy",
    href: "/artworks",
    icon: Palette,
    description: "Originální obrazy od českých umělců"
  },
  {
    title: "Keramika",
    href: "/ceramics",
    icon: Wine,
    description: "Ručně vyráběná keramika a porcelán"
  },
  {
    title: "Sklo",
    href: "/glass",
    icon: Wine,
    description: "Tradiční české sklo a křišťál"
  },
  {
    title: "Dárkové předměty",
    href: "/gifts",
    icon: Gift,
    description: "Dárky pro každou příležitost"
  },
  {
    title: "O nás",
    href: "/about",
    icon: Info,
    description: "Poznejte naši galerii"
  },
  {
    title: "Fotky",
    href: "/photos",
    icon: Images,
    description: "Fotky z naší galerie"
  },
  {
    title: "Kontakt",
    href: "/contact",
    icon: Phone,
    description: "Kontaktujte nás pro více informací"
  },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { favorites, isLoaded } = useFavorites()
  const pathname = usePathname()

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/*TODO (NL): Doplnit logo*/}
        <Link
          href="/"
          aria-label="Fryštátská galerie – domů"
          className="flex items-center space-x-2">
          <Text
            as="span"
            variant="h1">FG</Text>
        </Link>

        <nav
          aria-label="Hlavní navigace"
          className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isCurrentPage = pathname === item.href
              const inSection = isCurrentPage || pathname.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="gallery-nav-link"
                    aria-current={isCurrentPage ? "page" : inSection ? "location" : undefined}>
                    <item.icon
                      aria-hidden="true"
                      className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href="/favorites"
            className="gallery-nav-link relative"
            aria-current={pathname === "/favorites" ? "page" : undefined}
            aria-label={isLoaded && favorites.length ? `Oblíbené (${favorites.length})` : "Oblíbené"}>
            <Heart
              aria-hidden="true"
              className="h-5 w-5" />
            {isLoaded && favorites.length > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-5 min-w-5 px-0.5 flex items-center justify-center text-xs">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
            <Sheet
              open={menuOpen}
              onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Otevřít menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-80 max-w-[calc(100vw-1rem)] overflow-y-auto overscroll-contain">
                <SheetTitle className="sr-only">Navigační menu</SheetTitle>
                <SheetDescription className="sr-only">Stránky Fryštátské galerie</SheetDescription>
                <div className="p-6 border-b">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-2">
                    <Text variant="h4">Fryštátská Galerie</Text>
                  </Link>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={pathname === item.href ? "page" : pathname.startsWith(item.href + "/") ? "location" : undefined}
                      className="gallery-mobile-nav-link"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <div>
                        <Text
                          as="span"
                          variant="label">{item.title}</Text>
                        <Text
                          variant="body2"
                          color="neutral">
                          {item.description}
                        </Text>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/favorites"
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === "/favorites" ? "page" : undefined}
                    className="gallery-mobile-nav-link"
                  >
                    <Heart className="h-5 w-5 text-primary" />
                    <div>
                      <Text
                        as="span"
                        variant="label">Oblíbené</Text>
                      <Text
                        variant="body2"
                        color="neutral">
                        {isLoaded && favorites.length > 0
                          ? `${favorites.length} ${favorites.length === 1 ? "produkt" : favorites.length < 5 ? "produkty" : "produktů"}`
                          : "Vaše oblíbené produkty"
                        }
                      </Text>
                    </div>
                  </Link>
                </nav>
                <div className="p-4 border-t mt-auto">
                  <Button
                    asChild
                    className="w-full"
                    size="lg">
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Kontaktovat
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}
