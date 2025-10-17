import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

import type { Media as MediaType } from '@/payload-types'

export function getCloudinaryUrl(media: MediaType | string | undefined): string | undefined {
  if (typeof media === 'string') return media
  return media?.cloudinary?.secure_url || (media as any)?.url || (media as any)?.src
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  const caption = media && typeof media === 'object' ? media.caption : undefined

  // src can be string | StaticImageData | undefined
const src: string | StaticImageData | undefined = getCloudinaryUrl(media) || staticImage

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {src && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={typeof media === 'string' ? undefined : media}
          src={src} // no TypeScript error now
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
