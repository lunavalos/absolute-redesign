import { getLocale } from 'next-intl/server';
import { getReels } from '../../../data/api';
import ReelsView from './ReelsView';
import { generatePageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';
  return generatePageMetadata({
    title: isEs ? 'Videos y Reels' : 'Videos & Reels',
    description: isEs
      ? 'Videos de nuestra flota, operaciones transfronterizas y el día a día de Absolute Group en Laredo, Texas.'
      : 'Videos of our fleet, cross-border operations and day-to-day life at Absolute Group in Laredo, Texas.',
    locale,
    path: '/reels'
  });
}

export default async function ReelsPage() {
  const locale = await getLocale() as 'en' | 'es';
  const data = await getReels(locale);
  
  return <ReelsView reels={data.docs} locale={locale} />;
}
