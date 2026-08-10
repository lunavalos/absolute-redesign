'use client';

import { useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Send, CheckCircle2, User, MessageSquare, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
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
    <div className="bg-[#041024] min-h-screen text-white pb-24 font-sans">
      
      {/* Hero Banner with ShapeGrid */}
      <section className="relative bg-[#091C3D] text-white pt-32 pb-16 mb-16 min-h-[35vh] flex flex-col justify-center overflow-hidden">
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
          <div className="lg:col-span-5 bg-[#0D1A33] border border-[#1C2C4A] rounded-[24px] p-8 sm:p-10 flex flex-col space-y-10 shadow-2xl relative overflow-hidden">
            
            {/* Soft Glow Effect inside card */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                 style={{ background: 'radial-gradient(circle at 0% 0%, rgba(30,64,175,0.1) 0%, transparent 50%)' }} />

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em]">
                {isEs ? 'CONTACTO DIRECTO' : 'DIRECT CONTACT'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                {isEs ? 'Atención Inmediata a Empresas' : 'Immediate Business Assistance'}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed pt-2">
                {isEs 
                  ? 'Analizamos tus requerimientos de logística transfronteriza y ofrecemos propuestas en menos de 24 horas.' 
                  : 'We analyze your cross-border logistics requirements and provide proposals within 24 hours.'}
              </p>
            </div>

            <div className="space-y-8 flex-grow relative z-10">


              {/* Phone */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#142647] border border-[#1E3A6E] text-slate-300 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
                    {t('phoneTitle')}
                  </h3>
                  <a href="tel:9567276004" className="text-[15px] font-bold text-white hover:text-blue-400 transition-colors">
                    (956) 727 6004
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#142647] border border-[#1E3A6E] text-slate-300 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
                    {t('emailTitle')}
                  </h3>
                  <a href="mailto:contact@absolute-fi.com" className="text-[15px] font-bold text-white hover:text-blue-400 transition-colors">
                    contact@absolute-fi.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#142647] border border-[#1E3A6E] text-slate-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">
                    {t('addressTitle')}
                  </h3>
                  <p className="text-[15px] font-bold text-white">
                    1208 Vidal Cantu Rd.
                    <span className="block text-[13px] font-semibold text-slate-400 mt-0.5">Laredo, TX 78045</span>
                  </p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 mt-4 border-t border-[#1C2C4A]">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4">
                  {isEs ? 'SÍGUENOS EN:' : 'FOLLOW US ON:'}
                </h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/absolutegroupinc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#142647] border border-[#1E3A6E] text-slate-300 hover:text-white hover:border-[#3A5095] hover:bg-[#1A335D] flex items-center justify-center transition-all">
                    <Instagram className="w-[18px] h-[18px]" />
                  </a>
                  <a href="https://www.facebook.com/AbsoluteGroupInc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#142647] border border-[#1E3A6E] text-slate-300 hover:text-white hover:border-[#3A5095] hover:bg-[#1A335D] flex items-center justify-center transition-all">
                    <Facebook className="w-[18px] h-[18px]" />
                  </a>
                  <a href="https://wa.me/+19563340709" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#142647] border border-[#1E3A6E] text-slate-300 hover:text-white hover:border-[#3A5095] hover:bg-[#1A335D] flex items-center justify-center transition-all" title="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@AbsoluteGroupInc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#142647] border border-[#1E3A6E] text-slate-300 hover:text-white hover:border-[#3A5095] hover:bg-[#1A335D] flex items-center justify-center transition-all">
                    <Youtube className="w-[18px] h-[18px]" />
                  </a>
                </div>
              </div>

            </div>

            <div className="pt-8 mt-4 border-t border-[#1C2C4A] text-[11px] text-slate-500 font-medium leading-relaxed relative z-10">
              {isEs 
                ? 'Absolute Group cumple con todas las normativas federales y estatales para la logística transfronteriza y transporte de carga internacional.' 
                : 'Absolute Group complies with all state and federal regulations for cross-border logistics and international freight transportation.'}
            </div>
          </div>

          {/* Right Card: Contact Form */}
          <div className="lg:col-span-7 bg-[#0D1A33] border border-[#1C2C4A] rounded-[24px] p-8 sm:p-10 shadow-2xl relative">
            {submitted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#0D1A33]/95 backdrop-blur-md rounded-[24px] z-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Inquiry Received</h2>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Thank you for reaching out to Absolute Group. Our dispatch team will contact you within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 mt-4 bg-[#23356A] border border-[#3A5095] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#2F4484] transition-colors shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : null}

            <div className="mb-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-white">
                {isEs ? 'Cotiza tu Logística Transfronteriza' : 'Quote Your Cross-Border Logistics'}
              </h2>
              <p className="text-sm text-slate-400">
                {isEs 
                  ? 'Completa el siguiente formulario y nuestro equipo se pondrá en contacto contigo lo antes posible para brindarte una solución a la medida.'
                  : 'Fill out the form below and our team will contact you as soon as possible to provide a tailored solution.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {t('formName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEs ? 'Ej. Juan Pérez' : 'Ex. John Doe'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {t('formCompany')}
                  </label>
                  <input
                    type="text"
                    placeholder={isEs ? 'Ej. Magna Internacional' : 'Ex. ABC Logistics'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {t('formEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={isEs ? 'Ej. juan@empresa.com' : 'Ex. john@company.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {t('formPhone')}
                  </label>
                  <input
                    type="tel"
                    placeholder={isEs ? 'Ej. 844 123 4567' : 'Ex. 956 123 4567'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {t('formService')}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner appearance-none pr-10"
                  >
                    <option value="Door 2 Door Freight Services">{isEs ? 'Servicios de Flete Puerta a Puerta' : 'Door 2 Door Freight Services'}</option>
                    <option value="Border Crossing">{isEs ? 'Cruce Fronterizo' : 'Border Crossing'}</option>
                    <option value="Truckload / Dedicated Dry Van">{isEs ? 'Carga Completa / Caja Seca Dedicada' : 'Truckload / Dedicated Dry Van'}</option>
                    <option value="Expedite Service">{isEs ? 'Servicio Expedito' : 'Expedite Service'}</option>
                    <option value="Warehouse Facility">{isEs ? 'Instalaciones de Almacenaje' : 'Warehouse Facility'}</option>
                    <option value="Transload Service">{isEs ? 'Servicio de Transbordo' : 'Transload Service'}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {isEs ? 'MENSAJE / ESPECIFICACIONES DEL PROYECTO' : 'MESSAGE / PROJECT SPECIFICATIONS'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isEs 
                    ? 'Describe dimensiones, orígenes, destinos o necesidades logísticas...' 
                    : 'Describe dimensions, origins, destinations, or logistics needs...'}
                  className="w-full px-4 py-3.5 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all resize-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#21356F] border border-[#30478D] hover:bg-[#2B4286] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-xl shadow-[0_0_15px_rgba(33,53,111,0.5)] hover:shadow-[0_0_25px_rgba(43,66,134,0.7)] transition-all duration-300"
              >
                {isEs ? 'Enviar Solicitud de Cotización' : 'Send Quote Request'}
                <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
