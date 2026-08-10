import { PayloadResponse, ReelDoc } from './types';

export const mockReelsData: PayloadResponse<ReelDoc> = {
  docs: [
    {
      id: 'reel-1',
      title: {
        en: 'Cross-Border Fleet in Motion',
        es: 'Flota Transfronteriza en Movimiento'
      },
      description: {
        en: 'Watch our state-of-the-art power units departing our Laredo, TX terminal towards major US manufacturing hubs.',
        es: 'Mira nuestras unidades de última generación saliendo de nuestra terminal en Laredo, TX hacia los centros industriales de EE. UU.'
      },
      youtubeLink: 'https://www.youtube.com/embed/ScMzIvxBSi4', // Example link
      coverImage: {
        id: 'thumb-1',
        url: '/images/new-truck-01.jpg',
        alt: 'Truck Fleet Thumbnail'
      }
    },
    {
      id: 'reel-2',
      title: {
        en: 'Seamless Border Crossing at Laredo Port',
        es: 'Cruce Fronterizo Fluido en el Puerto de Laredo'
      },
      description: {
        en: 'Fast customs clearance and certified transfer drivers navigating commercial border lanes smoothly.',
        es: 'Despacho aduanal rápido y conductores de transfer certificados transitando ágilmente por los carriles comerciales.'
      },
      youtubeLink: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      coverImage: {
        id: 'thumb-2',
        url: '/images/red-trucks-01.jpg',
        alt: 'Border Crossing Thumbnail'
      }
    },
    {
      id: 'reel-3',
      title: {
        en: '24/7 Terminal Perimeter & GPS Monitoring',
        es: 'Monitoreo Perimetral y GPS 24/7 en Terminal'
      },
      description: {
        en: 'How our dispatch center monitors 100% of equipment in real-time for zero cargo tampering.',
        es: 'Cómo nuestro centro de monitoreo supervisa el 100% de los equipos en tiempo real para garantizar cero alteración de carga.'
      },
      youtubeLink: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      coverImage: {
        id: 'thumb-3',
        url: '/images/controlled-access.jpg',
        alt: 'Security Monitoring Thumbnail'
      }
    },
    {
      id: 'reel-4',
      title: {
        en: 'Dedicated Maintenance & Inspection Routines',
        es: 'Rutinas de Mantenimiento e Inspección Dedicadas'
      },
      description: {
        en: 'Rigorous CVSA standard pre-trip inspections to guarantee 99.8% on-time delivery.',
        es: 'Rigurosas inspecciones de viaje bajo estándares CVSA para garantizar un 99.8% de entregas a tiempo.'
      },
      youtubeLink: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      coverImage: {
        id: 'thumb-4',
        url: '/images/driving.jpg',
        alt: 'Maintenance Thumbnail'
      }
    }
  ],
  totalDocs: 4,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
};
