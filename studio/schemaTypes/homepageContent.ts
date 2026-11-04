import { defineType, defineField } from "sanity"

export const homepageContent = defineType({
  name: "homepageContent",
  title: "Obsah hlavní stránky",
  type: "document",
  fields: [
    // Hero sekce
    defineField({
      name: "hero",
      title: "Úvod stránky",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Hlavní nadpis",
          type: "string",
          validation: Rule => Rule.required()
        }),
        defineField({
          name: "subtitle",
          title: "Podnadpis",
          type: "text",
          rows: 3,
          validation: Rule => Rule.required()
        }),
        defineField({
          name: "backgroundImage",
          title: "Pozadí (volitelné)",
          type: "image",
          options: { hotspot: true }
        }),
        defineField({
          name: "primaryButton",
          title: "Hlavní tlačítko",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string", initialValue: "Prohlédnout kolekci" }),
            defineField({ name: "link", title: "Odkaz", type: "string", initialValue: "/artworks" })
          ]
        }),
        defineField({
          name: "secondaryButton",
          title: "Vedlejší tlačítko",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string", initialValue: "Kontaktujte nás" }),
            defineField({ name: "link", title: "Odkaz", type: "string", initialValue: "/contact" })
          ]
        })
      ]
    }),

    // O nás
    defineField({
      name: "aboutSection",
      title: "Sekce \"O nás\"",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Nadpis",
          type: "string",
          initialValue: "Umění s tradicí"
        }),
        defineField({
          name: "content",
          title: "Obsah",
          type: "array",
          of: [{ type: "block" }]
        }),
        defineField({
          name: "image",
          title: "Obrázek",
          type: "image",
          fields: [defineField({ name: "alt", title: "Co je na fotce", type: "string", description: "Krátký popis pro návštěvníky, kteří obrázek nevidí." })],
          options: { hotspot: true }
        }),
        defineField({
          name: "button",
          title: "Tlačítko",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string", initialValue: "Více o nás" }),
            defineField({ name: "link", title: "Odkaz", type: "string", initialValue: "/about" })
          ]
        })
      ]
    }),

    // Call to action
    defineField({
      name: "ctaSection",
      title: "Výzva k akci",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Nadpis",
          type: "string",
          initialValue: "Navštivte nás"
        }),
        defineField({
          name: "description",
          title: "Popis",
          type: "text",
          rows: 3
        }),
        defineField({
          name: "buttons",
          title: "Tlačítka",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "text", title: "Text", type: "string" }),
                defineField({ name: "link", title: "Odkaz", type: "string" }),
                defineField({
                  name: "style",
                  title: "Styl",
                  type: "string",
                  options: {
                    list: [
                      { title: "Primární", value: "primary" },
                      { title: "Sekundární", value: "secondary" }
                    ]
                  },
                  initialValue: "primary"
                })
              ]
            }
          ],
          validation: Rule => Rule.max(3)
        })
      ]
    }),

    // Doporučené kategorie (override)
    defineField({
      name: "featuredCategories",
      title: "Doporučené kategorie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Název", type: "string" }),
            defineField({ name: "description", title: "Popis", type: "text" }),
            defineField({ name: "link", title: "Odkaz", type: "string" }),
            defineField({ name: "image", title: "Obrázek", type: "image", options: { hotspot: true } }),
            defineField({
              name: "icon",
              title: "Ikona",
              type: "string",
              options: {
                list: [
                  { title: "🎨 Paleta", value: "palette" },
                  { title: "🏺 Keramika", value: "cookie" },
                  { title: "🍷 Sklo", value: "wine" },
                  { title: "🎁 Dárek", value: "gift" }
                ]
              }
            })
          ]
        }
      ],
      validation: Rule => Rule.max(4)
    }),

    // SEO a metadata
    defineField({
      name: "seo",
      title: "SEO nastavení",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta nadpis", type: "string" }),
        defineField({ name: "metaDescription", title: "Meta popis", type: "text", rows: 3 }),
        defineField({ name: "ogImage", title: "Obrázek pro sdílení", type: "image" })
      ]
    }),

    defineField({
      name: "published",
      title: "Zveřejnit?",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "hero.title",
      subtitle: "hero.subtitle"
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: title || "Obsah hlavní stránky",
        subtitle: subtitle || "Není nastaven podnádpis"
      }
    }
  }
})
