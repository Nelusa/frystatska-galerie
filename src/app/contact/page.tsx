import { ReactNode } from "react";

import { Mail, Phone, MapPin, Clock, Instagram, Facebook, LucideIcon } from "lucide-react";

import { ItemWithIcon } from "@/components/shared";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  content: ReactNode;
}

export interface SocialMediaLink {
  icon: LucideIcon;
  href: string;
}

const contactData: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Adresa",
    content: (
        <>
          <Text
            variant="body1"
            color="neutral">Fryštátská 57</Text>
          <Text
            variant="body1"
            color="neutral">733 01 Karviná 1-Fryštát</Text>
        </>
    )
  },
  {
    icon: Phone,
    title: "Telefon",
    content: (
        <a
          href="tel:+420605416666"
          className="text-primary hover:text-primary/80 transition-all duration-300 text-base font-medium"
        >
          +420 605 416 666
        </a>
    )
  },
  {
    icon: Mail,
    title: "E-mail",
    content: (
        <a
          href="mailto:info@frystatskagalerie.cz"
          className="text-primary hover:text-primary/80 transition-all duration-300 text-base font-medium"
        >
          info@frystatskagalerie.cz
        </a>
    )
  },
  {
    icon: Clock,
    title: "Otevírací doba",
    content: (
        <>
          <Text
            variant="body1"
            color="neutral">Po-Pá: 9:30 - 16:30</Text>
          <Text
            variant="body1"
            color="neutral">So: Zavřeno</Text>
          <Text
            variant="body1"
            color="neutral">Ne: Zavřeno</Text>
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
    description: "Nejbližší zastávkou je <strong>Fryštát - Univerzita</strong> (linky 511, 512, 515). Odtud to máte do galerie necelé 2 minuty chůze."
  },
  {
    emoji: "🚗",
    title: "Autem",
    description: "Zaparkovat můžete přímo na ulici Fryštátská (většinou bez problémů) nebo na Masarykově náměstí, které je vzdálené jen několik desítek metrů. Parkování je v centru většinou zpoplatněné."
  }
];

const socialMedia: SocialMediaLink[] = [
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" }
];

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

              <Card>
                <CardHeader>
                  <CardTitle>Sledujte nás</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
                        >
                          <social.icon className="w-6 h-6 text-primary" />
                        </a>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.1234567890123!2d18.54123456789012!3d49.85432109876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e33c12345678%3A0xabcdef1234567890!2sFry%C5%A1t%C3%A1tsk%C3%A1%2057%2C%20733%2001%20Karvin%C3%A1%201-Fry%C5%A1t%C3%A1t!5e0!3m2!1scs!2scz!4v1234567890123"
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
                      href="https://maps.google.com/?q=Fryštátská+57,+733+01+Karviná+1-Fryštát"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 font-medium"
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
                          {/*TODO (NL): Odstranit dangerouslySetHTML*/}
                          <Text
                            variant="body2"
                            color="neutral"
                            dangerouslySetInnerHTML={{ __html: option.description }} />
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
