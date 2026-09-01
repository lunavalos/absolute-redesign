'use client';

import React from 'react';
import ShapeGrid from './ShapeGrid';

interface PageHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function PageHeader({
  badge,
  badgeIcon,
  title,
  subtitle,
  className = '',
  align = 'left',
}: PageHeaderProps) {
  return (
    <section className={`relative bg-[#000000] text-white pt-32 pb-16 min-h-[35vh] flex flex-col justify-center overflow-hidden border-b border-white/10 ${className}`}>
      
      {/* ── CAPA 1: Video de Fondo de Homepage Hero ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-bg-2.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 scale-105"
      >
        <source src="/images/Video hero.mp4" type="video/mp4" />
      </video>

      {/* ── CAPA 2: ShapeGrid Background Animado ── */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
        <ShapeGrid
          speed={0.25}
          squareSize={56}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.06)"
          hoverFillColor="rgba(255,255,255,0.12)"
          shape="square"
          hoverTrailAmount={8}
        />
      </div>

      {/* ── CAPA 3: Vignette / Overlay de Degradado Radial ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 20%, #000000 90%)',
        }}
      />

      {/* ── CONTENIDO DEL HEADER DE PÁGINA ── */}
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4 pt-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        {badge && (
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 ${align === 'center' ? 'justify-center' : ''}`}>
            {badgeIcon}
            {badge}
          </span>
        )}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-balance leading-tight text-white ${align === 'center' ? 'mx-auto' : ''}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
