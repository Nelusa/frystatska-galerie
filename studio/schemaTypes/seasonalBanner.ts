import { defineType, defineField } from 'sanity'

export const seasonalBanner = defineType({
  name: 'seasonalBanner',
  title: 'Sváteční banner',
  type: 'document',
  fields: [
    defineField({ name: 'message', title: 'Zpráva', type: 'string' }),
    defineField({ name: 'image', title: 'Obrázek (volitelný)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'activeFrom',
      title: 'Platné od',
      type: 'datetime',
    }),
    defineField({
      name: 'activeTo',
      title: 'Platné do',
      type: 'datetime',
    }),
    defineField({ name: 'published', title: 'Zveřejnit?', type: 'boolean', initialValue: true }),
  ],
})
