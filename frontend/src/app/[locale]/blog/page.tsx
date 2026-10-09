import Image from 'next/image';
import { Link } from '../../../navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getBlogPosts, getMediaUrl } from '../../../data/api';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import ShapeGrid from '../../../components/ShapeGrid';

import PageHeader from '../../../components/PageHeader';

export default async function BlogListingPage() {
  const t = await getTranslations('Blog');
  const locale = await getLocale();

  const data = await getBlogPosts(locale);
  const posts = data.docs;

  return (
    <div className="space-y-16 pb-24">
      
      {/* Hero Banner with Background Video */}
      <PageHeader
        badge={t('badge')}
        badgeIcon={<BookOpen className="w-4 h-4" />}
        title={t('title')}
      />

      {/* Blog Post Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-8">
          {posts.map((post) => (
            <article key={post.id} className="relative w-full h-[480px] rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src={getMediaUrl(post.heroImage?.url)}
                alt={post.heroImage?.alt || post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay (Blue to Black) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#091C3D]/80 to-[#0E4194]/30 opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <h2 className="text-white text-lg font-bold uppercase leading-snug mb-8 line-clamp-4">
                  {post.title}
                </h2>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-5">
                  <span className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-xs font-bold uppercase tracking-wide transition-colors"
                  >
                    {locale === 'es' ? 'Leer Artículo' : 'Read Article'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
