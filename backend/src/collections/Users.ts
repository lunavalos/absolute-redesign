import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    components: {
      Icon: '../components/NavIcons#UsersIcon',
    },
  },
  labels: {
    singular: 'Administrador',
    plural: 'Administradores',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    },
    // Email added by default by auth: true
  ],
  versions: false,
}
