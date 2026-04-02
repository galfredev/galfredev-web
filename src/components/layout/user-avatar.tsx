'use client'

import type { AuthUserSummary } from '@/types/site'
import Image from 'next/image'

type UserAvatarProps = {
  user: Pick<AuthUserSummary, 'avatarUrl' | 'displayName' | 'initials'>
  size?: 'sm' | 'md' | 'lg'
}

const sizeClassMap = {
  sm: 'size-10 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-16 text-lg',
} as const

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = sizeClassMap[size]

  return (
    <span
      className={[
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(31,127,115,0.28),rgba(255,255,255,0.08))] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]',
        sizeClasses,
      ].join(' ')}
    >
      {user.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          alt={`Avatar de ${user.displayName}`}
          fill
          sizes={size === 'lg' ? '64px' : '44px'}
          className="object-cover"
        />
      ) : (
        <span>{user.initials}</span>
      )}
    </span>
  )
}
