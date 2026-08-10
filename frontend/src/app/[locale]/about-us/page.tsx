import { generatePageMetadata } from '../../../lib/seo';
import AboutUsClient from './AboutUsClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'About Us | Premier Cross-Border Logistics Specialist',
    description:
      'Learn how Absolute Group grew from a single truck in 2011 to a 200+ power unit fleet providing secure door-to-door freight between Mexico and the United States.',
    locale,
    path: '/about-us'
  });
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return <AboutUsClient isEs={isEs} />;
}
