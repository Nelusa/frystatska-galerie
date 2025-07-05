import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContactItemProps, TransportOptionProps, SocialMediaLink, ContactInfo } from "@/lib/types";

const ContactItem = ({ icon: Icon, title, children }: ContactItemProps) => (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        {children}
      </div>
    </div>
);

const TransportOption = ({ emoji, title, description }: TransportOptionProps) => (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-primary font-semibold text-sm">{emoji}</span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
);

const contactData: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Adresa",
    content: (
        <>
          <p className="text-muted-foreground">Fryštátská 57</p>
          <p className="text-muted-foreground">733 01 Karviná 1-Fryštát</p>
        </>
    )
  },
  {
    icon: Phone,
    title: "Telefon",
    content: (
        <a
            href="tel:+420605416666"
            className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
        >
          +420 605 416 666
        </a>
    )
  },
  {
    icon: Mail,
    title: "Email",
    content: (
        <a
            href="mailto:info@frystatskagalerie.cz"
            className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
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
          <p className="text-muted-foreground">Po-Pá: 9:00 - 17:00</p>
          <p className="text-muted-foreground">So: 9:00 - 15:00</p>
          <p className="text-muted-foreground">Ne: Zavřeno</p>
        </>
    )
  }
];

const transportOptions: TransportOptionProps[] = [
  {
    emoji: "🚶",
    title: "Pěšky",
    description: "Galerie se nachází jen pár kroků od náměstí, přímo ve starobylém centru Fryštátu. Pokud půjdete z Masarykova náměstí, stačí sejít ulicí Fryštátskou – uvidíte nás po pravé straně."
  },
  {
    emoji: "🚌",
    title: "MHD",
    description: "Nejbližší zastávkou je <strong>Fryštátská</strong> (linky 511, 512, 515). Odtud to máte do galerie necelé 2 minuty chůze."
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
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kontakt
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jsme tu pro vás! Navštivte nás v srdci Fryštátu nebo nás kontaktujte telefonicky či emailem.
            </p>
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
                        <ContactItem key={index} icon={item.icon} title={item.title}>
                          {item.content}
                        </ContactItem>
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
                            className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
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
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
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
                        <TransportOption key={index} {...option} />
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
