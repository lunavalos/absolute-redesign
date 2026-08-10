import type { CollectionConfig } from 'payload'


export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  access: {
    create: () => true, // Allow candidates to submit applications
    read: () => true,   // Only admins should really read this, but for now we'll allow it (Payload auth handles it if configured)
  },
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicantName', 'email', 'totalScore', 'createdAt'],
    description: 'Respuestas a los cuestionarios de empleo.',
    components: {
      Icon: '../components/NavIcons#JobApplicationIcon',
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
      label: 'Nombre del Candidato',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Correo Electrónico',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Teléfono',
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
