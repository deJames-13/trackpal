import React from 'react'
import { ShieldCheck } from 'lucide-react'

interface TrustScoreBadgeProps {
  score: number
  size?: 'sm' | 'md'
  showIcon?: boolean
  className?: string
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  score,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const isHighTrust = score >= 98
  const isMediumTrust = score >= 95

  const colorStyles = isHighTrust
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
    : isMediumTrust
      ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
      : 'bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'

  const sizeStyles =
    size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-md border font-mono ${colorStyles} ${sizeStyles} ${className}`}
      aria-label={`Trust score: ${score} percent`}
    >
      {showIcon && (
        <ShieldCheck
          className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
          aria-hidden="true"
        />
      )}
      <span>{score}% Trust</span>
    </span>
  )
}
