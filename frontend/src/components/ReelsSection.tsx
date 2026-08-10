'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

import { ReelDoc } from '../data/types';
import { getMediaUrl, getYoutubeEmbedUrl } from '../data/api';
import { Play, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CursorGrid from './CursorGrid';
import Image from 'next/image';

const GRID: React.CSSProperties = {
  background: '#071525',
};

export default function ReelsSection({ reels }: { reels: ReelDoc[] }) {
  const t = useTranslations('ReelsSection');
  const locale = useLocale() as 'en' | 'es';
  const [activeReelModal, setActiveReelModal] = useState<ReelDoc | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 text-white relative overflow-hidden" style={GRID}>
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
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              FLEET & OPERATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('title')}
            </h2>
            <p className="text-white/45 text-sm">
              {t('subtitle')}
            </p>
          </div>

          {/* Nav arrows + CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="https://www.youtube.com/@AbsoluteGroupInc/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/40 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              {t('viewAll')}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Carousel Slider */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#071525] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#071525] to-transparent z-10 pointer-events-none" />

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel, idx) => {
              return (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 flex-shrink-0 cursor-pointer"
                  style={{ width: 'clamp(260px, 30vw, 320px)' }}
                  onClick={() => setActiveReelModal(reel)}
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[9/14] w-full bg-black overflow-hidden">
                    <Image
                      src={getMediaUrl(reel.coverImage?.url) || '/images/default-reel.jpg'}
                      alt={reel.coverImage?.alt || 'Reel Thumbnail'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                    {/* Play button */}
                    <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#0E4194]/90 hover:bg-[#1453B9] text-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all transform hover:scale-110 z-30 opacity-90 group-hover:opacity-100">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>

                    {/* Title + desc at bottom */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 pointer-events-none">
                      <h3 className="font-bold text-sm text-white leading-snug line-clamp-2">
                        {reel.title}
                      </h3>
                      <p className="text-[11px] text-white/60 line-clamp-2 font-normal">
                        {reel.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Expanded Modal Video Player (YouTube) */}
      {activeReelModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveReelModal(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#0a1628] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-bold text-base text-white">
                {activeReelModal.title}
              </h3>
              <button
                onClick={() => setActiveReelModal(null)}
                className="p-1.5 text-white/50 hover:text-white rounded-full bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`${getYoutubeEmbedUrl(activeReelModal.youtubeLink)}?autoplay=1&rel=0`}
                title={activeReelModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              ></iframe>
            </div>

            <p className="text-sm text-white/50 leading-relaxed">
              {activeReelModal.description}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
