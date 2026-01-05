import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Search className="h-16 w-16 md:h-20 md:w-20 text-primary/40" />
            <Text
              as="h1"
              variant="hero"
              className="text-8xl md:text-[10rem] font-bold text-primary/20 select-none"
            >
              404
            </Text>
          </div>

          <div className="space-y-2">
            <Text as="h2" variant="h2" className="text-3xl md:text-4xl font-bold">
              Stránka nenalezena
            </Text>
            <Text variant="body1" color="neutral" className="text-lg max-w-md mx-auto">
              Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
            </Text>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Domů
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/artworks">
              <ArrowLeft className="h-5 w-5" />
              Procházet produkty
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t">
          <Text variant="body2" color="neutral" className="mb-4">
            Možná hledáte:
          </Text>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/artworks"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Obrazy
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/ceramics"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Keramika
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/glass"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Sklo
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/gifts"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Dárkové předměty
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


