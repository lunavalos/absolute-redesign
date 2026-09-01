import { getLocale } from 'next-intl/server';
import { getActiveForm } from '../../../data/api';
import ShapeGrid from '../../../components/ShapeGrid';
import ApplyFormClient from './ApplyFormClient';
import { FileText } from 'lucide-react';

import PageHeader from '../../../components/PageHeader';

export const dynamic = 'force-dynamic'; // Always fetch the latest form

export default async function ApplyPage() {
  const locale = await getLocale();
  const form = await getActiveForm(locale);

  return (
    <div className="bg-slate-950 min-h-screen pb-24">
      
      {/* Hero Banner with Background Video */}
      <PageHeader
        badge={locale === 'es' ? 'Bolsa de Trabajo' : 'Careers'}
        badgeIcon={<FileText className="w-4 h-4" />}
        title={form ? form.title : (locale === 'es' ? 'Únete al Equipo' : 'Join Our Team')}
      />

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
