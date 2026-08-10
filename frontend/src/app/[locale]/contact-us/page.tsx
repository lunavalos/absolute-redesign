'use client';

import { useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import ShapeGrid from '../../../components/ShapeGrid';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const tServices = useTranslations('Services');
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'FTL Door-to-Door',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* Hero Banner with ShapeGrid */}
      <section className="relative bg-[#091C3D] text-white pt-32 pb-16 min-h-[35vh] flex flex-col justify-center overflow-hidden">
        {/* ShapeGrid Background */}
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.25} 
            squareSize={56}
            direction='diagonal'
            borderColor='rgba(255,255,255,0.04)'
            hoverFillColor='rgba(255,255,255,0.08)'
            shape='square'
            hoverTrailAmount={8}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 pt-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <MessageSquare className="w-4 h-4" />
            {t('badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-balance leading-tight">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Main Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Card: Contact Details */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col space-y-10 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#0E4194] uppercase tracking-widest">
                {isEs ? 'CONTACTO DIRECTO' : 'DIRECT CONTACT'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {isEs ? 'Atención Inmediata a Empresas' : 'Immediate Business Assistance'}
              </h2>
            </div>

            <div className="space-y-8 flex-grow">
              
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-[#0E4194] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t('phoneTitle')}
                  </h3>
                  <a href="tel:9567276004" className="text-[15px] font-bold text-slate-900 hover:text-[#0E4194] transition-colors">
                    (956) 727 6004
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-[#0E4194] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t('emailTitle')}
                  </h3>
                  <a href="mailto:contact@absolute-fi.com" className="text-[15px] font-bold text-slate-900 hover:text-[#0E4194] transition-colors">
                    contact@absolute-fi.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-[#0E4194] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {t('addressTitle')}
                  </h3>
                  <p className="text-[15px] font-bold text-slate-900">
                    1208 Vidal Cantu Rd.
                    <span className="block text-[13px] font-semibold text-slate-600 mt-0.5">Laredo, TX 78045</span>
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 font-medium leading-relaxed">
              {isEs 
                ? 'Absolute Group cumple con todas las normativas federales y estatales para la logística transfronteriza y transporte de carga internacional.' 
                : 'Absolute Group complies with all state and federal regulations for cross-border logistics and international freight transportation.'}
            </div>

            {/* Google Map Embedded Preview */}
            <div className="h-48 rounded-2xl overflow-hidden border border-slate-200 relative mt-4">
              <iframe
                title="Laredo Terminal Map"
                src="https://maps.google.com/maps?q=1208%20Vidal%20Cantu%20Rd.,%20Laredo,%20TX%2078045&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Card: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg relative">
            {submitted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-white/95 backdrop-blur-sm rounded-3xl z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Inquiry Received</h2>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Thank you for reaching out to Absolute Group. Our dispatch team will contact you within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 mt-4 bg-[#0E4194] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#1453B9] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : null}

            <div className="mb-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                {isEs ? 'Envíanos un mensaje' : 'Send us a message'}
              </h2>
              <p className="text-sm text-slate-600">
                {isEs 
                  ? 'Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible para atender tus necesidades logísticas.'
                  : 'Fill out the form below and we will contact you as soon as possible to assist with your logistics needs.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {t('formName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEs ? 'Ej. Juan Pérez' : 'Ex. John Doe'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {t('formCompany')}
                  </label>
                  <input
                    type="text"
                    placeholder={isEs ? 'Ej. Magna Internacional' : 'Ex. ABC Logistics'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {t('formEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={isEs ? 'Ej. juan@empresa.com' : 'Ex. john@company.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {t('formPhone')}
                  </label>
                  <input
                    type="tel"
                    placeholder={isEs ? 'Ej. 844 123 4567' : 'Ex. 956 123 4567'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t('formService')}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all"
                >
                  <option value="FTL Door-to-Door">{tServices('ftlTitle')}</option>
                  <option value="Border Crossing">{tServices('borderTitle')}</option>
                  <option value="Expedited Freight">{tServices('expeditedTitle')}</option>
                  <option value="Transloading">{tServices('transloadingTitle')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {isEs ? 'MENSAJE / ESPECIFICACIONES DEL PROYECTO' : 'MESSAGE / PROJECT SPECIFICATIONS'} *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isEs 
                    ? 'Describe dimensiones, orígenes, destinos o necesidades logísticas...' 
                    : 'Describe dimensions, origins, destinations, or logistics needs...'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0E4194] focus:ring-1 focus:ring-[#0E4194] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#0E4194] hover:bg-[#1453B9] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                {isEs ? 'Enviar Solicitud de Cotización' : 'Send Quote Request'}
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
