import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    components: {

    },
  },
  labels: {
    singular: 'Empleado',
    plural: 'Empleados',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
    {
      name: 'position',
      type: 'text',
      localized: true,
      required: true,
      label: 'Puesto',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto del Empleado',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'Enlace de LinkedIn',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Correo Electrónico',
    },
  ],
}
