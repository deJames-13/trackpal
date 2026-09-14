import React from 'react'

export const CardSkeleton: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 animate-pulse space-y-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-3">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>
    </div>
  )
}

export const TableRowSkeleton: React.FC = () => {
  return (
    <tr
      className="animate-pulse border-b border-neutral-100 dark:border-neutral-800"
      aria-hidden="true"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-2.5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </td>
      <td className="py-4 px-4">
        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </td>
      <td className="py-4 px-4">
        <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </td>
      <td className="py-4 px-4">
        <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </td>
    </tr>
  )
}
