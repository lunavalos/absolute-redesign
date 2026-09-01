import { generatePageMetadata } from '../../../lib/seo';
import ShapeGrid from '../../../components/ShapeGrid';
import { MapPin, Globe, Truck, Timer, Warehouse, RefreshCw, Layers } from 'lucide-react';

import PageHeader from '../../../components/PageHeader';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Cross-Border Logistics Services | FTL, Border Crossing & Transloading',
    description:
      'Explore Absolute Group transportation services: Door-to-Door FTL freight, transfer-free border crossing at Laredo, TX, expedited delivery, and warehousing.',
    locale,
    path: '/services'
  });
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  const services = [
    {
      id: 'door2door',
      icon: MapPin,
      title: isEs ? 'SERVICIOS DE CARGA PUERTA A PUERTA' : 'DOOR 2 DOOR FREIGHT SERVICES',
      sub: isEs
        ? 'Ahorre costos de transbordo cargando nuestras cajas secas en México y transportándolas directamente a los EE. UU.'
        : 'Save transloading costs by loading our dry vans in Mx and hauling them directly into the US.',
      desc: isEs
        ? 'Los Servicios de Carga Puerta a Puerta de Absolute Group ofrecen una solución de transporte sin complicaciones, asegurando que sus mercancías sean recogidas directamente en la ubicación del remitente y entregadas sin problemas en la puerta del destinatario. Con nuestra red integral y equipo capacitado, priorizamos la seguridad, puntualidad y eficiencia, asegurando que su carga llegue a su destino en perfectas condiciones y a tiempo.'
        : "Absolute Group's Door 2 Door Freight Services offer a hassle-free transportation solution, ensuring that your goods are picked up directly from the sender's location and delivered seamlessly to the receiver's doorstep. With our comprehensive network and skilled team, we prioritize safety, punctuality, and efficiency, ensuring your freight reaches its destination in perfect condition and on time."
    },
    {
      id: 'border',
      icon: Globe,
      title: isEs ? 'CRUCE FRONTERIZO' : 'BORDER CROSSING',
      sub: isEs
        ? 'Podemos proporcionar servicios de cruce fronterizo, evitando transferencias con terceros.'
        : 'We are able to provide border crossing services, avoiding having 3rd party transfers.',
      desc: isEs
        ? 'Navegar por las complejidades del envío internacional puede ser abrumador, pero con el servicio de Cruce Fronterizo de Absolute Group, puede estar tranquilo. Nuestro equipo experto está bien versado en procedimientos aduanales y regulaciones. Aseguramos un paso fluido y rápido de sus mercancías a través de las fronteras, minimizando retrasos y garantizando el cumplimiento de todas las leyes y regulaciones internacionales.'
        : "Navigating the complexities of international shipping can be daunting, but with Absolute Group's Border Crossing service, you can rest easy. Our expert team is well-versed in customs procedures, and regulations. We ensure a smooth and swift passage of your goods across borders, minimizing delays and ensuring compliance with all international laws and regulations."
    },
    {
      id: 'truckload',
      icon: Truck,
      title: isEs ? 'CARGA COMPLETA / CAJA SECA DEDICADA' : 'TRUCKLOAD / DEDICATED DRY VAN',
      sub: isEs
        ? 'Ya sea que tenga un camión completo de mercancías o necesite una caja seca dedicada, Absolute Group lo tiene cubierto.'
        : 'Whether you have a full truckload of goods or need a dedicated dry van, Absolute Group has got you covered.',
      desc: isEs
        ? 'Nuestra flota de camiones y camionetas de última generación está equipada para manejar grandes volúmenes de carga, asegurando que permanezcan protegidos de elementos externos. Con nuestros conductores confiables y sistemas de rastreo avanzados, puede estar seguro de que su envío llegará a su destino de manera segura y a tiempo.'
        : 'Our fleet of state-of-the-art trucks and vans are equipped to handle large volumes of cargo, ensuring they remain protected from external elements. With our reliable drivers and advanced tracking systems, you can be confident that your shipment will arrive at its destination safely and on schedule.'
    },
    {
      id: 'expedite',
      icon: Timer,
      title: isEs ? 'SERVICIO EXPEDITO' : 'EXPEDITE SERVICE',
      sub: isEs
        ? 'Brindando servicios puntuales y expeditos junto con nuestros camiones más nuevos en la flota.'
        : 'Providing on time and expedited services along with our newest trucks on fleet.',
      desc: isEs
        ? 'Para aquellas ocasiones en que necesita entregar algo con urgencia, el Servicio Expedito de Absolute Group es su mejor opción. Entendemos la importancia de los envíos sensibles al tiempo, y nuestro equipo dedicado trabaja las 24 horas del día para asegurar que su carga llegue a su destino lo más rápido posible, sin comprometer la seguridad o la calidad.'
        : "For those times when you need something delivered urgently, Absolute Group's Expedite Service is your best choice. We understand the importance of time-sensitive shipments, and our dedicated team works round the clock to ensure your cargo reaches its destination as quickly as possible, without compromising on safety or quality."
    },
    {
      id: 'warehouse',
      icon: Warehouse,
      title: isEs ? 'INSTALACIONES DE ALMACENAMIENTO' : 'WAREHOUSE FACILITY',
      sub: isEs
        ? 'Proporcionamos servicios de cross-docking, almacenamiento, carga y descarga.'
        : 'We provide cross-docking services, storage, loading and unloading.',
      desc: isEs
        ? 'El almacenamiento es un componente esencial del proceso logístico, y Absolute Group ofrece un entorno seguro, espacioso y organizado para sus mercancías. Nuestras modernas instalaciones están equipadas con sistemas avanzados de gestión de inventario, asegurando un fácil acceso, seguimiento y recuperación de sus productos siempre que los necesite.'
        : 'Storage is an essential component of the logistics process, and Absolute Group offers a secure, spacious, and organized environment for your goods. Our modern facilities are equipped with advanced inventory management systems, ensuring easy access, tracking, and retrieval of your products whenever you need them.'
    },
    {
      id: 'transload',
      icon: RefreshCw,
      title: isEs ? 'SERVICIO DE TRANSBORDO' : 'TRANSLOAD SERVICE',
      sub: isEs
        ? 'Cambiar entre diferentes modos de transporte puede ser un desafío, pero con nosotros, se convierte en algo sencillo.'
        : 'Switching between different modes of transportation can be a challenge, but with us, it becomes a breeze.',
      desc: isEs
        ? 'Nos especializamos en transferir su carga de un modo de transporte a otro, asegurando un manejo mínimo y la máxima velocidad. Ya sea de tren a camión o viceversa, nuestro equipo asegura una transición perfecta.'
        : "We specialize in transferring your cargo from one mode of transport to another, ensuring minimal handling and maximum speed. Whether it's from rail to truck or vice versa, our team ensures a seamless transition."
    }
  ];

  return (
    <div className="bg-[#030712] min-h-screen pb-24">
      
      {/* Hero Banner with Background Video */}
      <PageHeader
        badge={isEs ? 'Oferta de Servicios' : 'Comprehensive Solutions'}
        badgeIcon={<Layers className="w-4 h-4" />}
        title={isEs ? 'Soluciones de Transporte Transfronterizo' : 'Cross-Border Freight & Transportation Services'}
      />

      {/* Dark Theme Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group flex flex-col p-6 lg:p-8 bg-slate-900/40 border border-slate-800/60 rounded-2xl hover:bg-slate-800/40 hover:border-slate-700 transition-all duration-300"
              >
                {/* Header: Title and Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-white font-bold text-lg leading-tight uppercase tracking-wide">
                    {service.title}
                  </h2>
                </div>

                {/* Thin Divider */}
                <hr className="border-t border-slate-800/60 mb-5 group-hover:border-slate-700 transition-colors" />

                {/* Content: Subtitle & Description */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-blue-300 leading-relaxed">
                    {service.sub}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
