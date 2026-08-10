import { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'Preguntas Frecuentes (FAQ)',
    plural: 'Bloques de FAQ',
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
      label: 'Subtítulo (Opcional)',
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Preguntas y Respuestas',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pregunta',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Respuesta',
        },
      ],
    },
  ],
}
