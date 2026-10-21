import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './i18n';
import { pathnames } from './pathnames';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
