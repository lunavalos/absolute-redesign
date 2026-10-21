import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import PageHeader from '../../../components/PageHeader';
import { generatePageMetadata } from '../../../lib/seo';
import SatisfactionSurveyClient from './SatisfactionSurveyClient';
import { HeartHandshake, Loader2 } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = params ? await Promise.resolve(params) : undefined;
  const locale = resolvedParams?.locale || (await getLocale());
  const isEs = locale === 'es';

  return generatePageMetadata({
    title: isEs ? 'Encuesta de Satisfacción' : 'Satisfaction Survey',
    description: isEs
      ? 'Tu opinión es muy importante para nosotros. Esta breve encuesta nos ayuda a comprender tu experiencia y mejorar continuamente nuestro servicio.'
      : 'Your feedback is very important to us. This short survey helps us understand your experience and improve our service.',
    locale,
    path: '/satisfaction-survey',
    noIndex: true
  });
}

export default async function SatisfactionSurveyPage({
  params,
}: {
  params?: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = params ? await Promise.resolve(params) : undefined;
  const locale = resolvedParams?.locale || (await getLocale());
  const t = await getTranslations('SatisfactionSurvey');

  return (
    <div className="bg-[#041024] min-h-screen text-white pb-24">
      
      {/* Hero Header with Background Video & ShapeGrid */}
      <PageHeader
        badge={t('badge')}
        badgeIcon={<HeartHandshake className="w-4 h-4" />}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
        className="mb-12"
      />

      {/* Main Survey Form Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <span className="text-sm">Cargando encuesta...</span>
            </div>
          }
        >
          <SatisfactionSurveyClient />
        </Suspense>
      </section>

    </div>
  );
}
