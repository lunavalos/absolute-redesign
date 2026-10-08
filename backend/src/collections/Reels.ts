import { CollectionConfig } from 'payload'

export const Reels: CollectionConfig = {
  slug: 'reels',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    components: {

    },
  },
  labels: {
    singular: 'Reel',
    plural: 'Reels',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Título del Video',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Descripción Corta',
    },
    {
      name: 'youtubeLink',
      type: 'text',
      required: true,
      label: 'Enlace de YouTube (URL de inserción)',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de Portada (Opcional)',
    },
  ],
}
