import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    components: {
      Icon: '../components/NavIcons#TagsIcon',
    },
  },
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre de la Etiqueta',
    },
  ],
}
