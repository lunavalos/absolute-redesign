/**
 * URL slug from a title. Accents are stripped rather than dropped, so
 * "Guía de logística México" → "guia-de-logistica-mexico" (not "gua-de-logstica-mxico").
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-')
}
