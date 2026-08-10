import { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: {
    singular: 'Características (Features)',
    plural: 'Bloques de Características',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título de la Sección',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtítulo o Descripción (Opcional)',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Elementos / Características',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título de la Característica',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Descripción Corta',
        },
      ],
    },
  ],
}
