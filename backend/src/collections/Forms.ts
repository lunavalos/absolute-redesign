import { APIError, CollectionConfig, Field } from 'payload'

const questionFields: Field[] = [
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
      {
        name: 'requiresExplanation',
        type: 'checkbox',
        label: '¿Requiere que el candidato explique o detalle?',
        defaultValue: false,
        admin: {
          description: 'Si se activa, al seleccionar esta opción se abrirá un campo de texto adicional obligatorio para que el candidato detalle su respuesta.',
        },
      },
      {
        name: 'explanationPlaceholder',
        type: 'text',
        localized: true,
        label: 'Instrucción o Placeholder (Opcional)',
        admin: {
          condition: (data, siblingData) => Boolean(siblingData?.requiresExplanation),
          description: 'Ejemplo: "Por favor explica el motivo y fecha..."',
        },
      },
    ],
  },
];

export const Forms: CollectionConfig = {
  slug: 'forms',
  access: {
    read: () => true, // Allows public access to read the form schema
  },
  admin: {
    useAsTitle: 'title',
    description: 'Crea y administra cuestionarios para solicitudes de empleo.',
    components: {

    },
  },
  labels: {
    singular: 'Cuestionario',
    plural: 'Cuestionarios',
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        const errors: { message: string, field: string }[] = [];

        // Validar puntuación en Secciones
        if (data && Array.isArray(data.sections)) {
          for (let s = 0; s < data.sections.length; s++) {
            const section = data.sections[s];
            if (Array.isArray(section.questions)) {
              for (let i = 0; i < section.questions.length; i++) {
                const q = section.questions[i];
                if (['radio', 'checkbox', 'select'].includes(q.type) && Array.isArray(q.options)) {
                  let sum = 0;
                  for (const opt of q.options) {
                    if (typeof opt.score === 'number') sum += opt.score;
                  }
                  if (sum !== 100 && sum !== 0) {
                    errors.push({
                      field: `sections.${s}.questions.${i}.options`,
                      message: `¡Error en "${section.title || `Sección ${s + 1}`}"! Las opciones de esta pregunta suman ${sum} puntos. Deben sumar exactamente 100.`
                    });
                  }
                }
              }
            }
          }
        }

        // Validar puntuación en preguntas legacy sueltas
        if (data && Array.isArray(data.questions)) {
          for (let i = 0; i < data.questions.length; i++) {
            const q = data.questions[i];
            if (['radio', 'checkbox', 'select'].includes(q.type) && Array.isArray(q.options)) {
              let sum = 0;
              for (const opt of q.options) {
                if (typeof opt.score === 'number') sum += opt.score;
              }
              if (sum !== 100 && sum !== 0) {
                errors.push({
                  field: `questions.${i}.options`,
                  message: `¡Error! Las opciones de esta pregunta suman ${sum} puntos. Deben sumar exactamente 100.`
                });
              }
            }
          }
        }

        if (errors.length > 0) {
          throw new APIError('Validación de Puntuación Fallida', 400, errors);
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
      name: 'sections',
      type: 'array',
      label: 'Secciones del Cuestionario (Steps / Pasos)',
      labels: {
        singular: 'Sección / Paso',
        plural: 'Secciones / Pasos',
      },
      admin: {
        description: 'Organiza las preguntas en secciones. Cada sección se mostrará como un "Paso" (Step) en el formulario interactivo.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Título de la Sección / Paso',
          admin: {
            placeholder: 'Ej: 1. Información General',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Descripción o Instrucciones (Opcional)',
          admin: {
            placeholder: 'Instrucciones o contexto para esta sección de preguntas...',
          },
        },
        {
          name: 'questions',
          type: 'array',
          required: true,
          label: 'Preguntas de esta Sección',
          admin: {
            initCollapsed: true,
          },
          fields: questionFields,
        },
      ],
    },
    {
      name: 'questions',
      type: 'array',
      required: false,
      label: 'Preguntas Sueltas (Sin Sección / Modo Simple)',
      admin: {
        description: 'Preguntas generales que no pertenecen a ninguna sección específica.',
        initCollapsed: true,
      },
      fields: questionFields,
    },
  ],
}
