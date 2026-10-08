import { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { RichTextBlock } from '../blocks/RichText'
import { ImageAndTextBlock } from '../blocks/ImageAndText'
import { CallToActionBlock } from '../blocks/CallToAction'
import { FeaturesBlock } from '../blocks/Features'
import { FAQBlock } from '../blocks/FAQ'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    readVersions: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'title',
    components: {

    },
    defaultColumns: ['title', 'slug', 'category', 'publishedAt'],
    livePreview: {
      url: ({ data }) => {
        return `http://localhost:3000/blog/${data.slug}?preview=true`
      },
    },
  },
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenido Principal',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: 'Título del Artículo',
            },
            {
              name: 'theme',
              type: 'radio',
              required: true,
              defaultValue: 'dark',
              label: 'Tema del Post (Oscuro/Claro)',
              admin: {
                layout: 'horizontal',
              },
              options: [
                { label: 'Modo Oscuro', value: 'dark' },
                { label: 'Modo Claro', value: 'light' },
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              label: 'Resumen / Extracto',
              admin: {
                description: 'Extracto manual para tarjetas y metadatos. Si se deja en blanco, se generará uno automáticamente.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen Destacada (Hero)',
            },
            {
              name: 'content',
              type: 'blocks',
              blocks: [RichTextBlock, ImageAndTextBlock, CallToActionBlock, FeaturesBlock, FAQBlock],
              localized: true,
              required: true,
              label: 'Bloques Dinámicos de Contenido*',
            },
          ],
        },
        {
          label: 'Clasificación & Metadatos',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'users',
                  required: true,
                  label: 'Autor',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                  label: 'Categoría',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
              label: 'Etiquetas (Tags)',
              admin: {
                description: 'Selecciona o crea etiquetas clave para este post.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'publishedAt',
                  type: 'date',
                  required: true,
                  label: 'Fecha de Publicación',
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    description: 'Define la fecha visible del artículo.',
                  },
                },
                {
                  name: 'readingTimeMinutes',
                  type: 'number',
                  label: 'Tiempo de Lectura (Minutos)',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'featuredPost',
              type: 'checkbox',
              label: 'Destacar Artículo (Featured Post)',
              admin: {
                description: 'Marca esta opción si quieres destacar este post sobre los demás.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              label: 'Slug (URL)',
              admin: {
                description: 'Se autogenera a partir del campo original si se deja vacío.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                    }
                    return value;
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
