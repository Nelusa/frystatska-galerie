import { ReactNode } from "react";

import { Mail, Phone, MapPin, Clock, LucideIcon } from "lucide-react";

import { ItemWithIcon } from "@/components/shared";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { businessInfo, getFullOpeningHours } from "@/config/businessInfo";

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  content: ReactNode;
}

const contactData: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Adresa",
    content: (
        <>
          <Text
            variant="body1"
            color="neutral">{businessInfo.address.street}</Text>
          <Text
            variant="body1"
            color="neutral">{businessInfo.address.city}</Text>
        </>
    )
  },
  {
    icon: Phone,
    title: "Telefon",
    content: (
        <a
          href={businessInfo.phone.href}
          className="text-primary hover:text-primary/80 transition-colors duration-150 text-base font-medium"
        >
          {businessInfo.phone.display}
        </a>
    )
  },
  {
    icon: Mail,
    title: "E-mail",
    content: (
        <a
          href={businessInfo.email.href}
          className="text-primary hover:text-primary/80 transition-colors duration-150 text-base font-medium"
        >
          {businessInfo.email.display}
        </a>
    )
  },
  {
    icon: Clock,
    title: "Otevírací doba",
    content: (
        <>
          {getFullOpeningHours().map((hours, index) => (
            <Text
              key={index}
              variant="body1"
              color="neutral">{hours}</Text>
          ))}
        </>
    )
  }
];

const transportOptions = [
  {
    emoji: "🚶",
    title: "Pěšky",
    description: "Galerie se nachází jen pár kroků od náměstí, přímo ve starobylém centru Fryštátu. Pokud půjdete z Masarykova náměstí, stačí sejít ulicí Fryštátskou – uvidíte nás po pravé straně."
  },
  {
    emoji: "🚌",
    title: "MHD",
    description: "Nejbližší zastávkou je Fryštát – Univerzita (linky 511, 512, 515). Odtud to máte do galerie necelé 2 minuty chůze."
  },
  {
    emoji: "🚗",
    title: "Autem",
    description: "Zaparkovat můžete přímo na ulici Fryštátská (většinou bez problémů) nebo na Masarykově náměstí, které je vzdálené jen několik desítek metrů. Parkování je v centru většinou zpoplatněné."
  }
];

const mapQuery = encodeURIComponent(businessInfo.address.full);

export default function ContactsPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <Text
              as="h1"
              variant="hero"
              className="mb-4 tracking-tighter">
              Kontakt
            </Text>
            <Text
              variant="body1"
              color="neutral"
              className="max-w-2xl mx-auto">
              Jsme tu pro vás! Navštivte nás v srdci Fryštátu nebo nás kontaktujte telefonicky či e-mailem.
            </Text>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktní údaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contactData.map((item, index) => (
                        <ItemWithIcon
                          key={index}
                          icon={item.icon}
                          title={item.title}>
                          {item.content}
                        </ItemWithIcon>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Kde nás najdete</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-xl overflow-hidden border border-border">
                    <iframe
                      src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Fryštátská Galerie - mapa"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-150 font-medium"
                    >
                      <MapPin className="w-4 h-4" />
                      Otevřít v Google Maps
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Jak se k nám dostanete</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transportOptions.map((option, index) => (
                        <ItemWithIcon
                          key={index}
                          emoji={option.emoji}
                          title={option.title}>
                          <Text
                            variant="body2"
                            color="neutral"
                            >{option.description}</Text>
                        </ItemWithIcon>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
