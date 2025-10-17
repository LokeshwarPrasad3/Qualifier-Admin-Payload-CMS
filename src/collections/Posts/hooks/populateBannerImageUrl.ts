import type { CollectionBeforeChangeHook } from 'payload'
import type { Post } from '@/payload-types'

// Type checking is handled by the Post type from payload-types

export default async function populateBannerImageUrl({ doc, req, operation }: {
  doc: Post
  req: Parameters<CollectionBeforeChangeHook<Post>>[0]['req']
  operation: 'create' | 'update' | 'delete' | 'read'
}) {
  try {
    // Only run for create/update operations
    if (!['create', 'update'].includes(operation)) return doc

    const bannerImageId = doc?.bannerImage
    if (!bannerImageId) return doc

    // If bannerImage is expanded as an object, read URL fields directly
    if (typeof bannerImageId === 'object' && bannerImageId !== null) {
      const url =
        bannerImageId?.cloudinary?.secure_url || bannerImageId?.url || bannerImageId?.thumbnailURL
      if (url && doc?.bannerImageUrl !== url) {
        await req.payload.update({
          collection: 'posts',
          id: doc.id,
          data: { bannerImageUrl: url },
          overrideAccess: true,
        })
      }
      return doc
    }

    // Otherwise fetch the media document by ID
    const media = await req.payload.findByID({ collection: 'media', id: bannerImageId, req })
    if (!media) return doc

    const url = media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL
    if (url && doc?.bannerImageUrl !== url) {
      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { bannerImageUrl: url },
        overrideAccess: true,
      })
    }

    return doc
  } catch (err) {
    req.payload.logger.error('populateBannerImageUrl error', err)
    return doc
  }
}
