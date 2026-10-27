import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { SITE_URL, ORGANIZATION_ID, LOGO_URL, localeUrl, JsonLd } from '../../lib/seo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JoinTeamBubble from '../../components/JoinTeamBubble';
import '../globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap'
});

import ReCaptchaProvider from '../../components/ReCaptchaProvider';
import Analytics from '../../components/Analytics';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Without this, any unknown first segment (e.g. /robots.txt before it existed) renders as a page.
  if (!locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const isEs = locale === 'es';

  // Schema.org Organization + LocalBusiness + WebSite, shared by every page.
  const jsonLd = [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': ORGANIZATION_ID,
      name: 'Absolute Group Inc.',
      alternateName: 'Absolute Group',
      url: SITE_URL,
      logo: LOGO_URL,
      image: `${SITE_URL}/images/logo-wall.jpg`,
      description: isEs
        ? 'Transportista transfronterizo con flota propia en Laredo, Texas: carga completa (FTL), puerta a puerta, cruce fronterizo, carga expedita, almacenaje y transbordo entre México y EE. UU.'
        : 'Asset-based cross-border carrier in Laredo, Texas: full truckload (FTL), door-to-door freight, border crossing, expedited freight, warehousing and transloading between Mexico and the U.S.',
      foundingDate: '2011',
      telephone: '+1-956-727-6004',
      email: 'contact@absolute-fi.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1208 Vidal Cantu Rd.',
        addressLocality: 'Laredo',
        addressRegion: 'TX',
        postalCode: '78045',
        addressCountry: 'US'
      },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Mexico' }
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-956-727-6004',
        contactType: 'sales',
        areaServed: ['US', 'MX'],
        availableLanguage: ['English', 'Spanish']
      },
      sameAs: [
        'https://www.facebook.com/AbsoluteGroupInc',
        'https://www.instagram.com/absolutegroupinc/',
        'https://www.youtube.com/@AbsoluteGroupInc'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: localeUrl(locale),
      name: 'Absolute Group',
      inLanguage: locale,
      publisher: { '@id': ORGANIZATION_ID }
    }
  ];

  return (
    <html lang={locale} className={rubik.variable}>
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body className={`font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col justify-between ${rubik.variable}`}>
        <ReCaptchaProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <JoinTeamBubble />
          </NextIntlClientProvider>
        </ReCaptchaProvider>
        <Analytics />
      </body>
    </html>
  );
}
