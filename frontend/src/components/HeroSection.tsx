'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../navigation';
import { ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import BorderBeamButton from './BorderBeamButton';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full min-h-[92vh] bg-[#000000] overflow-hidden flex items-center justify-center pt-28 pb-20 text-white">

      {/* ── CAPA 1: Video de Fondo ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-bg-2.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-35 z-0 scale-105"
      >
        <source src="/images/hero-bg-1 (1).mp4" type="video/mp4" />
      </video>

      {/* ── CAPA 2: Gradiente Radial Azul Estático (Centro) ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(14,65,148,0.55) 0%, rgba(9,28,61,0.25) 50%, transparent 75%)',
        }}
      />

      {/* ── CAPA 3: Vignette de Bordes ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, #000000 88%)',
        }}
      />

      {/* ── CONTENIDO HERO ── */}
      <div className="relative z-20 text-center max-w-3xl px-6 flex flex-col items-center justify-center space-y-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Globe className="w-4 h-4" />
            {t('badge')}
          </span>

          {/* Headline — 2 líneas, estilo Raycast */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-center">
            <span className="block">{t('titleLine1')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300">
              {t('titleLine2')}
            </span>
          </h1>

          {/* Subtítulo — compacto, centrado */}
          <p className="text-sm sm:text-base text-[#ababab] max-w-sm mx-auto font-normal leading-relaxed text-center">
            {t('subtitle')}
          </p>

          {/* Botones */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link href="/contact-us">
              <BorderBeamButton>
                {t('ctaSecondary')}
                <ArrowRight className="w-4 h-4" />
              </BorderBeamButton>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-[11px] border border-white/30 hover:border-white text-white font-medium text-xs uppercase tracking-wider backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              {t('ctaPrimary')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
