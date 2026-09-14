import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Plus, PiggyBank } from 'lucide-react'
import { useGroups } from '../../context/GroupsContext'
import { useModals } from '../../context/ModalContext'
import { EmptyState } from '../../components/ui/EmptyState'

export const GroupsListTab: React.FC = () => {
  const { displayedGroups, setSelectedGroupId } = useGroups()
  const { openNewGroup } = useModals()
  const navigate = useNavigate()

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId)
    navigate({ to: '/groups/$groupId', params: { groupId } })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
            Active Paluwagan Circles ({displayedGroups.length})
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            All active and completed rotating savings circles in your portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewGroup}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] transition-all cursor-pointer shadow-xs w-fit focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
        >
          <span className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
            <span>Create New Circle</span>
          </span>
        </button>
      </div>

      {displayedGroups.length === 0 ? (
        <EmptyState
          icon={<PiggyBank className="w-12 h-12 stroke-1" />}
          title="No circles found"
          description="You don't have any circles matching this criteria or search term."
          actionLabel="+ Create New Circle"
          onAction={openNewGroup}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedGroups.map((group) => {
            const progressPercent = Math.round(
              (group.currentRound / group.totalRounds) * 100,
            )
            const paidCount = group.members.filter(
              (m) => m.currentCyclePaid,
            ).length

            return (
              <div
                key={group.id}
                onClick={() => handleSelectGroup(group.id)}
                className="p-6 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 hover:border-[#F5B800] dark:hover:border-[#F5B800] transition-all cursor-pointer flex flex-col justify-between shadow-xs group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectGroup(group.id)
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200">
                      {group.category}
                    </span>
                    <span className="text-xs font-bold text-neutral-500 capitalize">
                      {group.frequency}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-neutral-950 dark:text-white group-hover:text-[#F5B800] transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Total Pot
                      </span>
                      <span className="text-xl font-black text-neutral-950 dark:text-white">
                        ₱{group.potAmount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Current Cycle
                      </span>
                      <span className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                        {group.currentRound} / {group.totalRounds}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                        {paidCount}/{group.members.length} contributed
                      </span>
                      <span className="font-black text-neutral-950 dark:text-[#F5B800]">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F5B800] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Next:{' '}
                    <strong className="text-neutral-800 dark:text-neutral-200 font-bold">
                      {group.nextPayoutDate}
                    </strong>
                  </span>
                  <span className="text-xs font-black text-neutral-950 dark:text-[#F5B800] group-hover:translate-x-0.5 transition-transform">
                    Open Circle →
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
