import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        protocol: 'http',
        hostname: 'localhost',
        port: '3001'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
