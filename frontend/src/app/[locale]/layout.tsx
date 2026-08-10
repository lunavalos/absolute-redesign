import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap'
});

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
  setRequestLocale(locale);
  const messages = await getMessages();

  // Schema.org Corporate Entity & Local Business JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://absolute-fi.com/#organization',
        'name': 'Absolute Group Inc.',
        'url': 'https://absolute-fi.com',
        'logo': 'https://absolute-fi.com/images/logo%20Absolute.png',
        'telephone': '(956) 727 6004',
        'email': 'contact@absolute-fi.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1208 Vidal Cantu Rd.',
          'addressLocality': 'Laredo',
          'addressRegion': 'TX',
          'postalCode': '78045',
          'addressCountry': 'US'
        }
      },
      {
        '@type': 'LogisticsService',
        'name': 'Door-to-Door FTL & Cross-Border Transportation',
        'provider': { '@id': 'https://absolute-fi.com/#organization' },
        'areaServed': ['United States', 'Mexico'],
        'description': 'Cross-border full truckload (FTL) transportation, border clearance, and expedited freight services.'
      }
    ]
  };

  return (
    <html lang={locale} className={rubik.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col justify-between">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
