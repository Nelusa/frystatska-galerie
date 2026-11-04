import { PortableText } from "@portabletext/react"
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ProductCard } from "@/components/products/ProductCard"
import { businessInfo, openingHours } from "@/config/businessInfo"
import { contentLink } from "@/lib/contentLinks"
import { getCategoryUrl, getFeaturedArtworks, getHomepageContent, urlFor } from "@/lib/sanity"
import { hasSanityImage } from "@/lib/sanityImage"

const categories = [
  { title: "Obrazy", href: "/artworks", image: "/gallery/gallery-7.jpg", position: "center 56%" },
  { title: "Keramika", href: "/ceramics", image: "/gallery/gallery-14.jpg", position: "center 64%" },
  { title: "Sklo", href: "/glass", image: "/gallery/gallery-5.jpg", position: "center 50%" },
  { title: "Dárkové předměty", href: "/gifts", image: "/gallery/gallery-3.jpg", position: "center 63%" },
]

export default async function Home() {
  const [featured, content] = await Promise.all([getFeaturedArtworks(), getHomepageContent()])
  const aboutImage = content?.aboutSection?.image
  const visitButtons = content?.ctaSection?.buttons ?? [
    { text: "Kontakt a cesta k nám", link: "/contact", style: "primary" },
    { text: "Procházet galerii", link: "/artworks", style: "secondary" },
  ]

  return (
    <div className="gallery-home">
      <section
        className="gh-wrap gh-hero"
        aria-labelledby="gallery-title">
        <div className="gh-hero-copy">
          <p className="gh-label"><span /> Galerie v Karviné-Fryštátě</p>
          <h1 id="gallery-title">{content?.hero?.title || "Fryštátská galerie"}</h1>
          <p className="gh-intro">{content?.hero?.subtitle || "Obrazy, keramika a sklo v srdci Fryštátu. Zastavte se u nás a prohlédněte si, co právě máme v galerii."}</p>
          <div className="gh-actions">
            <Link
              className="gh-button"
              href={contentLink(content?.hero?.primaryButton?.link, "#kolekce")}>
              {content?.hero?.primaryButton?.text || "Prohlédnout kolekce"}<ArrowDown
                aria-hidden="true"
                size={17} />
            </Link>
            <Link
              className="gh-link"
              href={contentLink(content?.hero?.secondaryButton?.link, "/contact")}>
              {content?.hero?.secondaryButton?.text || "Naplánovat návštěvu"}<ArrowUpRight
                aria-hidden="true"
                size={16} />
            </Link>
          </div>
        </div>
        <figure className="gh-hero-figure">
          <div className="gh-hero-image">
            <Image
              src="/gallery/gallery-11.jpg"
              alt="Stěna Fryštátské galerie s obrazy v rámech"
              fill
              priority
              sizes="(max-width: 760px) 94vw, 52vw" />
          </div>
          <figcaption><span>Uvnitř galerie</span><span>{businessInfo.address.street} · Karviná</span></figcaption>
        </figure>
      </section>

      <section
        id="kolekce"
        className="gh-wrap gh-collections"
        aria-labelledby="collections-title">
        <div className="gh-section-head">
          <h2 id="collections-title">Naše kolekce</h2>
          <Link
            href="/all"
            className="gh-link">Celá nabídka <ArrowRight
              aria-hidden="true"
              size={16} /></Link>
        </div>
        <div className="gh-category-grid">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="gh-category">
              <div className="gh-category-image">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 46vw, 25vw"
                  style={{ objectPosition: category.position }} />
              </div>
              <div className="gh-category-caption"><h3>{category.title}</h3><ArrowUpRight
                aria-hidden="true"
                size={17} /></div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section
          className="gh-wrap gh-featured"
          aria-labelledby="featured-title">
          <div className="gh-section-head">
            <h2 id="featured-title">Doporučená díla</h2>
            <Link
              href="/all"
              className="gh-link">Všechna díla <ArrowRight
                aria-hidden="true"
                size={16} /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.slice(0, 8).map((item) => (
              <ProductCard
                key={item._id}
                item={item}
                basePath={getCategoryUrl(item._type)}
                variant="grid" />
            ))}
          </div>
        </section>
      )}

      <section
        className="gh-story"
        aria-labelledby="story-title">
        <div className="gh-wrap gh-story-grid">
          <div className="gh-story-image">
            <Image
              src={hasSanityImage(aboutImage) ? urlFor(aboutImage).width(1200).height(1200).fit("crop").url() : "/gallery/gallery-3.jpg"}
              alt={aboutImage?.alt || "Police s keramikou a obrazy ve Fryštátské galerii"}
              fill
              sizes="(max-width: 760px) 94vw, 44vw"
            />
          </div>
          <div className="gh-story-copy">
            <p className="gh-label"><span /> O galerii</p>
            <h2 id="story-title">{content?.aboutSection?.title || "Umění s tradicí"}</h2>
            <div className="gh-prose">
              {content?.aboutSection?.content?.length ? (
                <PortableText
                  value={content.aboutSection.content}
                  components={{
                    marks: {
                      link: ({ value, children }) => <a href={contentLink(value?.href, "/about")}>{children}</a>,
                    },
                  }}
                />
              ) : (
                <>
                  <p>Fryštátská Galerie je místem, kde se setkává tradiční řemeslo s moderním uměním. Již více než 15 let přinášíme našim zákazníkům jedinečné umělecké zážitky.</p>
                  <p>Spolupracujeme s místními umělci, abychom vám mohli nabídnout tu nejširší paletu uměleckých děl a řemeslných výrobků nejvyšší kvality.</p>
                </>
              )}
            </div>
            <div className="gh-actions">
              <Link
                className="gh-link"
                href={contentLink(content?.aboutSection?.button?.link, "/about")}>
                {content?.aboutSection?.button?.text || "Více o nás"}<ArrowRight
                  aria-hidden="true"
                  size={16} />
              </Link>
              <Link
                className="gh-link"
                href="/photos">Fotky galerie <ArrowUpRight
                  aria-hidden="true"
                  size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="gh-visit"
        aria-labelledby="visit-title">
        <div className="gh-wrap gh-visit-grid">
          <div>
            <p className="gh-label"><span /> Fryštátská 57 · Karviná</p>
            <h2 id="visit-title">{content?.ctaSection?.title || "Navštivte nás"}</h2>
            {content?.ctaSection?.description && <p className="gh-intro">{content.ctaSection.description}</p>}
            <div className="gh-actions">
              {visitButtons.map((button, index) => (
                <Link
                  key={index}
                  href={contentLink(button.link, "/contact")}
                  className={button.style === "primary" ? "gh-button" : "gh-link"}>
                  {button.text}<ArrowUpRight
                    aria-hidden="true"
                    size={16} />
                </Link>
              ))}
            </div>
          </div>
          <div className="gh-hours">
            <h3>Otevírací doba</h3>
            <dl>
              {openingHours.map(({ label, hours }) => (
                <div key={label}><dt>{label}</dt><dd>{hours}</dd></div>
              ))}
            </dl>
            <a href={businessInfo.phone.href}>{businessInfo.phone.display}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
