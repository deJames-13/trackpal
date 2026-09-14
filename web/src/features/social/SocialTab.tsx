import React, { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  UserPlus,
  Search,
  Users,
} from 'lucide-react'
import type { Friend } from '../../types'
import { CoinIcon } from '../../components/ui/CoinIcon'
import { useAuth } from '../auth/AuthContext'
import { useSocial } from '../../context/SocialContext'
import { useGroups } from '../../context/GroupsContext'
import { EmptyState } from '../../components/ui/EmptyState'

export const SocialTab: React.FC = () => {
  const { currentUser } = useAuth()
  const { friends } = useSocial()
  const { groups, inviteFriendToGroup } = useGroups()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFriendToInvite, setSelectedFriendToInvite] =
    useState<Friend | null>(null)
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState<string | null>(null)

  const filteredFriends = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendInvite = (friend: Friend, groupId: string) => {
    inviteFriendToGroup(friend, groupId)
    const targetGroup = groups.find((g) => g.id === groupId)
    setInviteSuccessMsg(
      `Invitation to "${targetGroup?.name || 'Circle'}" sent to ${friend.name}!`,
    )
    setSelectedFriendToInvite(null)

    setTimeout(() => {
      setInviteSuccessMsg(null)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {inviteSuccessMsg && (
        <div
          className="p-3.5 rounded-xl bg-neutral-950 text-[#F5B800] text-xs font-bold flex items-center justify-between shadow-md"
          role="status"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="w-4 h-4 text-[#F5B800]"
              aria-hidden="true"
            />
            <span>{inviteSuccessMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setInviteSuccessMsg(null)}
            className="cursor-pointer text-white/80 hover:text-white"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* 1. BENTO PROFILE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card (Span 8) */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#F5B800]"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-neutral-800 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {currentUser.name}
                  </h2>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    <span>Verified Saver</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                  {currentUser.email} • {currentUser.phone}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    Role: {currentUser.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Statistics Horizontal Units */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                Completed
              </span>
              <span className="text-xl font-black text-neutral-950 dark:text-white mt-0.5 block">
                {currentUser.completedCycles} Circles
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Zero defaults
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                On-Time Rate
              </span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {currentUser.onTimeRate}%
              </span>
              <span className="text-[10px] font-semibold text-neutral-500">
                Perfect record
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                Total Pooled
              </span>
              <span className="text-xl font-black text-neutral-950 dark:text-white mt-0.5 block">
                ₱{currentUser.totalContributed.toLocaleString()}
              </span>
              <span className="text-[10px] font-semibold text-neutral-500">
                Hulog contributions
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                Payouts Won
              </span>
              <span className="text-xl font-black text-neutral-950 dark:text-white mt-0.5 block">
                ₱{currentUser.totalReceived.toLocaleString()}
              </span>
              <span className="text-[10px] font-semibold text-neutral-500">
                Lump sums
              </span>
            </div>
          </div>
        </div>

        {/* Sunflower Yellow Trust Box (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#F5B800] text-neutral-950 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-950 text-white px-2 py-0.5 rounded">
                Trust Standing
              </span>
              <CoinIcon size={22} className="text-neutral-950" />
            </div>

            <div className="mt-5">
              <span className="text-5xl sm:text-6xl font-black tracking-tighter text-neutral-950 leading-none">
                {currentUser.trustScore}
              </span>
              <span className="text-2xl font-black text-neutral-900">/100</span>
            </div>

            <p className="text-sm font-black text-neutral-900 mt-2">
              Tier 1 Exemplary Saver
            </p>
            <p className="text-xs font-semibold text-neutral-800 mt-1">
              Qualified for zero-collateral rotating pots up to ₱250,000.
            </p>
          </div>

          <div className="pt-4 border-t border-black/15 text-xs font-bold text-neutral-900">
            Backed by cryptographic ledger proof.
          </div>
        </div>
      </div>

      {/* 2. FRIENDS DIRECTORY BENTO BOX */}
      <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-lg font-black text-neutral-950 dark:text-white tracking-tight">
              Trusted Friends Directory
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Peers with verified Paluwagan track records whom you can invite
              into your active circles.
            </p>
          </div>

          {/* Search friends input */}
          <div className="relative w-full sm:w-64">
            <label htmlFor="search-friends-input" className="sr-only">
              Search friends
            </label>
            <input
              id="search-friends-input"
              type="search"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800]"
            />
            <Search
              className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Empty State Check */}
        {filteredFriends.length === 0 ? (
          <EmptyState
            icon={<Users className="w-10 h-10 stroke-1" />}
            title="No friends found"
            description="No peers in your community match your search query."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 hover:border-[#F5B800] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className={`w-10 h-10 rounded-full object-cover ring-2 ${
                        friend.isOnline
                          ? 'ring-[#F5B800]'
                          : 'ring-neutral-300 dark:ring-neutral-700'
                      }`}
                    />
                    {friend.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-800 rounded-full" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                        {friend.name}
                      </p>
                      <span className="text-[10px] text-neutral-950 bg-[#F5B800] px-1.5 py-0.2 rounded font-black flex items-center gap-0.5">
                        {friend.trustScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                      {friend.email}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      {friend.completedCircles} circles completed •{' '}
                      {friend.mutualGroups} mutual
                    </p>
                  </div>
                </div>

                {/* Invite to Group Button */}
                <button
                  type="button"
                  onClick={() => setSelectedFriendToInvite(friend)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] transition-colors cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
                >
                  <UserPlus
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    aria-hidden="true"
                  />
                  <span>Invite</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Selection Modal (Flyout) */}
      {selectedFriendToInvite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="invite-friend-modal-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h4
                id="invite-friend-modal-title"
                className="text-sm font-black text-neutral-950 dark:text-white"
              >
                Invite {selectedFriendToInvite.name}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedFriendToInvite(null)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer text-lg font-bold p-1"
                aria-label="Close invite modal"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Select which Paluwagan circle to send an invitation for:
            </p>

            <div className="space-y-2">
              {groups.map((grp) => (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() =>
                    handleSendInvite(selectedFriendToInvite, grp.id)
                  }
                  className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#F5B800] hover:bg-[#F5B800]/5 text-left transition-all cursor-pointer flex items-center justify-between focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
                >
                  <div>
                    <span className="text-xs font-bold text-neutral-950 dark:text-white block">
                      {grp.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      ₱{grp.potAmount.toLocaleString()} Pot • {grp.frequency}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-950 bg-[#F5B800] px-2 py-0.5 rounded-md font-black">
                    Send
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
