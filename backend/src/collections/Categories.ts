import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    components: {
      Icon: '../components/NavIcons#CategoriesIcon',
    },
  },
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre de la Categoría',
    },
  ],
}
