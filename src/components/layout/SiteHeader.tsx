"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Palette, Wine, Gift, Phone, Info, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useFavorites } from "@/lib/useFavorites"

const mainNavItems = [
  {
    title: "Obrazy",
    href: "/obrazy",
    icon: Palette,
    description: "Originální obrazy od českých umělců",
    hasDropdown: true
  },
  {
    title: "Keramika",
    href: "/keramika",
    icon: Wine,
    description: "Ručně vyráběná keramika a porcelán",
    hasDropdown: true
  },
  {
    title: "Sklo",
    href: "/sklo",
    icon: Wine,
    description: "Tradiční české sklo a křišťál",
    hasDropdown: true
  },
  {
    title: "Dárkové předměty",
    href: "/darkove-predmety",
    icon: Gift,
    description: "Dárky pro každou příležitost",
    hasDropdown: true
  },
  {
    title: "O nás",
    href: "/o-nas",
    icon: Info,
    description: "Poznejte naši galerii",
    hasDropdown: false
  },
  {
    title: "Kontakt",
    href: "/kontakt",
    icon: Phone,
    description: "Kontaktujte nás pro více informací",
    hasDropdown: false
  },
]

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const { favorites, isLoaded } = useFavorites()
  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold">Fryštátská Galerie</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="h-9">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          <Link href={item.href}>
                            <Button variant="outline" className="w-full">
                              Prohlédnout {item.title.toLowerCase()}
                            </Button>
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop favorites button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {isLoaded && favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length > 99 ? '99+' : favorites.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          {mounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Otevřít menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-heading text-xl font-bold">Fryštátská Galerie</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Heart className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Oblíbené</div>
                      <div className="text-sm text-muted-foreground">
                        {isLoaded && favorites.length > 0
                          ? `${favorites.length} ${favorites.length === 1 ? 'produkt' : favorites.length < 5 ? 'produkty' : 'produktů'}`
                          : 'Vaše oblíbené produkty'
                        }
                      </div>
                    </div>
                  </Link>
                </nav>
                <div className="p-4 border-t mt-auto">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Kontaktovat
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
