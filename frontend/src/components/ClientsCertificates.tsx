'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mockClients } from '../data/clients';
import { mockCertifications } from '../data/certifications';
import { ShieldCheck, Award } from 'lucide-react';

export default function ClientsCertificates() {
  const t = useTranslations('ClientsCertificates');

  return (
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Clients Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0E4194]">
              {t('clientsBadge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('clientsTitle')}
            </h2>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            {mockClients.map((client) => (
              <div
                key={client.id}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center h-24 hover:border-[#0E4194] hover:shadow-md hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative w-full h-12 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="pt-12 border-t border-slate-100 space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              {t('certsBadge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('certsTitle')}
            </h2>
          </div>

          {/* Certifications Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {mockCertifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="relative w-20 h-20 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                  <Image
                    src={cert.badgeUrl}
                    alt={cert.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {cert.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
