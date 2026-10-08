import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true, create: () => true, update: () => true, delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    components: {

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
