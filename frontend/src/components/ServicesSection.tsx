'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../navigation';
import { Truck, RefreshCw, Zap, Warehouse, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import CursorGrid from './CursorGrid';
import BorderBeamButton from './BorderBeamButton';

export default function ServicesSection() {
  const t = useTranslations('Services');
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';

  const servicesList = [
    {
      id: 'ftl',
      icon: Truck,
      number: '01',
      title: t('ftlTitle'),
      desc: t('ftlDesc'),
      features: isEs 
        ? ['Cajas Secas de 53 pies', 'Entrega Puerta a Puerta', 'Sin Transferencias de Terceros']
        : ['53ft Dry Vans', 'Door-to-Door Delivery', 'No Third-Party Transfers'],
      accent: 'from-blue-600 to-blue-400',
    },
    {
      id: 'border',
      icon: RefreshCw,
      number: '02',
      title: t('borderTitle'),
      desc: t('borderDesc'),
      features: isEs
        ? ['Operaciones en Puerto de Laredo, TX', 'Listos para Despacho Aduanal', 'Operadores de Transfer Certificados']
        : ['Laredo TX Port Operations', 'Customs Clearance Ready', 'Certified Transfer Drivers'],
      accent: 'from-indigo-600 to-indigo-400',
    },
    {
      id: 'expedited',
      icon: Zap,
      number: '03',
      title: t('expeditedTitle'),
      desc: t('expeditedDesc'),
      features: isEs
        ? ['Carga de Tiempo Crítico', 'Cobertura de Doble Operador', 'Despacho Prioritario 24/7']
        : ['Time-Critical Freight', 'Dual Driver Coverage', '24/7 Priority Dispatch'],
      accent: 'from-sky-600 to-sky-400',
    },
  ];

  return (
    <section
      className="py-24 text-white relative overflow-hidden"
      style={{ background: '#071525' }}
    >
      <CursorGrid
        cellSize={56}
        color="#ffffff"
        radius={200}
        maxOpacity={0.15}
        gridOpacity={0.04}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              {t('badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t('title')}
            </h2>
          </div>
        </motion.div>

        {/* Services — Horizontal rows with alternating layout */}
        <div className="space-y-0 divide-y divide-white/[0.07]">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-16 items-center py-12 hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-2xl cursor-default"
              >
                {/* Left — Number + Icon */}
                <div className="flex items-center gap-6">
                  <span className="text-6xl font-black text-white/5 select-none leading-none tabular-nums">
                    {service.number}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl bg-[#0E4194] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Center — Title + Desc */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                    {service.desc}
                  </p>
                </div>

                {/* Right — Features + CTA */}
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-white/60">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors duration-200 group/link"
                  >
                    {t('readMore')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/[0.07] flex items-center justify-between flex-wrap gap-4"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            {isEs ? 'Descubre todas las soluciones de Absolute Group' : 'Discover all Absolute Group solutions'}
          </p>
          <Link href="/services">
            <BorderBeamButton isRed={true}>
              {isEs ? 'Ver nuestros servicios' : 'View our services'}
              <ArrowRight className="w-3.5 h-3.5" />
            </BorderBeamButton>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
