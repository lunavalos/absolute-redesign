import { generatePageMetadata } from '../../lib/seo';
import HeroSection from '../../components/HeroSection';
import ValueFeaturesSection from '../../components/ValueFeaturesSection';
import ServicesSection from '../../components/ServicesSection';
import ReachSection from '../../components/ReachSection';
import ReelsSection from '../../components/ReelsSection';
import { getReels } from '../../data/api';
import { getLocale } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';
  return generatePageMetadata({
    title: isEs
      ? 'Absolute Group | Transporte Transfronterizo y Carga Completa México–EE. UU.'
      : 'Absolute Group | Cross-Border Freight & Full Truckload Mexico–USA',
    absoluteTitle: true,
    description: isEs
      ? 'Transporte transfronterizo entre México y EE. UU.: carga completa (FTL) puerta a puerta, seguridad certificada C-TPAT y rastreo satelital 24/7 desde Laredo, Texas.'
      : 'Cross-border freight between Mexico and the U.S.: door-to-door full truckload (FTL) trucking, C-TPAT certified security and 24/7 satellite tracking from Laredo, Texas.',
    locale,
    path: '/'
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const reelsData = await getReels(locale);

  return (
    <>
      <HeroSection />
      <ValueFeaturesSection />
      <ServicesSection />
      <ReachSection />
      <ReelsSection reels={reelsData.docs} />
    </>
  );
}
