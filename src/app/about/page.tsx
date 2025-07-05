import Image from "next/image";
import { Heart, Palette, Users, Award, Clock, MapPin, Star, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {FeatureProps, StatisticProps} from "@/lib/types";
import {Feature, Statistic} from "@/components/shared";

const aboutFeatures: FeatureProps[] = [
  {
    icon: Palette,
    title: "Umělecká kvalita",
    description: "Vybíráme pouze ta nejkvalitnější díla od uznávaných umělců a řemeslníků."
  },
  {
    icon: Users,
    title: "Osobní přístup",
    description: "Každému zákazníkovi věnujeme individuální pozornost a pomůžeme s výběrem."
  },
  {
    icon: Award,
    title: "Tradice a inovace",
    description: "Propojujeme tradiční české řemeslo s moderními uměleckými trendy."
  }
];

const statistics: StatisticProps[] = [
  { number: "15+", label: "Let zkušeností", icon: Clock },
  { number: "500+", label: "Spokojených zákazníků", icon: Heart },
  { number: "50+", label: "Spolupracujících umělců", icon: Users },
  { number: "1000+", label: "Vystavených děl", icon: Palette }
];

const offerings = [
  {
    title: "Obrazy",
    icon: Palette,
    description: "Originální obrazy od českých umělců v různých technikách a stylech"
  },
  {
    title: "Keramika",
    icon: Sparkles,
    description: "Ručně vyráběná keramika s jedinečným designem a vysokou kvalitou"
  },
  {
    title: "Sklo",
    icon: Star,
    description: "Tradiční české sklo a křišťál od renomovaných skláren"
  },
  {
    title: "Dárky",
    icon: Heart,
    description: "Dárkové předměty pro každou příležitost s osobním přístupem"
  }
];

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Hero Section */}
        <section className="relative py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                O Fryštátské Galerii
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Rodinná galerie v srdci Karviné, která přináší krásu umění a řemesla do každodenního života
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    width={800}
                    height={450}
                    src="/galerie-general.jpg"
                    alt="Fryštátská Galerie - interiér"
                    className="w-full h-full object-cover"
                    priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Náš příběh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Fryštátská Galerie vznikla z lásky k umění a touhy přinést krásu do srdce Karviné.
                      Jako rodinná galerie se zaměřujeme na prezentaci a prodej originálních děl od místních umělců.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Naším cílem je vytvořit místo, kde se setkává tradiční řemeslo s moderním uměním,
                      kde každý návštěvník může objevit něco jedinečného pro svůj domov nebo jako dárek pro své blízké.
                    </p>
                    <div className="flex items-center space-x-2 text-primary">
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">Vedoucí galerie: Monika Letochová</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Naše hodnoty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {aboutFeatures.map((feature, index) => (
                        <Feature key={index} {...feature} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-10 md:py-20 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Naše čísla
              </h2>
              <p className="text-muted-foreground text-lg">
                Pár zajímavých čísel o naší galerii
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                  <Statistic key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Co v naší galerii najdete
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Široký výběr uměleckých děl a řemeslných výrobků pro každý vkus
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerings.map((offering, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <offering.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{offering.title}</h3>
                        <p className="text-muted-foreground">{offering.description}</p>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-10 md:py-20 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Navštivte nás
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Fryštátská 57, 733 01 Karviná 1-Fryštát</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Po-Pá: 9:00 - 17:00, So: 9:00 - 15:00</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-6 leading-relaxed">
                  Nacházíme se v srdci historického Fryštátu, jen pár kroků od Masarykova náměstí.
                  Přijďte si prohlédnout naši galerii a nechte se inspirovat krásou umění.
                </p>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                    width={400}
                    height={400}
                    src="/galerie-general.jpg"
                    alt="Fryštátská Galerie - exteriér"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
