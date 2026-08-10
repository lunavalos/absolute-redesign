export interface Certification {
  id: string;
  name: string;
  badgeUrl: string;
  description: {
    en: string;
    es: string;
  };
}

export const mockCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'C-TPAT Security Certified',
    badgeUrl: '/images/Certifications/cert-badge-1.jpg',
    description: {
      en: 'Customs-Trade Partnership Against Terrorism tier validation for expedited FAST lane clearance.',
      es: 'Validación C-TPAT para cruce preferencial rápido por carriles FAST.'
    }
  },
  {
    id: 'cert-2',
    name: 'CVSA Alliance Inspected',
    badgeUrl: '/images/Certifications/cvsa.jpg',
    description: {
      en: 'Commercial Vehicle Safety Alliance standard fleet compliance and pre-trip mechanical checks.',
      es: 'Cumplimiento mecánico de flota e inspecciones bajo la Alianza de Seguridad de Vehículos Comerciales.'
    }
  },
  {
    id: 'cert-3',
    name: 'US DOT & FMCSA Licensed',
    badgeUrl: '/images/Certifications/cert-badge-2.jpg',
    description: {
      en: 'Full motor carrier operating authority across all 48 contiguous US states.',
      es: 'Autoridad operativa completa de autotransporte en los 48 estados contiguos de EE. UU.'
    }
  },
  {
    id: 'cert-4',
    name: 'Standard Carrier Alpha Code (SCAC)',
    badgeUrl: '/images/Certifications/cert-badge-3.jpg',
    description: {
      en: 'Registered identification code for seamless intermodal freight documentation.',
      es: 'Código de identificación registrado para documentación fletaria intermodal fluida.'
    }
  },
  {
    id: 'cert-5',
    name: 'Satellite GPS Perimeter Security',
    badgeUrl: '/images/Certifications/cert-badge-4.jpg',
    description: {
      en: '24/7 active geofencing and real-time remote monitoring on all 53ft dry vans.',
      es: 'Monitoreo remoto 24/7 y geocercas activas en todas las unidades y remolques de 53 pies.'
    }
  }
];
