import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ImageAndTextBlock: Block = {
  slug: 'imageAndText',
  labels: {
    singular: 'Sección de Imagen y Texto',
    plural: 'Secciones de Imagen y Texto',
  },
  fields: [
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        { label: 'Izquierda', value: 'left' },
        { label: 'Derecha', value: 'right' },
      ],
      defaultValue: 'left',
      required: true,
      label: 'Posición de la Imagen',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
      label: 'Texto',
    },
  ],
}
