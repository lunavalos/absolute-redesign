import { Block } from 'payload'

export const CallToActionBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Llamado a la Acción (CTA)',
    plural: 'Llamados a la Acción',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción (Opcional)',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Texto del Botón',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      label: 'Enlace del Botón',
    },
  ],
}
