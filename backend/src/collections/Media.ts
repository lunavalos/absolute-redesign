import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, create: () => true, update: () => true, delete: () => true,
    create: () => true,
  },
  admin: {
    description: 'Espacio para subir imágenes, íconos y PDFs corporativos.',
    components: {

    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      label: 'Texto Alternativo (SEO)',
    },
  ],
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
  },
}
