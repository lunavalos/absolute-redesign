import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '../../../../navigation';
import { generatePageMetadata } from '../../../../lib/seo';
import { getBlogPostBySlug, getBlogPosts, getMediaUrl } from '../../../../data/api';
import { BlocksRenderer } from '../../../../components/BlocksRenderer';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export async function generateStaticParams() {
  // If we want to statically generate, we could fetch all posts in all locales.
  // For now, we return empty so they are fetched on demand.
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return generatePageMetadata({
      title: 'Article Not Found',
      description: 'Blog post not found',
      locale,
      path: '/blog'
    });
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    locale,
    path: `/blog/${post.slug}`,
    ogImage: post.heroImage?.url
  });
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) notFound();

  const isEs = locale === 'es';
  const isLight = post.theme === 'light';
  const articleBg = isLight ? 'bg-white text-slate-900' : 'bg-[#030712] text-slate-300';

  // Article JSON-LD Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': `https://absolute-fi.com${post.heroImage?.url}`,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': post.author?.name || 'Absolute Group'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Absolute Group Inc.',
      'logo': 'https://absolute-fi.com/images/logo%20Absolute.png'
    }
  };

  return (
    <article className={`${articleBg} min-h-screen pb-24 transition-colors duration-300`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero with Faded Image Background */}
      <div className="relative w-full overflow-hidden">
        {post.heroImage && (
          <Image
            src={getMediaUrl(post.heroImage.url)}
            alt={post.heroImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Dark Gradient Overlay to fade into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#091C3D]/80 to-[#091C3D]/40" />

        {/* Hero Content natively sizing the wrapper */}
        <div className="relative flex flex-col pt-28 pb-10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-8">
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEs ? 'Regresar al Blog' : 'Back to Blog'}
            </Link>

            <h1 className="text-[46px] font-extrabold text-white tracking-tight leading-tight max-w-4xl text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-400 border-t border-white/10 pt-6">
              
              <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-300 rounded-full uppercase tracking-wider text-[10px] sm:text-xs font-bold">
                {post.category?.name || 'Blog'}
              </span>
              
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {new Date(post.publishedAt).toLocaleDateString(isEs ? 'es-MX' : 'en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {post.author.name}
                </span>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Article Body using Dynamic Blocks Renderer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <BlocksRenderer blocks={post.content} theme={post.theme || 'dark'} />
      </div>

    </article>
  );
}
