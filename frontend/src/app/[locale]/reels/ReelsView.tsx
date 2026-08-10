'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ReelDoc } from '../../../data/types';
import { getMediaUrl, getYoutubeEmbedUrl } from '../../../data/api';
import { Film, Play, X } from 'lucide-react';
import Image from 'next/image';

export default function ReelsView({ reels, locale }: { reels: ReelDoc[], locale: 'en' | 'es' }) {
  const t = useTranslations('ReelsSection');
  const [activeModalReel, setActiveModalReel] = useState<ReelDoc | null>(null);

  return (
    <div className="space-y-16 py-16 bg-slate-950 text-white min-h-screen">
      
      {/* Header */}
      <section className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Film className="w-4 h-4" />
            {t('badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Reels Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Reels Vertical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveModalReel(reel)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-reel w-full bg-black">
                {/* Thumbnail Image */}
                <Image
                  src={getMediaUrl(reel.coverImage?.url) || '/images/default-reel.jpg'}
                  alt={reel.coverImage?.alt || 'Reel Thumbnail'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#0E4194]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 pointer-events-none">
                  <h3 className="font-bold text-base text-white line-clamp-2">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {reel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Expanded Modal Player (YouTube) */}
      {activeModalReel && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalReel(null)}
        >
          <div 
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {activeModalReel.title}
              </h3>
              <button
                onClick={() => setActiveModalReel(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-reel w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`${getYoutubeEmbedUrl(activeModalReel.youtubeLink)}?autoplay=1&rel=0`}
                title={activeModalReel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              ></iframe>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModalReel.description}
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
