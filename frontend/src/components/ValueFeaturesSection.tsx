'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import cargoTruckData from '../../public/json/Cargo-Truck (1).json';
import globalLogisticsData from '../../public/json/Global-Logistics (2).json';
import worldwideData from '../../public/json/Worldwide (1).json';
import parcelLocationData from '../../public/json/Parcel-Location (1).json';
import paperMoneyData from '../../public/json/Paper-Money (1).json';
import secureLogisticsData from '../../public/json/Secure-Logistics (1).json';

export default function ValueFeaturesSection() {
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';

  const values = [
    {
      id: 'security',
      animation: secureLogisticsData, 
      title: isEs ? 'Seguridad Inquebrantable' : 'Uncompromising Security',
      desc: isEs
        ? 'Protección absoluta de la cadena de suministro. Operamos bajo rigurosos estándares internacionales de seguridad para brindar confianza total en cada milla.'
        : 'Absolute protection of your supply chain. We operate under rigorous international security standards to deliver complete peace of mind on every mile.',
    },
    {
      id: 'tech',
      animation: worldwideData,
      title: isEs ? 'Tecnología Avanzada' : 'Advanced Fleet Tech',
      desc: isEs
        ? 'Plataformas digitales de última generación. Obtén visibilidad completa de tus embarques, telemática en cabina e intercambio de información automatizado al instante.'
        : 'Next-generation digital platforms. Gain complete visibility of your shipments, in-cab telematics, and instant automated data exchange.',
    },
    {
      id: 'pricing',
      animation: paperMoneyData, 
      title: isEs ? 'Soluciones Rentables' : 'Cost-Effective Solutions',
      desc: isEs
        ? 'Modelos tarifarios diseñados para optimizar tu rentabilidad. Consolidamos los procesos logísticos bajo un solo proveedor logrando eliminar sobrecostos ocultos.'
        : 'Pricing models designed to optimize your bottom line. We consolidate logistics processes under a single provider to eliminate hidden overhead.',
    },
    {
      id: 'efficiency',
      animation: cargoTruckData, 
      title: isEs ? 'Tránsito Optimizado' : 'Streamlined Transit',
      desc: isEs
        ? 'Flota versátil y procesos ágiles enfocados en reducir tiempos de tránsito. Mantenemos un flujo constante de mercancías incluso en las aduanas de mayor volumen.'
        : 'Versatile fleet and agile processes focused on reducing transit times. We maintain a constant flow of goods even through high-volume customs checkpoints.',
    },
    {
      id: 'presence',
      animation: parcelLocationData, 
      title: isEs ? 'Amplia Red de Rutas' : 'Extensive Route Network',
      desc: isEs
        ? 'Alcance logístico sin fronteras. Contamos con infraestructura estratégica que nos permite conectar de manera fluida los principales polos industriales de Norteamérica.'
        : 'Border-less logistics reach. We leverage strategic infrastructure allowing us to seamlessly connect the major industrial hubs of North America.',
    },
    {
      id: 'door2door',
      animation: globalLogisticsData,
      title: isEs ? 'Entregas Integrales' : 'End-to-End Delivery',
      desc: isEs
        ? 'Gestión unificada desde la recolección hasta la entrega final. Coordinamos cada eslabón del traslado internacional sin que tengas que triangular con múltiples agencias.'
        : 'Unified management from pickup to final delivery. We coordinate every link of the international transit so you never have to triangulate with multiple agencies.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#030b14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            {isEs ? 'El Valor de Absolute' : 'The Absolute Value'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mt-2 text-balance">
            {isEs
              ? 'Redefiniendo la Logística Transfronteriza'
              : 'Redefining Cross-Border Logistics'}
          </h2>
          <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-2xl">
            {isEs
              ? 'Diseñamos soluciones impecables para la cadena de suministro conectando México y EE.UU. Mediante rastreo avanzado, protocolos estrictos de seguridad y operaciones eficientes, garantizamos entregas puntuales y seguras.'
              : 'We engineer seamless supply chain solutions connecting the US and Mexico. Through advanced tracking, strict security protocols, and optimized operations, we guarantee that your shipments arrive intact and on schedule.'}
          </p>
        </motion.div>

        {/* Values grid — 2 cols on md, icon left + text right, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {values.map((val, idx) => (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="flex items-stretch gap-5 py-4 group"
            >
              {/* Lottie — full height of row */}
              <div className="w-20 self-stretch shrink-0 flex items-center justify-center rounded-2xl bg-white/5 group-hover:bg-blue-600/20 transition-colors duration-300">
                <div className="w-14 h-14">
                  <Lottie animationData={val.animation} loop autoplay className="w-full h-full" />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-1.5 flex flex-col justify-center">
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                  {val.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
