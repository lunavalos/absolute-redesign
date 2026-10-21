import { generatePageMetadata, pick, localeUrl, breadcrumbJsonLd, faqJsonLd, JsonLd, ORGANIZATION_ID } from '../../../lib/seo';
import { Link } from '../../../navigation';
import { services, servicesHubFaqs } from '../../../data/services';
import { serviceIcons } from './serviceIcons';
import { Layers, ArrowRight } from 'lucide-react';

import PageHeader from '../../../components/PageHeader';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';
  return generatePageMetadata({
    title: isEs
      ? 'Servicios de Carga y Transporte Transfronterizo México–EE. UU.'
      : 'Freight & Cross-Border Services | Mexico–USA FTL',
    description: isEs
      ? 'Carga completa (FTL), puerta a puerta, cruce fronterizo, carga expedita, almacenaje y transbordo entre México y EE. UU. desde Laredo, TX. Transportista C-TPAT.'
      : 'Full truckload (FTL), door-to-door, border crossing, expedited freight, warehousing and transloading between Mexico and the U.S. from Laredo, TX. C-TPAT carrier.',
    keywords: isEs
      ? ['servicios de carga', 'transporte transfronterizo', 'carga completa', 'FTL México Estados Unidos', 'cruce fronterizo Laredo']
      : ['freight services', 'cross-border services', 'full truckload', 'FTL Mexico USA', 'cross-border trucking Laredo'],
    locale,
    path: '/services'
  });
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const faqs = pick(servicesHubFaqs, locale);

  const jsonLd = [
    breadcrumbJsonLd(locale, [[isEs ? 'Servicios' : 'Services', '/services']]),
    {
      '@type': 'ItemList',
      name: isEs ? 'Servicios de carga y transporte transfronterizo' : 'Freight & cross-border services',
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: pick(service.name, locale),
          url: localeUrl(locale, `/services/${service.slug}`),
          provider: { '@id': ORGANIZATION_ID }
        }
      }))
    },
    faqJsonLd(faqs)
  ];

  return (
    <div className="bg-[#030712] min-h-screen pb-24">
      <JsonLd data={jsonLd} />

      {/* Hero Banner with Background Video */}
      <PageHeader
        badge={isEs ? 'Oferta de Servicios' : 'Comprehensive Solutions'}
        badgeIcon={<Layers className="w-4 h-4" />}
        title={isEs ? 'Servicios de Carga y Transporte Transfronterizo' : 'Freight & Cross-Border Services'}
        subtitle={
          isEs
            ? 'Carga completa (FTL), puerta a puerta, cruce fronterizo y más entre México y Estados Unidos, operado con flota propia desde Laredo, Texas.'
            : 'Full truckload (FTL), door-to-door, border crossing and more between Mexico and the United States, run on our own fleet from Laredo, Texas.'
        }
      />

      {/* Dark Theme Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col p-6 lg:p-8 bg-slate-900/40 border border-slate-800/60 rounded-2xl hover:bg-slate-800/40 hover:border-slate-700 transition-all duration-300"
              >
                {/* Header: Title and Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-white font-bold text-lg leading-tight uppercase tracking-wide">
                    {pick(service.title, locale)}
                  </h2>
                </div>

                {/* Thin Divider */}
                <hr className="border-t border-slate-800/60 mb-5 group-hover:border-slate-700 transition-colors" />

                {/* Content: Subtitle & Description */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-blue-300 leading-relaxed">
                    {pick(service.sub, locale)}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pick(service.desc, locale)}
                  </p>
                </div>

                <span className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                  {isEs ? `Ver ${pick(service.name, locale)}` : `Explore ${pick(service.name, locale)}`}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ — visible answers that search engines and AI assistants can quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-white font-bold text-2xl sm:text-3xl mb-8">
          {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
              <summary className="cursor-pointer list-none text-white font-semibold flex items-center justify-between gap-4">
                <h3>{faq.q}</h3>
                <span className="text-blue-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
