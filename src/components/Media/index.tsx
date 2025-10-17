// Media.tsx
import Image from 'next/image'
import React from 'react'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

export interface MediaProps {
  src?: string | StaticImageData // allow string or StaticImageData
  resource?: MediaType | string
  imgClassName?: string
  className?: string
  size?: string
  fill?: boolean
  priority?: boolean
}

export const Media: React.FC<MediaProps> = ({ src, resource, imgClassName, className, size, fill, priority }) => {
  if (!src) return null

  // Handle caption for different resource types
  let alt = 'media'
  if (resource) {
    if (typeof resource === 'string') {
      alt = resource
    } else if (resource.alt) {
      alt = resource.alt
    }
  }

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <Image
        src={src} // now accepts string or StaticImageData
        alt={alt}
        width={800}
        height={600}
        className={cn("object-cover rounded-lg", imgClassName)}
        sizes={size}
        fill={fill}
        priority={priority}
      />
    </div>
  )
}
