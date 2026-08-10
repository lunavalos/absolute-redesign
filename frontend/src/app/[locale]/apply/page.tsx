import { getLocale } from 'next-intl/server';
import { getActiveForm } from '../../../data/api';
import ShapeGrid from '../../../components/ShapeGrid';
import ApplyFormClient from './ApplyFormClient';
import { FileText } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Always fetch the latest form

export default async function ApplyPage() {
  const locale = await getLocale();
  const form = await getActiveForm(locale);

  return (
    <div className="bg-slate-950 min-h-screen pb-24">
      
      {/* Hero Banner with ShapeGrid */}
      <section className="relative bg-[#091C3D] text-white pt-32 pb-24 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        
        {/* ShapeGrid Background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <ShapeGrid
            speed={0.2} 
            squareSize={60}
            direction='diagonal'
            borderColor='rgba(255,255,255,0.05)'
            hoverFillColor='rgba(255,255,255,0.1)'
            shape='square'
            hoverTrailAmount={6}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 pt-8 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <FileText className="w-4 h-4" />
            {locale === 'es' ? 'Bolsa de Trabajo' : 'Careers'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {form ? form.title : (locale === 'es' ? 'Únete al Equipo' : 'Join Our Team')}
          </h1>
        </div>
      </section>

      {/* Form Container */}
      <section className="relative z-20 mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {form ? (
          <ApplyFormClient form={form} locale={locale} />
        ) : (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">No hay formularios activos</h3>
            <p className="text-slate-400">
              En este momento no estamos recibiendo solicitudes de empleo. Por favor, vuelve a revisar más adelante.
            </p>
          </div>
        )}
      </section>
      
    </div>
  );
}
