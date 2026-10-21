// Kept apart from services.ts so client components (language switcher) can map slugs
// between locales without bundling all the service copy.
export const serviceSlugs = {
  ftl: { en: 'full-truckload-ftl', es: 'carga-completa-ftl' },
  crossBorder: { en: 'cross-border-freight', es: 'carga-transfronteriza' },
  doorToDoor: { en: 'door-to-door-freight', es: 'carga-puerta-a-puerta' },
  expedited: { en: 'expedited-freight', es: 'carga-expedita' },
  warehousing: { en: 'warehousing', es: 'almacenaje-cross-docking' },
  transloading: { en: 'transloading', es: 'transbordo' }
} as const;

export type ServiceId = keyof typeof serviceSlugs;

/** Finds which service a slug belongs to, in any locale. */
export function findServiceSlug(slug: string): { id: ServiceId; locale: 'en' | 'es' } | undefined {
  for (const id of Object.keys(serviceSlugs) as ServiceId[]) {
    if (serviceSlugs[id].en === slug) return { id, locale: 'en' };
    if (serviceSlugs[id].es === slug) return { id, locale: 'es' };
  }
  return undefined;
}
