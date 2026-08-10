import { BlogPostDoc, PayloadResponse } from './types';

export const mockBlogData: PayloadResponse<BlogPostDoc> = {
  docs: [
    {
      id: 'blog-1',
      slug: 'optimizing-us-mexico-cross-border-ftl-freight',
      title: {
        en: 'Optimizing US–Mexico Cross-Border FTL Freight: Strategies for 2026',
        es: 'Optimización de Fletes FTL México–EE. UU.: Estrategias para 2026'
      },
      excerpt: {
        en: 'Learn how door-to-door FTL logistics, transfer-free border crossings, and C-TPAT security certification minimize port delays at Laredo, Texas.',
        es: 'Descubra cómo la logística FTL puerta a puerta, los cruces sin transbordo y la certificación C-TPAT minimizan demoras en Laredo, Texas.'
      },
      heroImage: {
        id: 'img-b1',
        url: '/images/red-trucks-01.jpg',
        alt: 'Cross-Border Trucking'
      },
      content: [
        {
          blockType: 'richText',
          html: {
            en: '<p>Cross-border trade between Mexico and the United States continues to reach historic volumes. As nearshoring accelerates manufacturing growth across Northern and Central Mexico, logistics efficiency has become the primary competitive differentiator for global supply chains.</p><h2>The Advantage of Door-to-Door FTL Transportation</h2><p>Traditional transloading at the border often introduces unnecessary risks, including double handling of freight, higher potential for cargo damage, and administrative bottlenecks. By utilizing a continuous <strong>Door-to-Door Full Truckload (FTL)</strong> model, cargo remains secured in the same 53ft dry van from pickup at the factory in Mexico to delivery at the US warehouse.</p><h2>Why Laredo, Texas Matters</h2><p>Laredo, TX handles over 40% of all commercial land traffic between Mexico and the US. Operating out of a dedicated terminal in Laredo equips Absolute Group with immediate response times, direct interchange agreements, and 24/7 dispatch flexibility.</p><h2>C-TPAT & CVSA Security Mandates</h2><p>Security is non-negotiable in international freight. C-TPAT validation guarantees fast-track customs lanes (FAST lanes) and significantly reduced physical inspection rates, shaving hours off border crossing times.</p>',
            es: '<p>El comercio transfronterizo entre México y los Estados Unidos continúa alcanzando volúmenes históricos. A medida que el nearshoring acelera el crecimiento manufacturero, la eficiencia logística se ha convertido en el principal diferenciador competitivo.</p><h2>La Ventaja del Transporte FTL Puerta a Puerta</h2><p>El transbordo tradicional en frontera a menudo introduce riesgos innecesarios, incluyendo doble manipulación de mercancía y embotellamientos administrativos. Al utilizar un modelo continuo de <strong>Camión Completo (FTL) Puerta a Puerta</strong>, la carga permanece segura en la misma caja de 53 pies desde la recolección en fábrica hasta la entrega final.</p><h2>Por qué Laredo, Texas es Crucial</h2><p>Laredo, TX gestiona más del 40% del tráfico terrestre comercial entre México y EE. UU. Operar desde una terminal dedicada en Laredo brinda a Absolute Group tiempos de respuesta inmediatos y monitoreo 24/7.</p><h2>Certificaciones de Seguridad C-TPAT y CVSA</h2><p>La seguridad no es negociable en el flete internacional. La validación C-TPAT garantiza acceso a carriles exprés (carriles FAST) y tasas de inspección física drásticamente reducidas.</p>'
          }
        }
      ],
      author: {
        id: 'author-1',
        name: 'Manuel Luna',
        avatar: {
          id: 'author-img-1',
          url: '/images/crew-working.jpg',
          alt: 'Manuel Luna'
        }
      },
      category: {
        id: 'cat-1',
        name: 'Cross-Border'
      },
      tags: [
        { id: 'tag-1', name: 'Logistics' },
        { id: 'tag-2', name: 'FTL' }
      ],
      tenant: {
        id: 'tenant-1',
        name: 'Absolute Group'
      },
      publishedAt: '2026-07-15T09:00:00.000Z',
      readingTimeMinutes: 5,
      featuredPost: true,
      meta: {
        title: 'Optimizing US–Mexico Cross-Border FTL Freight',
        description: 'Learn how door-to-door FTL logistics and C-TPAT certification minimize port delays.'
      }
    }
  ],
  totalDocs: 1,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
};
