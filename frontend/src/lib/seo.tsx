import { Metadata } from 'next';

const BASE_URL = 'https://absolute-fi.com';

interface GeneratePageMetadataOptions {
  title: string;
  description: string;
  locale: string;
  path?: string;
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  ogImage = '/images/logo-wall.jpg'
}: GeneratePageMetadataOptions): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localizedPath = locale === 'en' ? cleanPath : `/${locale}${cleanPath}`;
  const canonicalUrl = `${BASE_URL}${locale === 'en' ? cleanPath : `/en${cleanPath}`}`;

  return {
    title: `${title} | Absolute Group Inc.`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${BASE_URL}/en${cleanPath}`,
        'es-MX': `${BASE_URL}/es${cleanPath}`,
        'x-default': `${BASE_URL}/en${cleanPath}`
      }
    },
    openGraph: {
      title: `${title} | Absolute Group Inc.`,
      description,
      url: `${BASE_URL}${localizedPath}`,
      siteName: 'Absolute Group Inc — Cross-Border Logistics Specialists',
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Absolute Group Inc.`,
      description,
      images: [`${BASE_URL}${ogImage}`]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
