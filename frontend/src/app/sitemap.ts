import type { MetadataRoute } from 'next';
import { languageAlternates, localeUrl, SEO_LOCALES, type LocalizedPath } from '../lib/seo';
import { services, servicePath } from '../data/services';
import { getBlogPostSlugs } from '../data/api';

export const revalidate = 3600;

type Entry = { path: LocalizedPath; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: string };

const staticPages: Entry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  ...services.map((service) => ({ path: servicePath(service), priority: 0.9, changeFrequency: 'monthly' as const })),
  { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact-us', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/team', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/reels', priority: 0.4, changeFrequency: 'weekly' },
  { path: '/apply', priority: 0.5, changeFrequency: 'monthly' }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: Entry[] = [];
  try {
    blogPages = (await getBlogPostSlugs()).map((post) => ({
      path: { en: `/blog/${post.slug.en}`, es: `/blog/${post.slug.es}` },
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: post.updatedAt
    }));
  } catch {
    // CMS unavailable at build time — ship the sitemap without blog URLs.
  }

  return [...staticPages, ...blogPages].flatMap(({ path, priority, changeFrequency, lastModified }) =>
    SEO_LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: lastModified ? new Date(lastModified) : new Date(),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) }
    }))
  );
}
