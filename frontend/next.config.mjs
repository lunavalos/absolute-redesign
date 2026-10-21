import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Spanish URLs were translated; old English-path URLs under /es are already indexed, so
  // redirect them permanently (the next-intl middleware alone would answer with a 307).
  async redirects() {
    const moved = [
      ['/es/about-us', '/es/nosotros'],
      ['/es/services', '/es/servicios'],
      ['/es/services/:slug', '/es/servicios/:slug'],
      ['/es/team', '/es/equipo'],
      ['/es/contact-us', '/es/contacto'],
      ['/es/apply', '/es/bolsa-de-trabajo'],
      ['/es/satisfaction-survey', '/es/encuesta-de-satisfaccion']
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  transpilePackages: [
    'framer-motion',
    'lucide-react',
    'lottie-react',
    'next-intl',
    '@formatjs/intl'
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'absolute-fi.com'
      },
      {
        protocol: 'https',
        hostname: 'admin.absolute-fi.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
