import { generatePageMetadata } from '../../../lib/seo';
import AboutUsClient from './AboutUsClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';
  return generatePageMetadata({
    title: isEs ? 'Nosotros | Especialistas en Logística Transfronteriza' : 'About Us | Cross-Border Logistics Specialists',
    description: isEs
      ? 'Conozca cómo Absolute Group creció de un solo camión en 2011 a una flota de más de 200 tractocamiones con carga puerta a puerta segura entre México y Estados Unidos.'
      : 'Learn how Absolute Group grew from a single truck in 2011 to a 200+ power unit fleet providing secure door-to-door freight between Mexico and the United States.',
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
