import type { CollectionConfig } from 'payload'


export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  access: {
    create: () => true, // Allow candidates to submit applications
    read: () => true,   // Only admins should really read this, but for now we'll allow it (Payload auth handles it if configured)
  },
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicantName', 'phone', 'city', 'state', 'positionApplied', 'availability', 'totalScore', 'createdAt'],
    description: 'Respuestas a los cuestionarios de empleo.',
    components: {

    },
  },
  labels: {
    singular: 'Solicitud de Empleo',
    plural: 'Solicitudes de Empleo',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Cuestionario',
    },
    {
      name: 'applicantName',
      type: 'text',
      required: true,
      label: 'Nombre Completo',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Teléfono / WhatsApp',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Correo Electrónico',
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: 'Estado',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Ciudad',
    },
    {
      name: 'positionApplied',
      type: 'select',
      required: true,
      label: '¿Puesto al que aplicas?',
      options: [
        { label: 'Operador Sencillo (B1)', value: 'Operador Sencillo (B1)' },
        { label: 'Operador Doble (B1)', value: 'Operador Doble (B1)' },
      ],
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      label: '¿Disponibilidad para iniciar?',
      options: [
        { label: 'Inmediato', value: 'Inmediato' },
        { label: '1 semana', value: '1 semana' },
        { label: '2 semanas', value: '2 semanas' },
        { label: '1 mes', value: '1 mes' },
      ],
    },
    {
      name: 'totalScore',
      type: 'number',
      label: 'Puntuación Total',
      admin: {
        description: 'Se calcula automáticamente basado en las respuestas.',
        components: {
          Cell: '@/components/ScoreCell#ScoreCell',
        },
      },
    },
    {
      name: 'answers',
      type: 'array',
      label: 'Respuestas',
      admin: {
        description: 'Respuestas detalladas proporcionadas por el candidato.',
      },
      fields: [
        {
          name: 'section',
          type: 'text',
          label: 'Sección',
          admin: {
            description: 'Sección a la que pertenece esta pregunta (ej. 1. Información General).',
            readOnly: true,
          },
        },
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
        },
        {
          name: 'answerText',
          type: 'text',
          label: 'Respuesta',
        },
        {
          name: 'explanation',
          type: 'textarea',
          label: 'Explicación / Detalle del Candidato',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.explanation),
            description: 'Detalle o justificación proporcionada por el candidato para esta respuesta.',
          },
        },
        {
          name: 'score',
          type: 'number',
          label: 'Puntos Obtenidos',
          admin: {
            condition: (data, siblingData) => typeof siblingData?.score === 'number',
          }
        },
        {
          name: 'attachment',
          type: 'upload',
          relationTo: 'media',
          label: 'Archivo Adjunto',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.attachment),
          }
        },
      ],
    },
  ],
}
