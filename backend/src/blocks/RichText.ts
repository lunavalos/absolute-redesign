import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Texto Enriquecido',
    plural: 'Textos Enriquecidos',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: 'Contenido',
    },
  ],
}
