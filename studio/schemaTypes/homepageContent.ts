import { defineType, defineField } from 'sanity'

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Úvodní obsah',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Nadpis', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'text' }),
    defineField({ name: 'image', title: 'Obrázek (volitelný)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'season',
      title: 'Roční období',
      type: 'string',
      options: {
        list: [
          { title: 'Jaro', value: 'spring' },
          { title: 'Léto', value: 'summer' },
          { title: 'Podzim', value: 'autumn' },
          { title: 'Zima', value: 'winter' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'published', title: 'Zveřejnit?', type: 'boolean', initialValue: true }),
  ],
})
