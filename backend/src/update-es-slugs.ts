import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config.js'

async function run() {
  console.log('🔄 Actualizando Slugs en Español...')
  const payload = await getPayload({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    locale: 'es'
  })

  let updated = 0

  for (const post of posts.docs) {
    if (post.title) {
      const newSlug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
      try {
        await payload.update({
          collection: 'posts',
          id: post.id,
          locale: 'es',
          data: {
            slug: newSlug
          }
        })
        console.log(`✅ Slug ES actualizado: ${newSlug}`)
        updated++
      } catch (err) {
        console.error(`❌ Error actualizando slug para: ${post.title}`, err)
      }
    }
  }

  console.log(`\n🎉 Slugs actualizados: ${updated}`)
  process.exit(0)
}

run()
