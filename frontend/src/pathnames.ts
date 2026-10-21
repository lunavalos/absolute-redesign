// Internal route (folder name) → public URL per locale. Spanish URLs are translated for SEO.
export const pathnames = {
  '/': '/',
  '/about-us': { en: '/about-us', es: '/nosotros' },
  '/services': { en: '/services', es: '/servicios' },
  '/services/[slug]': { en: '/services/[slug]', es: '/servicios/[slug]' },
  '/team': { en: '/team', es: '/equipo' },
  '/blog': '/blog',
  '/blog/[slug]': '/blog/[slug]',
  '/reels': '/reels',
  '/contact-us': { en: '/contact-us', es: '/contacto' },
  '/apply': { en: '/apply', es: '/bolsa-de-trabajo' },
  '/satisfaction-survey': { en: '/satisfaction-survey', es: '/encuesta-de-satisfaccion' }
} as const;

export type AppPathname = keyof typeof pathnames;
