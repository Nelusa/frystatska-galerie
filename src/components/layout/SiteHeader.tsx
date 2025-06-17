"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Palette, Wine, Gift, Users, Phone, Info } from "lucide-react"
import { useEffect, useState } from "react"

const mainNavItems = [
  {
    title: "Obrazy",
    href: "/artworks",
    icon: Palette,
    description: "Originální obrazy od českých umělců",
    hasDropdown: true
  },
  {
    title: "Keramika",
    href: "/ceramics",
    icon: Wine,
    description: "Ručně vyráběná keramika a porcelán",
    hasDropdown: true
  },
  {
    title: "Sklo",
    href: "/glass",
    icon: Wine,
    description: "Tradiční české sklo a křišťál",
    hasDropdown: true
  },
  {
    title: "Dárkové předměty",
    href: "/gifts",
    icon: Gift,
    description: "Dárky pro každou příležitost",
    hasDropdown: true
  },
  {
    title: "O nás",
    href: "/about",
    icon: Info,
    description: "Poznejte naši galerii",
    hasDropdown: false
  },
  {
    title: "Kontakt",
    href: "/contact",
    icon: Phone,
    description: "Kontaktujte nás pro více informací",
    hasDropdown: false
  },
]

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/public" className="flex items-center space-x-2">
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
                  <Link href="/public" className="flex items-center space-x-2">
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
