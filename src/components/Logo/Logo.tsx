import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="flex items-center justify-center gap-2">
      <img
        alt="Payload Logo"
        width={40}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
        src="https://res.cloudinary.com/doagv0qou/image/upload/v1760727314/qualifier-logo_hmxm4d.png"
      />
      <Link
        href="/"
        className="font-bree bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 bg-clip-text text-3xl tracking-wider text-transparent hover:opacity-90"
      >
        Qualifier
      </Link>
    </div>
  )
}
