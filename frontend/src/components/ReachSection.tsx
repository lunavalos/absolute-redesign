'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import MagicRings from './MagicRings';

export default function ReachSection() {
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';
  const [activeHub, setActiveHub] = useState<string | null>(null);
  const [zoomOrigin, setZoomOrigin] = useState<string>('center');

  const hubs = [
    {
      id: 'laredo',
      name: 'Texas',
      city: 'Texas',
      top: '67%',
      left: '45%',
      details: isEs
        ? 'Centro neurálgico transfronterizo con más del 40% del tráfico comercial terrestre entre EE. UU. y México.'
        : 'Primary cross-border hub handling over 40% of all US-Mexico commercial land freight.'
    },
    {
      id: 'Cincinatti',
      name: 'Cincinatti',
      city: 'Cincinatti',
      top: '37%',
      left: '69%',
      details: isEs
        ? 'Punto clave de distribución masiva conectando Texas con el resto del país.'
        : 'Key mass distribution point connecting Texas with the rest of the country.'
    },
    {
      id: 'michigan',
      name: 'Michigan',
      city: 'Michigan',
      top: '34%',
      left: '60%',
      details: isEs
        ? 'Suministro continuo FTL para la industria automotriz y manufacturera avanzada.'
        : 'Continuous FTL supply chain support for North American automotive manufacturing.'
    },
    {
      id: 'illinois',
      name: 'Illinois',
      city: 'Illinois',
      top: '45%',
      left: '62%',
      details: isEs
        ? 'Conexión estratégica con centros de distribución masiva y flete intermodal.'
        : 'Strategic connection to major Midwest distribution and transloading centers.'
    },
    {
      id: 'indiana',
      name: 'Indiana',
      city: 'Indiana',
      top: '45%',
      left: '67%',
      details: isEs
        ? 'Corredor de transporte clave para manufactura y distribución central.'
        : 'Key manufacturing and central distribution transport corridor.'
    },
    {
      id: 'ohio',
      name: 'Ohio',
      city: 'Ohio',
      top: '43%',
      left: '73%',
      details: isEs
        ? 'Rutas prioritarias para bienes industriales y de consumo.'
        : 'Priority lanes for industrial and consumer goods freight.'
    },
    {
      id: 'pennsylvania',
      name: 'Pennsylvania',
      city: 'Pennsylvania',
      top: '40%',
      left: '81%',
      details: isEs
        ? 'Puerta de entrada logística para el noreste de Estados Unidos.'
        : 'Logistics gateway connecting to the Northeast US consumer markets.'
    },
    {
      id: 'newyork',
      name: 'New York',
      city: 'New York',
      top: '34%',
      left: '84%',
      details: isEs
        ? 'Servicio expedito para los principales mercados del Atlántico Norte.'
        : 'Expedited service for major North Atlantic trade centers.'
    },
    {
      id: 'kansas',
      name: 'Kansas / Oklahoma',
      city: 'Kansas / Oklahoma',
      top: '49%',
      left: '48%',
      details: isEs
        ? 'Punto de cruce estratégico en las llanuras centrales de EE. UU.'
        : 'Strategic cross-country routing point in the US Central Plains.'
    },
    {
      id: 'missouri',
      name: 'Missouri',
      city: 'Missouri',
      top: '49%',
      left: '57%',
      details: isEs
        ? 'Centro de transferencia de carga pesada y productos industriales.'
        : 'Transloading hub for industrial goods and heavy freight.'
    },
    {
      id: 'tennessee',
      name: 'Tennessee',
      city: 'Tennessee',
      top: '54%',
      left: '68%',
      details: isEs
        ? 'Distribución veloz para el corazón de la región sureste.'
        : 'Rapid distribution node serving the heart of the Southeast.'
    },
        {
      id: 'Kentucky',
      name: 'Kentucky',
      city: 'Kentucky',
      top: '50%',
      left: '70%',
      details: isEs
        ? 'Distribución veloz para el corazón de la región sureste.'
        : 'Rapid distribution node serving the heart of the Southeast.'
    },
    {
      id: 'georgia',
      name: 'Georgia',
      city: 'Georgia',
      top: '62%',
      left: '75%',
      details: isEs
        ? 'Rutas directas dedicadas conectando Laredo con el sureste de EE. UU.'
        : 'Dedicated direct lanes linking Laredo border to Southeast markets.'
    },
    {
      id: 'alabama',
      name: 'Alabama',
      city: 'Alabama',
      top: '61%',
      left: '68%',
      details: isEs
        ? 'Soporte logístico para plantas ensambladoras de vehículos.'
        : 'Logistics support for vehicle assembly plants and OEM suppliers.'
    },
    {
      id: 'northcarolina',
      name: 'North Carolina',
      city: 'North Carolina',
      top: '53%',
      left: '81%',
      details: isEs
        ? 'Envíos regulares de carga completa FTL a la costa este.'
        : 'Regular FTL full truckload shipments to the East Coast.'
    },
    {
      id: 'Arkansas',
      name: 'Arkansas / Mississippi',
      city: 'Arkansas / Mississippi',
      top: '58%',
      left: '57%',
      details: isEs
        ? 'Ruta de tránsito para la región sur central.'
        : 'Transit route for South Central agricultural and manufacturing loads.'
    }
  ];

  return (
    <section
      className="py-24 text-white overflow-hidden relative"
      style={{ background: '#030b14' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8 lg:pr-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                {isEs ? 'NUESTRA COBERTURA' : 'OUR REACH'}
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {isEs ? 'Cobertura Transfronteriza en Todo el País' : 'Trusted Cross-Border Coverage, Nationwide'}
              </h2>
              <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
                {isEs
                  ? 'Impulsamos las cadenas de suministro más exigentes, conectando a México y Estados Unidos con soluciones FTL y logística puerta a puerta de alta eficiencia.'
                  : 'We power the most demanding supply chains, connecting Mexico and the US with high-efficiency FTL and door-to-door logistics solutions.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-2xl font-bold text-white">80+ {isEs ? 'Ciudades' : 'Cities'}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isEs ? 'Rutas estratégicas hacia los principales mercados comerciales e industriales.' : 'Strategic lanes direct to the most critical commercial and industrial markets.'}
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <Navigation className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="text-2xl font-bold text-white">50% {isEs ? 'Cobertura' : 'Coverage'}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isEs ? 'Presencia operativa y rutas sólidas en la mitad del territorio estadounidense.' : 'Robust operational presence spanning across half of the US territory.'}
                </p>
              </div>
            </div>


          </motion.div>

          {/* Right Column: Dynamic Interactive Map Visual with ALL 15 Dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div 
              className="relative w-full rounded-3xl bg-[#0a1628] border border-white/10 overflow-hidden p-4 sm:p-8 flex items-center justify-center"
            >
              {/* Map Image Base (Zoomable) */}
              <div 
                className="relative w-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: activeHub ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: zoomOrigin,
                }}
              >
                {/* Changed to standard img to prevent letterboxing, so container matches image aspect ratio perfectly */}
                <img
                  src="/images/mapa-nuevo.png"
                  alt="Absolute Group Coverage Reach Map"
                  className="w-full h-auto object-contain block"
                />

                {/* Animated Pulsing Hotspots - Exact 15 State Dots matching Image 3 */}
                {hubs.map((hub) => {
                  const isActive = activeHub === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onMouseEnter={() => {
                        setActiveHub(hub.id);
                        setZoomOrigin(`${hub.left} ${hub.top}`);
                      }}
                      onMouseLeave={() => setActiveHub(null)}
                      style={{ top: hub.top, left: hub.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center group focus:outline-none z-30 transition-transform duration-1000 ${activeHub && activeHub !== hub.id ? 'scale-50 opacity-50' : 'scale-100'}`}
                      aria-label={`View hub ${hub.name}`}
                    >
                      {isActive && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none">
                          <MagicRings 
                            color="#3b82f6"
                            colorTwo="#0e4194"
                            speed={1.5}
                            ringCount={5}
                            baseRadius={0}
                            radiusStep={0.08}
                            lineThickness={3}
                            opacity={0.8}
                          />
                        </div>
                      )}
                      
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                            isActive ? 'bg-[#0E4194] opacity-75' : 'bg-blue-400 opacity-40'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${
                            isActive ? 'bg-[#0E4194] ring-4 ring-blue-300' : 'bg-blue-600'
                          }`}
                        />
                      </span>

                      {/* Tooltip on Hover */}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl z-40">
                        {hub.city}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
