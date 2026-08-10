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
  return generatePageMetadata({
    title: 'Cross-Border Transportation Services & Door-to-Door Freight',
    description:
      'Premier cross-border transportation between Mexico and the U.S. Door-to-door FTL trucking, C-TPAT certified security, and 24/7 satellite dispatch from Laredo, Texas.',
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
