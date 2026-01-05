import { defineType, defineField } from "sanity"

export const glass = defineType({
  name: "glass",
  title: "Sklo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "text",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Hlavní obrázek",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "gallery",
      title: "Galerie obrázků",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }]
    }),
    defineField({
      name: "price",
      title: "Cena (Kč)",
      type: "number",
      validation: Rule => Rule.min(0).required()
    }),
    defineField({
      name: "originalPrice",
      title: "Původní cena",
      type: "number",
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: "artist",
      title: "Sklárna/Výrobce",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "technique",
      title: "Technika výroby",
      type: "string"
    }),
    defineField({
      name: "dimensions",
      title: "Rozměry",
      type: "string"
    }),
    defineField({
      name: "material",
      title: "Typ skla",
      type: "string"
    }),
    defineField({
      name: "collection",
      title: "Kolekce",
      type: "string"
    }),
    defineField({
      name: "subcategory",
      title: "Podkategorie",
      type: "string",
      options: {
        list: [
          { title: "Vázy", value: "vazy" },
          { title: "Sklenice", value: "sklenice" },
          { title: "Svícny", value: "svicny" },
          { title: "Mísy", value: "misy" },
          { title: "Vitráže", value: "vitraze" },
          { title: "Dekorace", value: "dekorace" }
        ]
      }
    }),
    defineField({
      name: "featured",
      title: "Doporučené",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "inStock",
      title: "Skladem",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "published",
      title: "Zveřejnit?",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "slug",
      title: "URL adresa",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: input => input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96)
      },
      validation: Rule => Rule.required()
    }),
  ],
})
