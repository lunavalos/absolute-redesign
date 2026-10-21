import { ReactNode } from 'react';
import { generatePageMetadata } from '../../../lib/seo';

// The page itself is a client component, so its metadata lives here.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';
  return generatePageMetadata({
    title: isEs ? 'Contacto | Cotice su Flete México–EE. UU.' : 'Contact Us | Get a Mexico–USA Freight Quote',
    description: isEs
      ? 'Solicite una cotización de carga completa (FTL), cruce fronterizo o carga expedita. Llame al (956) 727-6004 o escríbanos. Laredo, TX.'
      : 'Request a quote for full truckload (FTL), border crossing or expedited freight. Call (956) 727-6004 or send us a message. Laredo, TX.',
    locale,
    path: '/contact-us'
  });
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
