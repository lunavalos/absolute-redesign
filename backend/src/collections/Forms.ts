import { APIError } from 'payload'


export const Forms: CollectionConfig = {
  slug: 'forms',
  access: {
    read: () => true, // Allows public access to read the form schema
  },
  admin: {
    useAsTitle: 'title',
    description: 'Crea y administra cuestionarios para solicitudes de empleo.',
    components: {
      Icon: '../components/NavIcons#FormsIcon',
    },
  },
  labels: {
    singular: 'Cuestionario',
    plural: 'Cuestionarios',
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data && Array.isArray(data.questions)) {
          const errors: { message: string, field: string }[] = [];
          
          for (let i = 0; i < data.questions.length; i++) {
            const q = data.questions[i];
            if (['radio', 'checkbox', 'select'].includes(q.type) && Array.isArray(q.options)) {
              let sum = 0;
              for (const opt of q.options) {
                if (typeof opt.score === 'number') sum += opt.score;
              }
              if (sum !== 100 && sum !== 0) {
                // Generamos un error específico para el campo exacto de la pregunta que falló
                errors.push({
                  field: `questions.${i}.options`,
                  message: `¡Error! Las opciones de esta pregunta suman ${sum} puntos. Deben sumar exactamente 100.`
                });
              }
            }
          }
          
          if (errors.length > 0) {
            throw new APIError('Validación de Puntuación Fallida', 400, errors);
          }
        }
        return data;
      }
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Si este cuestionario se guardó como activo, desactivamos todos los demás
        if (doc.isActive) {
          await req.payload.update({
            collection: 'forms',
            where: {
              id: {
                not_equals: doc.id,
              },
              isActive: {
                equals: true,
              },
            },
            data: {
              isActive: false,
            },
          });
        }
        return doc;
      }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Título del Cuestionario',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Activo',
      defaultValue: false,
      admin: {
        description: 'Si está activo, se mostrará en la página de aplicación. Asegúrate de tener solo uno activo a la vez.',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      label: 'Preguntas',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Texto Abierto', value: 'text' },
            { label: 'Número', value: 'number' },
            { label: 'Una sola opción (Radio)', value: 'radio' },
            { label: 'Múltiples opciones (Checkbox)', value: 'checkbox' },
            { label: 'Lista Desplegable (Select)', value: 'select' },
            { label: 'Subir Archivo (Ej. CV)', value: 'file' },
          ],
          label: 'Tipo de Pregunta',
        },
        {
          name: 'questionLabel',
          type: 'text',
          required: true,
          localized: true,
          label: 'Pregunta o Instrucción',
        },
        {
          name: 'required',
          type: 'checkbox',
          label: '¿Es obligatoria?',
        },
        {
          name: 'options',
          type: 'array',
          label: 'Opciones de Respuesta',
          admin: {
            condition: (data, siblingData) => {
              if (!siblingData) return false;
              return ['radio', 'checkbox', 'select'].includes(siblingData.type);
            },
            description: 'Define las opciones y su puntuación (la suma debe dar 100).',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Texto de la Opción',
            },
            {
              name: 'score',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              label: 'Puntuación (0-100)',
            },
          ],
        },
      ],
    },
  ],
}
