'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mockCertifications } from '../data/certifications';

export default function Certifications() {
  const t = useTranslations('ClientsCertificates');

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E4194]">
            {t('certsBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {t('certsTitle')}
          </h2>
        </div>

        {/* Pure Logos (No Card, No Border, No Background, No Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {mockCertifications.map((cert) => (
            <div
              key={cert.id}
              className="relative w-44 h-28 flex items-center justify-center"
            >
              <Image
                src={cert.badgeUrl}
                alt={cert.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
