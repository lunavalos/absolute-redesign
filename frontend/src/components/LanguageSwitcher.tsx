'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '../navigation';
import { findServiceSlug, serviceSlugs } from '../data/serviceSlugs';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ slug?: string }>();

  const toggleLanguage = (newLocale: 'en' | 'es') => {
    if (newLocale === locale) return;
    if (pathname === '/services/[slug]') {
      // Service slugs are translated, so map to the other language's slug.
      const match = findServiceSlug(params.slug ?? '');
      const slug = match ? serviceSlugs[match.id][newLocale] : params.slug ?? '';
      router.replace({ pathname, params: { slug } }, { locale: newLocale });
    } else if (pathname === '/blog/[slug]') {
      router.replace({ pathname, params: { slug: params.slug ?? '' } }, { locale: newLocale });
    } else {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
      <Globe className="w-4 h-4 ml-2 text-slate-500 mr-1" />
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          locale === 'en'
            ? 'bg-[#0E4194] text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage('es')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          locale === 'es'
            ? 'bg-[#0E4194] text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        ES
      </button>
    </div>
  );
}
