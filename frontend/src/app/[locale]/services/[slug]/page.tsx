import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { Link } from '../../../../navigation';
import PageHeader from '../../../../components/PageHeader';
import BorderBeamButton from '../../../../components/BorderBeamButton';
import { services, getServiceBySlug, servicePath } from '../../../../data/services';
import { findServiceSlug, serviceSlugs } from '../../../../data/serviceSlugs';
import { serviceIcons } from '../serviceIcons';
import {
  generatePageMetadata,
  pick,
  localeUrl,
  publicPath,
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  JsonLd,
  ORGANIZATION_ID,
  SEO_LOCALES
} from '../../../../lib/seo';

export function generateStaticParams() {
  return SEO_LOCALES.flatMap((locale) => services.map((service) => ({ locale, slug: pick(service.slug, locale) })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug, locale);
  if (!service) return {};

  return generatePageMetadata({
    title: pick(service.metaTitle, locale),
    description: pick(service.metaDescription, locale),
    keywords: pick(service.keywords, locale),
    locale,
    path: servicePath(service),
    ogImage: service.image
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug, locale);
  if (!service) {
    // The other language's slug (e.g. /es/servicios/full-truckload-ftl) → 301 to this language's URL.
    const match = findServiceSlug(slug);
    if (!match) notFound();
    permanentRedirect(`/${locale}${publicPath(locale, `/services/${pick(serviceSlugs[match.id], locale)}`)}`);
  }

  const isEs = locale === 'es';
  const Icon = serviceIcons[service.id];
  const name = pick(service.name, locale);
  const faqs = pick(service.faqs, locale);
  const related = services.filter((s) => s.id !== service.id);
  const url = localeUrl(locale, servicePath(service));

  const jsonLd = [
    breadcrumbJsonLd(locale, [
      [isEs ? 'Servicios' : 'Services', '/services'],
      [name, servicePath(service)]
    ]),
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      serviceType: name,
      description: pick(service.metaDescription, locale),
      url,
      image: absoluteUrl(service.image),
      inLanguage: locale,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Mexico' }
      ]
    },
    faqJsonLd(faqs)
  ];

  return (
    <div className="bg-[#030712] min-h-screen pb-24">
      <JsonLd data={jsonLd} />

      <PageHeader
        badge={isEs ? 'Servicios' : 'Services'}
        badgeIcon={<Icon className="w-4 h-4" />}
        title={pick(service.h1, locale)}
        subtitle={pick(service.sub, locale)}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-500">
          <li><Link href="/" className="hover:text-white transition-colors">{isEs ? 'Inicio' : 'Home'}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/services" className="hover:text-white transition-colors">{isEs ? 'Servicios' : 'Services'}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-slate-300" aria-current="page">{name}</li>
        </ol>
      </nav>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-white font-bold text-2xl sm:text-3xl">
            {isEs ? `${name} con Absolute Group` : `${name} with Absolute Group`}
          </h2>
          {pick(service.intro, locale).map((paragraph) => (
            <p key={paragraph} className="text-slate-400 leading-relaxed">{paragraph}</p>
          ))}
          <p className="text-slate-400 leading-relaxed">{pick(service.desc, locale)}</p>

          <ul className="space-y-3 pt-2">
            {pick(service.benefits, locale).map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-slate-200">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/contact-us">
              <BorderBeamButton isRed={true}>
                {isEs ? 'Solicitar cotización' : 'Request a Quote'}
                <ArrowRight className="w-3.5 h-3.5" />
              </BorderBeamButton>
            </Link>
            <a href="tel:9567276004" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              (956) 727-6004
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-800/60">
          <Image
            src={service.image}
            alt={`${name} — Absolute Group, Laredo, TX`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-white font-bold text-2xl sm:text-3xl mb-8">
          {isEs ? `Preguntas frecuentes sobre ${name}` : `${name} FAQ`}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl" open>
              <summary className="cursor-pointer list-none text-white font-semibold flex items-center justify-between gap-4">
                <h3>{faq.q}</h3>
                <span className="text-blue-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related services — internal links between service pages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-white font-bold text-2xl mb-8">{isEs ? 'Otros servicios' : 'Related Services'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {related.map((other) => {
            const OtherIcon = serviceIcons[other.id];
            return (
              <Link
                key={other.id}
                href={{ pathname: '/services/[slug]', params: { slug: pick(other.slug, locale) } }}
                className="group flex items-center gap-3 p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl hover:bg-slate-800/40 hover:border-slate-700 transition-all"
              >
                <OtherIcon className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white">{pick(other.name, locale)}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
