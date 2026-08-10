'use client';

import Image from 'next/image';
import { Link } from '../navigation';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Home, Users, Briefcase, BookOpen, Truck, Map, Box, RefreshCw } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const tContact = useTranslations('Contact');
  const tServices = useTranslations('Services');
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';

  return (
    <footer className="bg-[#0E4194] text-slate-200 pt-16 pb-8 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6 lg:col-span-2 lg:pr-12">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 overflow-hidden rounded-xl bg-white p-1.5 shadow-lg">
                <Image
                  src="/images/logo Absolute.png"
                  alt="Absolute Group Inc. Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  ABSOLUTE
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  Group Inc.
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-wider leading-none">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <Link href="/" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Home className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Users className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Briefcase className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (New) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-wider leading-none">
              {tNav('services')}
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <Link href="/services" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Truck className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tServices('ftlTitle')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <RefreshCw className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tServices('borderTitle')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Map className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tServices('transloadingTitle')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Box className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  {tServices('expeditedTitle')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-wider leading-none">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">{tContact('addressText')}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                <a href="tel:9567276004" className="hover:text-white transition-colors">
                  {tContact('phoneText')}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                <a href="mailto:contact@absolute-fi.com" className="hover:text-white transition-colors">
                  {tContact('emailText')}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Clock className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                <span className="group-hover:text-white transition-colors">{tContact('hoursText')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & LunAvalos Credit */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Absolute Group Inc. {t('copyright')}</p>
          </div>

          <div className="flex items-center gap-6">

            {/* Developed By LunAvalos Credit */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-widest font-bold text-slate-300/80 mb-2">
                DESIGNED BY
              </span>
              <div className="relative w-36 h-10 px-2 py-1">
                <Image
                  src="/images/credits-logo.png"
                  alt="Designed by LunAvalos"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
