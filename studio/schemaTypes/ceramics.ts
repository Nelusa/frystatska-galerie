import { defineType, defineField } from 'sanity'

export const ceramics = defineType({
  name: 'ceramics',
  title: 'Keramika',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Název', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Popis', type: 'text' }),
    defineField({ name: 'image', title: 'Obrázek', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'price', title: 'Cena (Kč)', type: 'number', validation: Rule => Rule.min(0) }),
    defineField({ name: 'published', title: 'Zveřejnit?', type: 'boolean', initialValue: true }),
    defineField({ name: 'slug', title: 'URL adresa', type: 'slug', options: { source: 'title', maxLength: 96, slugify: input => input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 96) }, validation: Rule => Rule.required() }),
  ],
})
