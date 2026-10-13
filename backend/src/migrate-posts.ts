import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import { getPayload } from 'payload'
import configPromise from './payload.config'

interface LexicalTextNode {
  type: 'text'
  text: string
  format: number
  style: string
  mode: 'normal'
  version: 1
}

interface LexicalElementNode {
  type: string
  tag?: string
  listType?: string
  start?: number
  value?: number
  direction: 'ltr'
  format: string | number
  indent: number
  version: 1
  children: any[]
  fields?: Record<string, any>
}

function createTextNode(text: string, format = 0): LexicalTextNode {
  return {
    type: 'text',
    text,
    format,
    style: '',
    mode: 'normal',
    version: 1,
  }
}

function createParagraphNode(children: any[]): LexicalElementNode {
  return {
    type: 'paragraph',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children,
  }
}

function createHeadingNode(text: string, tag: 'h2' | 'h3' = 'h2'): LexicalElementNode {
  return {
    type: 'heading',
    tag,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [createTextNode(text, 0)],
  }
}

function createListNode(items: string[]): LexicalElementNode {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: items.map((item, idx) => ({
      type: 'listitem',
      value: idx + 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [createTextNode(item, 0)],
    })),
  }
}

function createLinkParagraphNode(text: string, url: string): LexicalElementNode {
  return {
    type: 'paragraph',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'link',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        fields: {
          url,
          newTab: true,
        },
        children: [createTextNode(text, 1)],
      },
    ],
  }
}

function parseWpPostHtml(html: string, postTitle: string) {
  const dom = new JSDOM(html)
  const doc = dom.window.document

  // Remove unnecessary Elementor meta headers & styles
  doc.querySelectorAll('.elementor-widget-post-info, .elementor-shape, style, script').forEach((el) => el.remove())

  const lexicalChildren: any[] = []
  let ctaBlock: any = null

  const widgets = Array.from(doc.querySelectorAll('.elementor-widget'))

  if (widgets.length === 0) {
    // Non-elementor post (like LMCA post)
    const elements = doc.querySelectorAll('h1, h2, h3, h4, p, ul')
    elements.forEach((el) => {
      const tag = el.tagName.toLowerCase()
      const text = el.textContent?.trim() || ''
      if (!text) return

      if (tag.startsWith('h')) {
        lexicalChildren.push(createHeadingNode(text, tag === 'h3' ? 'h3' : 'h2'))
      } else if (tag === 'p') {
        lexicalChildren.push(createParagraphNode([createTextNode(text)]))
      } else if (tag === 'ul') {
        const items = Array.from(el.querySelectorAll('li'))
          .map((li) => li.textContent?.trim() || '')
          .filter(Boolean)
        if (items.length > 0) {
          lexicalChildren.push(createListNode(items))
        }
      }
    })
  } else {
    widgets.forEach((w, idx) => {
      const type = w.getAttribute('data-widget_type') || ''

      // Video Widget
      if (type.includes('video')) {
        const settingsStr = w.getAttribute('data-settings') || '{}'
        try {
          const settings = JSON.parse(settingsStr)
          if (settings.youtube_url) {
            lexicalChildren.push(createParagraphNode([createTextNode(settings.youtube_url)]))
          }
        } catch (e) {}
        return
      }

      // Heading Widget
      if (type.includes('heading')) {
        const h = w.querySelector('h1, h2, h3, h4')
        if (h) {
          const text = h.textContent?.trim() || ''
          if (!text) return

          // Skip first heading if it's just the article title
          if (idx === 0 && (text.toLowerCase() === postTitle.toLowerCase() || text.length > 90)) {
            return
          }

          // Check if this heading represents a closing CTA
          if (
            text.includes('The Logistics Partner Your Operation Needs') ||
            text.includes('Ready to Elevate Your Cross-Border Transportation') ||
            text.includes('Ready for your freight to cross')
          ) {
            ctaBlock = {
              title: text,
              description: '',
              buttonText: 'Contact Us Now',
              buttonLink: '/contact-us',
            }
            return
          }

          const tag = h.tagName.toLowerCase() === 'h3' ? 'h3' : 'h2'
          lexicalChildren.push(createHeadingNode(text, tag))
        }
        return
      }

      // Text Editor Widget
      if (type.includes('text-editor')) {
        const paragraphs = w.querySelectorAll('p')
        if (paragraphs.length > 0) {
          paragraphs.forEach((pEl) => {
            const text = pEl.textContent?.trim() || ''
            if (!text) return

            // If we have a pending CTA block and need description
            if (ctaBlock && !ctaBlock.description) {
              ctaBlock.description = text
              return
            }

            lexicalChildren.push(createParagraphNode([createTextNode(text)]))
          })
        } else {
          const text = w.textContent?.trim() || ''
          if (text) {
            if (ctaBlock && !ctaBlock.description) {
              ctaBlock.description = text
            } else {
              lexicalChildren.push(createParagraphNode([createTextNode(text)]))
            }
          }
        }
        return
      }

      // Icon List Widget
      if (type.includes('icon-list')) {
        const items = Array.from(w.querySelectorAll('.elementor-icon-list-item'))
          .map((li) => {
            const a = li.querySelector('a')
            const text = li.querySelector('.elementor-icon-list-text')?.textContent?.trim() || li.textContent?.trim() || ''
            return {
              text,
              url: a ? a.href : null,
            }
          })
          .filter((i) => Boolean(i.text))

        const hasLinks = items.some((i) => Boolean(i.url))
        if (hasLinks) {
          items.forEach((item) => {
            if (item.url) {
              const url = item.url.replace('https://absolute-fi.com', '')
              lexicalChildren.push(createLinkParagraphNode(`👉 ${item.text}`, url.startsWith('/') || url.startsWith('http') ? url : `/${url}`))
            } else {
              lexicalChildren.push(createParagraphNode([createTextNode(item.text)]))
            }
          })
        } else {
          const textItems = items.map((i) => i.text)
          if (textItems.length > 0) {
            lexicalChildren.push(createListNode(textItems))
          }
        }
        return
      }
    })
  }

  // Build Payload blocks array
  const blocks: any[] = [
    {
      blockType: 'richText',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: lexicalChildren,
        },
      },
    },
  ]

  // Add CTA block at bottom
  if (ctaBlock) {
    blocks.push({
      blockType: 'cta',
      title: ctaBlock.title,
      description: ctaBlock.description || 'Contact our dispatch and sales specialists in Laredo, TX for immediate rates and customized logistics planning.',
      buttonText: ctaBlock.buttonText || 'Schedule a Planning Session',
      buttonLink: ctaBlock.buttonLink || '/contact-us',
    })
  } else {
    // Default CTA for every post to maintain consistency
    blocks.push({
      blockType: 'cta',
      title: 'Absolute Group: The Logistics Partner Your Operation Needs',
      description: 'Ready for your freight to cross without stopping? Talk to an Absolute logistics specialist today.',
      buttonText: 'Contact Us Now',
      buttonLink: '/contact-us',
    })
  }

  return { blocks, lexicalNodesCount: lexicalChildren.length }
}

async function runMigration() {
  console.log('🚀 Iniciando limpieza y migración de los 14 posts de WordPress...')

  const jsonPath = path.resolve('all_wp_posts.json')
  if (!fs.existsSync(jsonPath)) {
    throw new Error('No se encontró el archivo all_wp_posts.json')
  }

  const wpPosts = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  console.log(`📦 Se cargaron ${wpPosts.length} posts originales de WordPress.`)

  const payloadConfig = await configPromise
  const payload = await getPayload({ config: payloadConfig })

  // Obtenemos todos los posts existentes en Payload
  const dbPosts = await payload.find({
    collection: 'posts',
    limit: 100,
    locale: 'en',
  })

  console.log(`🗄️ Posts encontrados en Payload CMS: ${dbPosts.docs.length}`)

  let successCount = 0

  for (const wpPost of wpPosts) {
    // Buscar el post correspondiente en Payload
    const wpSlug = wpPost.slug.toLowerCase()
    const wpTitle = wpPost.title.rendered.toLowerCase().replace(/&#8217;/g, '’').replace(/&#8211;/g, '–')

    const targetPost = dbPosts.docs.find((p: any) => {
      const pSlug = (p.slug || '').toLowerCase()
      const pTitle = (p.title || '').toLowerCase()
      return (
        pSlug === wpSlug ||
        pSlug.includes(wpSlug) ||
        wpSlug.includes(pSlug) ||
        (wpSlug.includes('ctpat') && pSlug.includes('ctpat')) ||
        (wpSlug.includes('lmca') && pSlug.includes('lmca')) ||
        (wpSlug.includes('logistics-2026') && pSlug.includes('logistics')) ||
        pTitle === wpTitle ||
        pTitle.includes(wpTitle) ||
        wpTitle.includes(pTitle)
      )
    })

    if (!targetPost) {
      console.warn(`⚠️ No se encontró post en Payload para el slug de WP: ${wpPost.slug}`)
      continue
    }

    console.log(`\n⚙️ Procesando: [ID ${targetPost.id}] "${targetPost.title}"...`)

    const { blocks, lexicalNodesCount } = parseWpPostHtml(wpPost.content.rendered, targetPost.title)

    console.log(`   ✨ Contenido limpio: ${lexicalNodesCount} nodos Lexical + ${blocks.length} bloques Payload.`)

    try {
      // Obtenemos los títulos y slugs actuales de EN y ES para no perderlos
      const currentEn = await payload.findByID({ collection: 'posts', id: targetPost.id, locale: 'en' })
      const currentEs = await payload.findByID({ collection: 'posts', id: targetPost.id, locale: 'es' })

      // Actualizamos versión en Inglés
      await payload.update({
        collection: 'posts',
        id: targetPost.id,
        locale: 'en',
        data: {
          title: currentEn.title || targetPost.title,
          slug: currentEn.slug || targetPost.slug,
          content: blocks,
        },
      })

      // Actualizamos versión en Español
      await payload.update({
        collection: 'posts',
        id: targetPost.id,
        locale: 'es',
        data: {
          title: currentEs.title || currentEn.title || targetPost.title,
          slug: currentEs.slug || currentEn.slug || targetPost.slug,
          content: blocks,
        },
      })

      console.log(`   ✅ Post ID ${targetPost.id} actualizado exitosamente en EN y ES!`)
      successCount++
    } catch (err: any) {
      console.error(`   ❌ Error actualizando post ID ${targetPost.id}:`, err?.message || err)
    }
  }

  console.log(`\n🎉 Migración completada! ${successCount} de ${wpPosts.length} posts fueron limpiados y actualizados.`)
  process.exit(0)
}

runMigration().catch((err) => {
  console.error('❌ Error fatal en migración:', err)
  process.exit(1)
})
