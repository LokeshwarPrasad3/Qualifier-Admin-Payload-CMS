import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  // Handle both Page (with meta) and Post (with seo) types
  const metaImage =
    doc && 'meta' in doc ? doc.meta?.image : doc && 'seo' in doc ? doc.seo?.image : null
  const ogImage = getImageURL(metaImage)

  const metaTitle =
    doc && 'meta' in doc ? doc.meta?.title : doc && 'seo' in doc ? doc.seo?.title : null
  const title = metaTitle ? metaTitle + ' | Qualifier Admin Panel' : 'Qualifier Admin Panel'

  // Get description from either meta or seo
  const metaDescription =
    doc && 'meta' in doc ? doc.meta?.description : doc && 'seo' in doc ? doc.seo?.description : null

  return {
    description: metaDescription,
    openGraph: mergeOpenGraph({
      description: metaDescription || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
