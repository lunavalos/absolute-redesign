'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mockCertifications } from '../data/certifications';
import { Award } from 'lucide-react';

export default function Certifications() {
  const t = useTranslations('ClientsCertificates');

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-sm font-bold uppercase tracking-widest text-[#0E4194]">
            {t('certsBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091C3D] leading-tight">
            {t('certsTitle')}
          </h2>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockCertifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-40 h-40 flex items-center justify-center">
                <Image
                  src={cert.badgeUrl}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
