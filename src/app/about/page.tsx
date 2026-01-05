import { Heart, Palette, Users, Award, Clock, MapPin, Star, Sparkles, LucideIcon } from "lucide-react";
import Image from "next/image";

import { Statistic, ItemWithIcon, IconCircle } from "@/components/shared";
import { IconCircleSize } from "@/components/shared/IconCircle";
import { StatisticProps } from "@/components/shared/Statistic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface AboutFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const aboutFeatures: AboutFeature[] = [
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
        <section className="relative py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <Text
                as="h1"
                variant="hero"
                className="mb-4 tracking-tighter">
                O Fryštátské Galerii
              </Text>
              <Text
                variant="description"
                color="neutral"
                className="max-w-3xl mx-auto leading-relaxed">
                Rodinná galerie v srdci Karviné, která přináší krásu umění a řemesla do každodenního života
              </Text>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  width={800}
                  height={450}
                  src="/gallery/gallery-1.jpg"
                  alt="Fryštátská Galerie - interiér s obrazy a keramikou"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Náš příběh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Text
                      variant="body1"
                      color="neutral"
                      className="leading-relaxed">
                      Fryštátská Galerie vznikla z lásky k umění a touhy přinést krásu do srdce Karviné.
                      Jako rodinná galerie se zaměřujeme na prezentaci a prodej originálních děl od místních umělců.
                    </Text>
                    <Text
                      variant="body1"
                      color="neutral"
                      className="leading-relaxed">
                      Naším cílem je vytvořit místo, kde se setkává tradiční řemeslo s moderním uměním,
                      kde každý návštěvník může objevit něco jedinečného pro svůj domov nebo jako dárek pro své blízké.
                    </Text>
                    <div className="flex items-center space-x-2 text-primary">
                      <Heart className="w-5 h-5" />
                      <Text
                        variant="h5"
                        color="primary"
                        className="font-semibold">Vedoucí galerie: Monika Letochová</Text>
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
                        <ItemWithIcon
                          key={index}
                          icon={feature.icon}
                          title={feature.title}>
                          <Text
                            variant="body1"
                            color="neutral"
                            className="leading-relaxed">{feature.description}</Text>
                        </ItemWithIcon>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-20 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Text
                as="h2"
                variant="h2"
                className="mb-4">
                Naše čísla
              </Text>
              <Text
                variant="description"
                color="neutral">
                Pár zajímavých čísel o naší galerii
              </Text>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                  <Statistic
                    key={index}
                    {...stat} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <Text
                as="h2"
                variant="h2"
                className="mb-4">
                Co v naší galerii najdete
              </Text>
              <Text
                variant="description"
                color="neutral">
                Široký výběr uměleckých děl a řemeslných výrobků pro každý vkus
              </Text>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerings.map((offering, index) => (
                  <Card
                    key={index}
                    className="text-center">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <IconCircle
                          icon={offering.icon}
                          size={IconCircleSize.Lg}
                          className="mx-auto" />
                        <Text variant="h4">{offering.title}</Text>
                        <Text
                          variant="body1"
                          color="neutral">{offering.description}</Text>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-20 bg-card/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Text
                  as="h2"
                  variant="h2"
                  className="mb-6">
                  Navštivte nás
                </Text>
                <div className="space-y-4">
                  <ItemWithIcon
                    icon={MapPin}
                    title="Adresa">
                    <Text
                      variant="body1"
                      color="neutral">Fryštátská 57, 733 01 Karviná 1-Fryštát</Text>
                  </ItemWithIcon>
                  <ItemWithIcon
                    icon={Clock}
                    title="Otevírací doba">
                    <Text
                      variant="body1"
                      color="neutral">Po-Pá: 9:30 - 16:30</Text>
                  </ItemWithIcon>
                </div>
                <Text
                  variant="body1"
                  color="neutral"
                  className="mt-6 leading-relaxed">
                  Nacházíme se v srdci historického Fryštátu, jen pár kroků od Masarykova náměstí.
                  Přijďte si prohlédnout naši galerii a nechte se inspirovat krásou umění.
                </Text>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  width={400}
                  height={400}
                  src="/gallery/gallery-2.jpg"
                  alt="Fryštátská Galerie - výstavní prostory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
