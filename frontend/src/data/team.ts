import { PayloadResponse, TeamMemberDoc } from './types';

export const mockTeamData: any = {
  docs: [
    {
      id: 'team-1',
      name: 'Manuel Luna',
      position: {
        en: 'Chief Executive Officer & Founder',
        es: 'Director Ejecutivo y Fundador'
      },
      photo: {
        id: 'photo-1',
        url: '/images/crew-working.jpg',
        alt: 'Manuel Luna - CEO Absolute Group'
      },
      email: 'm.luna@absolute-fi.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'team-2',
      name: 'Carlos Rodríguez',
      position: {
        en: 'VP of Cross-Border Operations',
        es: 'Vicepresidente de Operaciones Transfronterizas'
      },
      photo: {
        id: 'photo-2',
        url: '/images/safety-01.jpg',
        alt: 'Carlos Rodríguez - VP Operations'
      },
      email: 'c.rodriguez@absolute-fi.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'team-3',
      name: 'Sofia Martínez',
      position: {
        en: 'Director of Safety & C-TPAT Compliance',
        es: 'Directora de Seguridad y Cumplimiento C-TPAT'
      },
      photo: {
        id: 'photo-3',
        url: '/images/revision.jpg',
        alt: 'Sofia Martínez - Safety Director'
      },
      email: 's.martinez@absolute-fi.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'team-4',
      name: 'Roberto Hernández',
      position: {
        en: 'Head of Fleet Maintenance & Infrastructure',
        es: 'Jefe de Mantenimiento de Flota e Infraestructura'
      },
      photo: {
        id: 'photo-4',
        url: '/images/working.jpg',
        alt: 'Roberto Hernández - Fleet Maintenance'
      },
      email: 'r.hernandez@absolute-fi.com',
      linkedin: 'https://linkedin.com'
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
