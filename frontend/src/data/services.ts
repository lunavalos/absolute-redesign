import type { Localized } from '../lib/seo';
import { serviceSlugs, type ServiceId } from './serviceSlugs';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDoc {
  id: ServiceId;
  /** URL slug under /services (en) and /servicios (es). */
  slug: Localized;
  /** Short name used in cards, breadcrumbs and schema. */
  name: Localized;
  /** Card heading on the /services grid. */
  title: Localized;
  sub: Localized;
  desc: Localized;
  /** Detail page <h1> and SEO fields — written around the search terms each page targets. */
  h1: Localized;
  metaTitle: Localized;
  metaDescription: Localized;
  keywords: Localized<string[]>;
  intro: Localized<string[]>;
  benefits: Localized<string[]>;
  faqs: Localized<ServiceFaq[]>;
  image: string;
}

export const services: ServiceDoc[] = [
  {
    id: 'ftl',
    slug: serviceSlugs.ftl,
    name: { en: 'Full Truckload (FTL)', es: 'Carga Completa (FTL)' },
    title: { en: 'TRUCKLOAD / DEDICATED DRY VAN', es: 'CARGA COMPLETA / CAJA SECA DEDICADA' },
    sub: {
      en: 'Whether you have a full truckload of goods or need a dedicated dry van, Absolute Group has got you covered.',
      es: 'Ya sea que tenga un camión completo de mercancías o necesite una caja seca dedicada, Absolute Group lo tiene cubierto.'
    },
    desc: {
      en: 'Our fleet of state-of-the-art trucks and vans are equipped to handle large volumes of cargo, ensuring they remain protected from external elements. With our reliable drivers and advanced tracking systems, you can be confident that your shipment will arrive at its destination safely and on schedule.',
      es: 'Nuestra flota de camiones y camionetas de última generación está equipada para manejar grandes volúmenes de carga, asegurando que permanezcan protegidos de elementos externos. Con nuestros conductores confiables y sistemas de rastreo avanzados, puede estar seguro de que su envío llegará a su destino de manera segura y a tiempo.'
    },
    h1: {
      en: 'Full Truckload (FTL) Freight Between Mexico and the USA',
      es: 'Transporte de Carga Completa (FTL) entre México y Estados Unidos'
    },
    metaTitle: {
      en: 'Full Truckload (FTL) Shipping Mexico–USA | Dry Van',
      es: 'Transporte de Carga Completa (FTL) México–EE. UU.'
    },
    metaDescription: {
      en: 'Full truckload (FTL) and dedicated 53 ft dry van service between Mexico and the U.S. Asset-based carrier in Laredo, TX with 24/7 satellite tracking. Get a quote.',
      es: 'Servicio de carga completa (FTL) y caja seca dedicada de 53 pies entre México y EE. UU. Transportista con flota propia en Laredo, TX y rastreo satelital 24/7. Cotice hoy.'
    },
    keywords: {
      en: ['full truckload', 'FTL freight', 'full truck load Mexico USA', 'dedicated dry van', '53 ft dry van', 'FTL carrier Laredo'],
      es: ['carga completa', 'transporte FTL', 'caja seca dedicada', 'caja seca 53 pies', 'flete México Estados Unidos', 'transportista Laredo']
    },
    intro: {
      en: [
        'When your freight fills a trailer, a dedicated full truckload (FTL) is the fastest and safest way to move it. Your cargo travels in one sealed 53 ft dry van from pickup to delivery, with no consolidation stops and no shared space with other shippers.',
        'Absolute Group operates its own fleet of more than 200 power units from Laredo, Texas, the busiest commercial land port between Mexico and the United States. That means capacity we control, drivers we train, and one point of contact for the whole move.'
      ],
      es: [
        'Cuando su mercancía llena un remolque, una carga completa (FTL) dedicada es la forma más rápida y segura de moverla. Su carga viaja en una sola caja seca de 53 pies sellada desde la recolección hasta la entrega, sin paradas de consolidación y sin compartir espacio con otros embarcadores.',
        'Absolute Group opera su propia flota de más de 200 tractocamiones desde Laredo, Texas, el puerto terrestre comercial con mayor movimiento entre México y Estados Unidos. Eso significa capacidad que controlamos, operadores que capacitamos y un solo punto de contacto para todo el servicio.'
      ]
    },
    benefits: {
      en: [
        'Dedicated 53 ft dry vans for your freight only',
        'Asset-based capacity: our trucks, our drivers',
        '24/7 satellite tracking and dispatch monitoring',
        'C-TPAT certified security from origin to destination'
      ],
      es: [
        'Cajas secas de 53 pies dedicadas solo a su carga',
        'Capacidad con flota propia: nuestros camiones, nuestros operadores',
        'Rastreo satelital y monitoreo de despacho 24/7',
        'Seguridad certificada C-TPAT de origen a destino'
      ]
    },
    faqs: {
      en: [
        {
          q: 'What is full truckload (FTL) shipping?',
          a: 'Full truckload shipping means one shipper uses an entire trailer. The freight is loaded once and delivered directly, which reduces handling, transit time and the risk of damage compared with less-than-truckload (LTL).'
        },
        {
          q: 'Do you offer FTL between Mexico and the United States?',
          a: 'Yes. Absolute Group moves full truckloads in both directions between Mexico and the U.S., crossing through Laredo, Texas, and can haul the same trailer door to door without transloading at the border.'
        },
        {
          q: 'What equipment do you use for full truckload freight?',
          a: 'We run 53 ft dry vans pulled by our own fleet of more than 200 power units, all monitored 24/7 with satellite tracking.'
        }
      ],
      es: [
        {
          q: '¿Qué es el transporte de carga completa (FTL)?',
          a: 'La carga completa (Full Truckload) significa que un solo embarcador utiliza todo el remolque. La mercancía se carga una vez y se entrega directamente, lo que reduce maniobras, tiempos de tránsito y riesgo de daños frente a la carga consolidada (LTL).'
        },
        {
          q: '¿Ofrecen carga completa entre México y Estados Unidos?',
          a: 'Sí. Absolute Group mueve cargas completas en ambos sentidos entre México y EE. UU., cruzando por Laredo, Texas, y puede llevar la misma caja puerta a puerta sin transbordo en la frontera.'
        },
        {
          q: '¿Qué equipo utilizan para la carga completa?',
          a: 'Operamos cajas secas de 53 pies con nuestra propia flota de más de 200 tractocamiones, monitoreados 24/7 con rastreo satelital.'
        }
      ]
    },
    image: '/images/new-truck-01.jpg'
  },
  {
    id: 'crossBorder',
    slug: serviceSlugs.crossBorder,
    name: { en: 'Cross-Border Freight', es: 'Carga Transfronteriza' },
    title: { en: 'BORDER CROSSING', es: 'CRUCE FRONTERIZO' },
    sub: {
      en: 'We are able to provide border crossing services, avoiding having 3rd party transfers.',
      es: 'Podemos proporcionar servicios de cruce fronterizo, evitando transferencias con terceros.'
    },
    desc: {
      en: "Navigating the complexities of international shipping can be daunting, but with Absolute Group's Border Crossing service, you can rest easy. Our expert team is well-versed in customs procedures, and regulations. We ensure a smooth and swift passage of your goods across borders, minimizing delays and ensuring compliance with all international laws and regulations.",
      es: 'Navegar por las complejidades del envío internacional puede ser abrumador, pero con el servicio de Cruce Fronterizo de Absolute Group, puede estar tranquilo. Nuestro equipo experto está bien versado en procedimientos aduanales y regulaciones. Aseguramos un paso fluido y rápido de sus mercancías a través de las fronteras, minimizando retrasos y garantizando el cumplimiento de todas las leyes y regulaciones internacionales.'
    },
    h1: {
      en: 'Cross-Border Freight & Border Crossing Services in Laredo, TX',
      es: 'Servicios de Carga Transfronteriza y Cruce Fronterizo en Laredo, TX'
    },
    metaTitle: {
      en: 'Cross-Border Freight Services Mexico–USA | Laredo, TX',
      es: 'Carga Transfronteriza y Cruce Fronterizo | Laredo, TX'
    },
    metaDescription: {
      en: 'Cross-border freight and border crossing services between Mexico and the U.S. through Laredo, TX. C-TPAT certified, FAST lane ready, no third-party transfers.',
      es: 'Servicios de carga transfronteriza y cruce fronterizo México–EE. UU. por Laredo, TX. Certificación C-TPAT, carriles FAST y sin transferencias con terceros.'
    },
    keywords: {
      en: ['cross-border freight', 'cross-border trucking', 'border crossing services', 'Mexico USA freight', 'Laredo cross-border carrier', 'C-TPAT carrier'],
      es: ['carga transfronteriza', 'cruce fronterizo', 'transporte México Estados Unidos', 'transfer Laredo', 'logística transfronteriza', 'transportista C-TPAT']
    },
    intro: {
      en: [
        'Cross-border freight is where most delays, damage and extra costs happen. Every time a load changes hands between a Mexican carrier, a transfer driver and a U.S. carrier, you add risk and lose visibility.',
        'Absolute Group handles the border crossing itself through Laredo, Texas, so your load does not depend on third-party transfer companies. Our C-TPAT certification gives us access to FAST lanes, and our team coordinates with your customs brokers on both sides to keep paperwork and timing aligned.'
      ],
      es: [
        'La carga transfronteriza es donde ocurren la mayoría de los retrasos, daños y costos extra. Cada vez que una carga cambia de manos entre un transportista mexicano, un transfer y un transportista estadounidense, se suma riesgo y se pierde visibilidad.',
        'Absolute Group realiza el cruce fronterizo directamente por Laredo, Texas, por lo que su carga no depende de empresas de transfer externas. Nuestra certificación C-TPAT nos da acceso a carriles FAST y nuestro equipo coordina con sus agentes aduanales de ambos lados para mantener documentos y tiempos alineados.'
      ]
    },
    benefits: {
      en: [
        'No third-party transfer handoffs at the border',
        'C-TPAT certified with FAST lane access',
        'Coordination with U.S. and Mexican customs brokers',
        'Operations based at the Laredo, TX port of entry'
      ],
      es: [
        'Sin transferencias con terceros en la frontera',
        'Certificación C-TPAT con acceso a carriles FAST',
        'Coordinación con agentes aduanales de EE. UU. y México',
        'Operaciones en el puerto de entrada de Laredo, TX'
      ]
    },
    faqs: {
      en: [
        {
          q: 'How does cross-border trucking between Mexico and the U.S. work?',
          a: 'Freight is picked up in one country, cleared through customs at a port of entry such as Laredo, Texas, and delivered in the other. Absolute Group can carry the trailer across the border itself, avoiding extra transfers between carriers.'
        },
        {
          q: 'Why does C-TPAT certification matter for cross-border freight?',
          a: 'C-TPAT is a U.S. Customs and Border Protection security program. Certified carriers are eligible for FAST lanes, which typically means fewer inspections and shorter wait times at the border.'
        },
        {
          q: 'Which border crossing do you use?',
          a: 'Our operations are based in Laredo, Texas, the largest commercial land port between Mexico and the United States.'
        }
      ],
      es: [
        {
          q: '¿Cómo funciona el transporte transfronterizo entre México y EE. UU.?',
          a: 'La mercancía se recolecta en un país, se despacha en aduana en un puerto de entrada como Laredo, Texas, y se entrega en el otro. Absolute Group puede cruzar la caja directamente, evitando transferencias adicionales entre transportistas.'
        },
        {
          q: '¿Por qué importa la certificación C-TPAT en la carga transfronteriza?',
          a: 'C-TPAT es un programa de seguridad de la Oficina de Aduanas y Protección Fronteriza de EE. UU. (CBP). Los transportistas certificados pueden usar carriles FAST, lo que normalmente significa menos inspecciones y menos tiempo de espera en la frontera.'
        },
        {
          q: '¿Por qué cruce fronterizo operan?',
          a: 'Nuestras operaciones están en Laredo, Texas, el puerto terrestre comercial más grande entre México y Estados Unidos.'
        }
      ]
    },
    image: '/images/driving.jpg'
  },
  {
    id: 'doorToDoor',
    slug: serviceSlugs.doorToDoor,
    name: { en: 'Door-to-Door Freight', es: 'Carga Puerta a Puerta' },
    title: { en: 'DOOR 2 DOOR FREIGHT SERVICES', es: 'SERVICIOS DE CARGA PUERTA A PUERTA' },
    sub: {
      en: 'Save transloading costs by loading our dry vans in Mx and hauling them directly into the US.',
      es: 'Ahorre costos de transbordo cargando nuestras cajas secas en México y transportándolas directamente a los EE. UU.'
    },
    desc: {
      en: "Absolute Group's Door 2 Door Freight Services offer a hassle-free transportation solution, ensuring that your goods are picked up directly from the sender's location and delivered seamlessly to the receiver's doorstep. With our comprehensive network and skilled team, we prioritize safety, punctuality, and efficiency, ensuring your freight reaches its destination in perfect condition and on time.",
      es: 'Los Servicios de Carga Puerta a Puerta de Absolute Group ofrecen una solución de transporte sin complicaciones, asegurando que sus mercancías sean recogidas directamente en la ubicación del remitente y entregadas sin problemas en la puerta del destinatario. Con nuestra red integral y equipo capacitado, priorizamos la seguridad, puntualidad y eficiencia, asegurando que su carga llegue a su destino en perfectas condiciones y a tiempo.'
    },
    h1: {
      en: 'Door-to-Door Freight from Mexico to the United States',
      es: 'Carga Puerta a Puerta de México a Estados Unidos'
    },
    metaTitle: {
      en: 'Door-to-Door Freight Mexico to USA | No Transloading',
      es: 'Flete Puerta a Puerta México–EE. UU. | Sin Transbordo'
    },
    metaDescription: {
      en: 'Door-to-door freight from Mexico to the U.S. in the same dry van. Skip transloading costs and border handoffs with Absolute Group, a C-TPAT certified carrier.',
      es: 'Flete puerta a puerta de México a EE. UU. en la misma caja seca. Evite costos de transbordo y maniobras en frontera con Absolute Group, transportista C-TPAT.'
    },
    keywords: {
      en: ['door to door freight', 'door-to-door Mexico USA', 'through trailer service', 'no transloading', 'Mexico to US trucking'],
      es: ['carga puerta a puerta', 'flete puerta a puerta México', 'servicio sin transbordo', 'transporte México a Estados Unidos']
    },
    intro: {
      en: [
        'With door-to-door service, your freight is loaded into our dry van at your plant in Mexico and stays in that same trailer until it reaches your customer in the United States.',
        'Removing the transload step at the border saves handling costs, cuts the risk of damage or loss, and shortens total transit time. You get a single carrier responsible for the full route and one tracking feed from pickup to delivery.'
      ],
      es: [
        'Con el servicio puerta a puerta, su mercancía se carga en nuestra caja seca en su planta en México y permanece en ese mismo remolque hasta llegar a su cliente en Estados Unidos.',
        'Eliminar el transbordo en la frontera ahorra costos de maniobras, reduce el riesgo de daños o pérdidas y acorta el tiempo total de tránsito. Usted tiene un solo transportista responsable de toda la ruta y un solo rastreo desde la recolección hasta la entrega.'
      ]
    },
    benefits: {
      en: [
        'Same trailer from pickup in Mexico to delivery in the U.S.',
        'No transloading fees at the border',
        'Less handling means less damage and loss',
        'One carrier and one tracking feed for the full route'
      ],
      es: [
        'La misma caja desde la recolección en México hasta la entrega en EE. UU.',
        'Sin costos de transbordo en la frontera',
        'Menos maniobras significa menos daños y pérdidas',
        'Un solo transportista y un solo rastreo para toda la ruta'
      ]
    },
    faqs: {
      en: [
        {
          q: 'What is door-to-door freight between Mexico and the U.S.?',
          a: 'It is a service where the same trailer is loaded at the shipper in Mexico and delivered to the receiver in the U.S. without transloading the cargo into another trailer at the border.'
        },
        {
          q: 'How does door-to-door service reduce costs?',
          a: 'It removes transloading fees, cuts handling-related damage claims and shortens transit time, which also lowers inventory carrying costs.'
        }
      ],
      es: [
        {
          q: '¿Qué es la carga puerta a puerta entre México y EE. UU.?',
          a: 'Es un servicio donde la misma caja se carga con el embarcador en México y se entrega al destinatario en EE. UU. sin transbordar la mercancía a otro remolque en la frontera.'
        },
        {
          q: '¿Cómo reduce costos el servicio puerta a puerta?',
          a: 'Elimina los cargos de transbordo, reduce reclamaciones por daños en maniobras y acorta el tiempo de tránsito, lo que también disminuye el costo de inventario en tránsito.'
        }
      ]
    },
    image: '/images/red-trucks-01.jpg'
  },
  {
    id: 'expedited',
    slug: serviceSlugs.expedited,
    name: { en: 'Expedited Freight', es: 'Carga Expedita' },
    title: { en: 'EXPEDITE SERVICE', es: 'SERVICIO EXPEDITO' },
    sub: {
      en: 'Providing on time and expedited services along with our newest trucks on fleet.',
      es: 'Brindando servicios puntuales y expeditos junto con nuestros camiones más nuevos en la flota.'
    },
    desc: {
      en: "For those times when you need something delivered urgently, Absolute Group's Expedite Service is your best choice. We understand the importance of time-sensitive shipments, and our dedicated team works round the clock to ensure your cargo reaches its destination as quickly as possible, without compromising on safety or quality.",
      es: 'Para aquellas ocasiones en que necesita entregar algo con urgencia, el Servicio Expedito de Absolute Group es su mejor opción. Entendemos la importancia de los envíos sensibles al tiempo, y nuestro equipo dedicado trabaja las 24 horas del día para asegurar que su carga llegue a su destino lo más rápido posible, sin comprometer la seguridad o la calidad.'
    },
    h1: {
      en: 'Expedited & Time-Critical Freight Across the U.S.–Mexico Border',
      es: 'Carga Expedita y de Tiempo Crítico entre México y EE. UU.'
    },
    metaTitle: {
      en: 'Expedited Freight Mexico–USA | Team Drivers 24/7',
      es: 'Carga Expedita México–EE. UU. | Doble Operador 24/7'
    },
    metaDescription: {
      en: 'Expedited, time-critical freight between Mexico and the U.S. with dual-driver teams, our newest trucks and 24/7 priority dispatch from Laredo, TX.',
      es: 'Carga expedita y de tiempo crítico entre México y EE. UU. con doble operador, nuestros camiones más nuevos y despacho prioritario 24/7 desde Laredo, TX.'
    },
    keywords: {
      en: ['expedited freight', 'expedited trucking Mexico', 'time-critical freight', 'team drivers', 'hot shipment cross-border'],
      es: ['carga expedita', 'servicio expedito', 'flete urgente México Estados Unidos', 'doble operador', 'carga de tiempo crítico']
    },
    intro: {
      en: [
        'A line-down situation or a missed production window cannot wait for a standard transit time. Our expedited service is built for shipments where every hour counts.',
        'We assign our newest trucks, dual-driver teams that keep the load moving, and dispatchers who monitor the shipment 24/7 until it is delivered.'
      ],
      es: [
        'Una línea de producción detenida o una ventana de entrega perdida no pueden esperar un tiempo de tránsito estándar. Nuestro servicio expedito está diseñado para envíos donde cada hora cuenta.',
        'Asignamos nuestros camiones más nuevos, equipos de doble operador que mantienen la carga en movimiento y despachadores que monitorean el envío 24/7 hasta su entrega.'
      ]
    },
    benefits: {
      en: [
        'Dual-driver teams for non-stop transit',
        'Our newest trucks assigned to urgent loads',
        '24/7 priority dispatch and proactive updates',
        'Cross-border capability with C-TPAT security'
      ],
      es: [
        'Equipos de doble operador para tránsito continuo',
        'Nuestros camiones más nuevos para cargas urgentes',
        'Despacho prioritario 24/7 y actualizaciones proactivas',
        'Capacidad transfronteriza con seguridad C-TPAT'
      ]
    },
    faqs: {
      en: [
        {
          q: 'When should I use expedited freight?',
          a: 'Use expedited service for time-critical shipments such as production parts for a line-down situation, urgent customer orders, or freight that missed its original departure.'
        },
        {
          q: 'What makes expedited service faster?',
          a: 'Dual-driver teams can keep the truck moving while staying within hours-of-service rules, and the load gets priority dispatch with 24/7 monitoring.'
        }
      ],
      es: [
        {
          q: '¿Cuándo debo usar carga expedita?',
          a: 'Úsela para envíos de tiempo crítico, como refacciones para una línea de producción detenida, pedidos urgentes de clientes o carga que perdió su salida original.'
        },
        {
          q: '¿Qué hace más rápido el servicio expedito?',
          a: 'Los equipos de doble operador mantienen el camión en movimiento respetando las horas de servicio, y la carga recibe despacho prioritario con monitoreo 24/7.'
        }
      ]
    },
    image: '/images/new-truck-2.jpg'
  },
  {
    id: 'warehousing',
    slug: serviceSlugs.warehousing,
    name: { en: 'Warehousing & Cross-Docking', es: 'Almacenaje y Cross-Docking' },
    title: { en: 'WAREHOUSE FACILITY', es: 'INSTALACIONES DE ALMACENAMIENTO' },
    sub: {
      en: 'We provide cross-docking services, storage, loading and unloading.',
      es: 'Proporcionamos servicios de cross-docking, almacenamiento, carga y descarga.'
    },
    desc: {
      en: 'Storage is an essential component of the logistics process, and Absolute Group offers a secure, spacious, and organized environment for your goods. Our modern facilities are equipped with advanced inventory management systems, ensuring easy access, tracking, and retrieval of your products whenever you need them.',
      es: 'El almacenamiento es un componente esencial del proceso logístico, y Absolute Group ofrece un entorno seguro, espacioso y organizado para sus mercancías. Nuestras modernas instalaciones están equipadas con sistemas avanzados de gestión de inventario, asegurando un fácil acceso, seguimiento y recuperación de sus productos siempre que los necesite.'
    },
    h1: {
      en: 'Warehousing & Cross-Docking in Laredo, Texas',
      es: 'Almacenaje y Cross-Docking en Laredo, Texas'
    },
    metaTitle: {
      en: 'Warehousing & Cross-Docking in Laredo, TX',
      es: 'Almacenaje y Cross-Docking en Laredo, TX'
    },
    metaDescription: {
      en: 'Secure warehousing, cross-docking, storage, loading and unloading in Laredo, TX for cross-border freight between Mexico and the U.S.',
      es: 'Almacenaje seguro, cross-docking, carga y descarga en Laredo, TX para mercancía transfronteriza entre México y EE. UU.'
    },
    keywords: {
      en: ['warehousing Laredo TX', 'cross-docking Laredo', 'border warehouse', 'storage Laredo Texas'],
      es: ['almacenaje Laredo', 'cross-docking Laredo', 'bodega en la frontera', 'almacén Laredo Texas']
    },
    intro: {
      en: [
        'A warehouse at the border gives you flexibility: hold inventory close to your customers, consolidate loads, or stage freight while paperwork clears.',
        'Our Laredo, Texas facility offers secure storage, cross-docking, and loading and unloading, connected directly to our own trucking fleet.'
      ],
      es: [
        'Un almacén en la frontera le da flexibilidad: mantener inventario cerca de sus clientes, consolidar cargas o resguardar mercancía mientras se liberan los documentos.',
        'Nuestras instalaciones en Laredo, Texas ofrecen almacenaje seguro, cross-docking, carga y descarga, conectadas directamente con nuestra propia flota.'
      ]
    },
    benefits: {
      en: [
        'Secure storage at the Laredo, TX border',
        'Cross-docking and load consolidation',
        'Loading and unloading services',
        'Inventory management and tracking'
      ],
      es: [
        'Almacenaje seguro en la frontera de Laredo, TX',
        'Cross-docking y consolidación de carga',
        'Servicios de carga y descarga',
        'Gestión y seguimiento de inventario'
      ]
    },
    faqs: {
      en: [
        {
          q: 'What is cross-docking?',
          a: 'Cross-docking moves freight from an inbound trailer to an outbound trailer with little or no storage time, which speeds up distribution and reduces warehousing costs.'
        }
      ],
      es: [
        {
          q: '¿Qué es el cross-docking?',
          a: 'El cross-docking transfiere la mercancía de un remolque de entrada a uno de salida con poco o ningún tiempo de almacenaje, lo que agiliza la distribución y reduce costos de bodega.'
        }
      ]
    },
    image: '/images/office-yard.jpg'
  },
  {
    id: 'transloading',
    slug: serviceSlugs.transloading,
    name: { en: 'Transloading', es: 'Transbordo' },
    title: { en: 'TRANSLOAD SERVICE', es: 'SERVICIO DE TRANSBORDO' },
    sub: {
      en: 'Switching between different modes of transportation can be a challenge, but with us, it becomes a breeze.',
      es: 'Cambiar entre diferentes modos de transporte puede ser un desafío, pero con nosotros, se convierte en algo sencillo.'
    },
    desc: {
      en: "We specialize in transferring your cargo from one mode of transport to another, ensuring minimal handling and maximum speed. Whether it's from rail to truck or vice versa, our team ensures a seamless transition.",
      es: 'Nos especializamos en transferir su carga de un modo de transporte a otro, asegurando un manejo mínimo y la máxima velocidad. Ya sea de tren a camión o viceversa, nuestro equipo asegura una transición perfecta.'
    },
    h1: {
      en: 'Transloading Services in Laredo, TX: Rail to Truck and Back',
      es: 'Servicio de Transbordo en Laredo, TX: de Tren a Camión y Viceversa'
    },
    metaTitle: {
      en: 'Transloading Services Laredo, TX | Rail to Truck',
      es: 'Servicio de Transbordo en Laredo, TX | Tren a Camión'
    },
    metaDescription: {
      en: 'Transloading services in Laredo, TX: rail-to-truck and truck-to-rail transfers with minimal handling, plus final delivery on our own fleet.',
      es: 'Servicio de transbordo en Laredo, TX: transferencias de tren a camión y de camión a tren con manejo mínimo, más entrega final con nuestra flota.'
    },
    keywords: {
      en: ['transloading Laredo', 'rail to truck transload', 'transload services Texas', 'intermodal transload'],
      es: ['transbordo Laredo', 'transbordo tren a camión', 'servicio de transbordo', 'transbordo intermodal']
    },
    intro: {
      en: [
        'Transloading lets you combine the cost advantages of rail with the flexibility of trucking for the final miles.',
        'Our team transfers cargo between rail and truck with minimal handling, then delivers it on our own fleet so the handoff does not slow your supply chain down.'
      ],
      es: [
        'El transbordo le permite combinar las ventajas de costo del ferrocarril con la flexibilidad del autotransporte para la última milla.',
        'Nuestro equipo transfiere la mercancía entre tren y camión con manejo mínimo y la entrega con nuestra propia flota para que el cambio no frene su cadena de suministro.'
      ]
    },
    benefits: {
      en: [
        'Rail-to-truck and truck-to-rail transfers',
        'Minimal handling to protect your cargo',
        'Final delivery on our own fleet',
        'One provider for transload and trucking'
      ],
      es: [
        'Transferencias de tren a camión y de camión a tren',
        'Manejo mínimo para proteger su carga',
        'Entrega final con nuestra propia flota',
        'Un solo proveedor para transbordo y transporte'
      ]
    },
    faqs: {
      en: [
        {
          q: 'What is transloading?',
          a: 'Transloading is transferring freight from one mode of transportation to another, for example from a rail car to a truck trailer, to reach the final destination.'
        }
      ],
      es: [
        {
          q: '¿Qué es el transbordo?',
          a: 'El transbordo es transferir la mercancía de un modo de transporte a otro, por ejemplo de un carro de ferrocarril a una caja de tráiler, para llegar al destino final.'
        }
      ]
    },
    image: '/images/working.jpg'
  }
];

export function getServiceBySlug(slug: string, locale: string): ServiceDoc | undefined {
  return services.find((service) => (locale === 'es' ? service.slug.es : service.slug.en) === slug);
}

/** Internal route path per locale, e.g. { en: '/services/transloading', es: '/services/transbordo' }. */
export function servicePath(service: ServiceDoc): Localized {
  return { en: `/services/${service.slug.en}`, es: `/services/${service.slug.es}` };
}

/** FAQs shown on the /services hub — written around the broad "freight & cross-border services" query. */
export const servicesHubFaqs: Localized<ServiceFaq[]> = {
  en: [
    {
      q: 'What freight and cross-border services does Absolute Group offer?',
      a: 'Full truckload (FTL) and dedicated dry van, door-to-door freight from Mexico to the U.S., border crossing, expedited freight, warehousing and cross-docking, and transloading, all operated from Laredo, Texas.'
    },
    {
      q: 'Is Absolute Group an asset-based carrier?',
      a: 'Yes. Since 2011 we have grown to a fleet of more than 200 power units, so the trucks and drivers moving your freight are our own.'
    },
    {
      q: 'How do I get a freight quote?',
      a: 'Send us your origin, destination, freight type and pickup date through the contact form or call (956) 727-6004, and our team will respond with a quote.'
    }
  ],
  es: [
    {
      q: '¿Qué servicios de carga y transporte transfronterizo ofrece Absolute Group?',
      a: 'Carga completa (FTL) y caja seca dedicada, carga puerta a puerta de México a EE. UU., cruce fronterizo, carga expedita, almacenaje y cross-docking, y transbordo, todo operado desde Laredo, Texas.'
    },
    {
      q: '¿Absolute Group tiene flota propia?',
      a: 'Sí. Desde 2011 hemos crecido a una flota de más de 200 tractocamiones, por lo que los camiones y operadores que mueven su carga son nuestros.'
    },
    {
      q: '¿Cómo solicito una cotización de flete?',
      a: 'Envíenos origen, destino, tipo de mercancía y fecha de recolección mediante el formulario de contacto o llame al (956) 727-6004 y nuestro equipo le enviará una cotización.'
    }
  ]
};
