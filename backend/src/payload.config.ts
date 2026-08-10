import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Team } from './collections/Team'
import { Reels } from './collections/Reels'
import { Forms } from './collections/Forms'
import { JobApplications } from './collections/JobApplications'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: '*',
  csrf: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  admin: {
    user: Users.slug,
    components: {
      logout: {
        Button: '@/components/LogoutButton#LogoutButton',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Posts,
    Media,
    Categories,
    Tags,
    Team,
    Reels,
    Forms,
    JobApplications,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      collections: ['posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Absolute Group Inc. — ${doc?.title?.value || ''}`,
      generateDescription: ({ doc }) => doc?.excerpt?.value,
      generateURL: ({ doc }) => `https://absolute-fi.com/blog/${doc?.slug?.value || ''}`,
    }),
  ],
})
