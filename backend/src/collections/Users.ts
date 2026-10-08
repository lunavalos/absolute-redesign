import type { CollectionConfig } from 'payload'

// Helper: check if the logged-in user is an admin
const isAdmin = ({ req: { user } }: { req: { user: any } }) =>
  Boolean(user?.role === 'admin')

// Helper: admin OR the user editing their own record
const isAdminOrSelf = ({ req: { user }, id }: { req: { user: any }; id?: string | number }) =>
  Boolean(user?.role === 'admin' || (user && String(user.id) === String(id)))

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Anyone logged in can read users
    read: ({ req: { user } }) => Boolean(user),
    // Only admins can create new users
    create: isAdmin,
    // Admin can update anyone; editors can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete users
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    components: {

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
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      // Solo el admin puede cambiar el rol de cualquier usuario
      access: {
        update: isAdmin,
      },
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
    // Email added by default by auth: true
  ],
  versions: false,
}
