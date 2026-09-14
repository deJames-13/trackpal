import React from 'react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/60 dark:bg-[#16181D]/60 ${className}`}
      role="status"
    >
      {icon && (
        <div className="mb-4 text-neutral-400 dark:text-neutral-500">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 px-4 py-2 text-xs font-bold rounded-xl bg-[#F5B800] text-neutral-950 hover:bg-[#E0A700] active:bg-[#C79200] transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800] focus-visible:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
