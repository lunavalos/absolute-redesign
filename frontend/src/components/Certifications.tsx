'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mockCertifications } from '../data/certifications';
import { motion } from 'framer-motion';
import CursorGrid from './CursorGrid';

export default function Certifications() {
  const t = useTranslations('ClientsCertificates');

  return (
    <section className="py-24 text-white relative overflow-hidden bg-[#041024]">
      <CursorGrid
        cellSize={56}
        color="#ffffff"
        radius={200}
        maxOpacity={0.15}
        gridOpacity={0.04}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            {t('certsBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {t('certsTitle')}
          </h2>
        </motion.div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative w-40 h-40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                {/* We won't invert certifications natively because they usually have their own brand colors, 
                    but we will add a slight glow to ensure they are visible on dark bg */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                <Image
                  src={cert.badgeUrl}
                  alt={cert.name}
                  fill
                  className="object-contain relative z-10 drop-shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
