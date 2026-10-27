import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: false,
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    const disableResolveUrlSourceMap = (rules: any[]) => {
      for (const rule of rules) {
        if (!rule) continue
        if (rule.oneOf && Array.isArray(rule.oneOf)) {
          disableResolveUrlSourceMap(rule.oneOf)
        }
        if (Array.isArray(rule.use)) {
          for (const item of rule.use) {
            if (
              item &&
              typeof item === 'object' &&
              typeof item.loader === 'string' &&
              item.loader.includes('resolve-url-loader')
            ) {
              if (item.options) {
                item.options.sourceMap = false
              }
            }
          }
        }
      }
    }

    if (webpackConfig.module?.rules) {
      disableResolveUrlSourceMap(webpackConfig.module.rules)
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  output: 'standalone',
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
