import { Metadata } from 'next';

// Production host is www — absolute-fi.com 308-redirects here, so canonicals must use it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.absolute-fi.com').replace(/\/$/, '');
export const SITE_NAME = 'Absolute Group Inc.';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOGO_URL = `${SITE_URL}/images/logo%20Absolute.png`;
export const SEO_LOCALES = ['en', 'es'] as const;

export type Localized<T = string> = { en: T; es: T };

export function pick<T>(value: Localized<T>, locale: string): T {
  return locale === 'es' ? value.es : value.en;
}

/** Absolute URL for a path under a locale, e.g. localeUrl('es', '/services') → https://www.absolute-fi.com/es/services */
export function localeUrl(locale: string, path = '/'): string {
  const cleanPath = path === '/' || path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${cleanPath}`;
}

export function absoluteUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${encodeURI(decodeURI(pathOrUrl))}`;
}

/** hreflang map shared by page metadata and the sitemap. */
export function languageAlternates(path = '/') {
  return {
    en: localeUrl('en', path),
    es: localeUrl('es', path),
    'x-default': localeUrl('en', path)
  };
}

interface GeneratePageMetadataOptions {
  title: string;
  description: string;
  locale: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: 'website' | 'article';
  /** Skip the " | Absolute Group" suffix (e.g. the home page title already carries the brand). */
  absoluteTitle?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '/',
  ogImage = '/images/logo-wall.jpg',
  keywords,
  noIndex = false,
  type = 'website',
  absoluteTitle = false
}: GeneratePageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Absolute Group`;
  const url = localeUrl(locale, path);
  const image = absoluteUrl(ogImage)!;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      // Each language version is canonical to itself; hreflang links the pair.
      canonical: url,
      languages: languageAlternates(path)
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_MX'],
      type
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
        }
  };
}

/** BreadcrumbList JSON-LD from [name, path] pairs (Home is prepended). */
export function breadcrumbJsonLd(locale: string, items: Array<[string, string]>) {
  const trail: Array<[string, string]> = [[locale === 'es' ? 'Inicio' : 'Home', '/'], ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: localeUrl(locale, path)
    }))
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : { '@context': 'https://schema.org', ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  );
}
