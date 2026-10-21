import { CollectionConfig } from 'payload'

export const SatisfactionSurveys: CollectionConfig = {
  slug: 'satisfaction-surveys',
  access: {
    create: () => true, // Permite que los clientes envíen sus respuestas desde la web
    read: () => true,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'company', 'assistedBy', 'serviceSatisfaction', 'recommendation', 'createdAt'],
    description: 'Respuestas de clientes al cuestionario de satisfacción recibido desde QR o enlace web.',
  },
  labels: {
    singular: 'Encuesta de Satisfacción',
    plural: 'Encuestas de Satisfacción',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nombre Completo / Full Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Empresa / Company',
    },
    {
      name: 'assistedBy',
      type: 'text',
      label: 'Persona de Absolute que lo atendió / Assisted By',
    },
    {
      name: 'serviceSatisfaction',
      type: 'select',
      required: true,
      label: 'Satisfacción con el servicio recibido',
      options: [
        { label: 'Very satisfied (Muy satisfecho)', value: 'Very satisfied' },
        { label: 'Satisfied (Satisfecho)', value: 'Satisfied' },
        { label: 'Neutral', value: 'Neutral' },
        { label: 'Dissatisfied (Insatisfecho)', value: 'Dissatisfied' },
        { label: 'Very dissatisfied (Muy insatisfecho)', value: 'Very dissatisfied' },
      ],
    },
    {
      name: 'expectationsMet',
      type: 'select',
      required: true,
      label: 'Cumplimiento de expectativas',
      options: [
        { label: 'Far exceeded (Superó con creces)', value: 'Far exceeded' },
        { label: 'Exceeded (Superó expectativas)', value: 'Exceeded' },
        { label: 'Met expectations (Cumplió expectativas)', value: 'Met expectations' },
        { label: 'Below expectations (Por debajo de lo esperado)', value: 'Below expectations' },
        { label: 'Far below expectations (Muy por debajo)', value: 'Far below expectations' },
      ],
    },
    {
      name: 'supportQuality',
      type: 'select',
      required: true,
      label: 'Soporte recibido por el equipo',
      options: [
        { label: 'Yes, the support was excellent (Soporte excelente)', value: 'Yes, the support was excellent' },
        { label: 'Yes, I received adequate support (Soporte adecuado)', value: 'Yes, I received adequate support' },
        { label: 'I received limited support (Soporte limitado)', value: 'I received limited support' },
        { label: 'No, I did not receive support (No recibí soporte)', value: 'No, I did not receive support' },
      ],
    },
    {
      name: 'futureUse',
      type: 'select',
      required: true,
      label: '¿Usaría los servicios de Absolute para futuros envíos?',
      options: [
        { label: 'Yes, definitely (Sí, definitivamente)', value: 'Yes, definitely' },
        { label: 'Maybe (Tal vez)', value: 'Maybe' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      name: 'recommendation',
      type: 'select',
      required: true,
      label: '¿Recomendaría Absolute a otros colegas o empresas?',
      options: [
        { label: 'Yes (Sí)', value: 'Yes' },
        { label: 'Maybe (Tal vez)', value: 'Maybe' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      name: 'feedback',
      type: 'textarea',
      label: 'Sugerencias de mejora / Comentarios adicionales',
    },
  ],
}
