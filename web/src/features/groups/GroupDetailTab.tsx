import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  PiggyBank,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  UserPlus,
  Info,
  Check,
  BellRing,
  Sparkles,
} from 'lucide-react'
import type { PaluwaganMember } from '../../types'
import { useGroups } from '../../context/GroupsContext'
import { useModals } from '../../context/ModalContext'
import { EmptyState } from '../../components/ui/EmptyState'

interface GroupDetailTabProps {
  groupId: string
}

export const GroupDetailTab: React.FC<GroupDetailTabProps> = ({ groupId }) => {
  const { getGroupById, toggleMemberPaid } = useGroups()
  const { openContribution } = useModals()
  const navigate = useNavigate()

  const group = getGroupById(groupId)

  const [activeSubTab, setActiveSubTab] = useState<
    'rotation' | 'current-cycle' | 'rules'
  >('rotation')
  const [nudgeSuccessMember, setNudgeSuccessMember] = useState<string | null>(
    null,
  )

  if (!group) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate({ to: '/groups' })}
          className="flex items-center gap-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Circles</span>
        </button>
        <EmptyState
          icon={<PiggyBank className="w-12 h-12 stroke-1" />}
          title="Circle not found"
          description="The Paluwagan circle you are looking for does not exist or has been removed."
          actionLabel="View All Circles"
          onAction={() => navigate({ to: '/groups' })}
        />
      </div>
    )
  }

  const paidCount = group.members.filter((m) => m.currentCyclePaid).length
  const currentCollectedAmount = paidCount * group.contributionAmount
  const progressPercent = Math.round((paidCount / group.members.length) * 100)

  const handleNudge = (member: PaluwaganMember) => {
    setNudgeSuccessMember(member.id)
    setTimeout(() => {
      setNudgeSuccessMember(null)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          id="group-detail-back-btn"
          type="button"
          onClick={() => navigate({ to: '/groups' })}
          className="flex items-center gap-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#F5B800]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Circles</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="group-detail-invite-btn"
            type="button"
            onClick={() => navigate({ to: '/friends' })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#F5B800]"
          >
            <UserPlus
              className="w-3.5 h-3.5 text-[#8A6300] dark:text-[#FACC15]"
              aria-hidden="true"
            />
            <span>Invite Member</span>
          </button>

          <button
            id="group-detail-submit-btn"
            type="button"
            onClick={() => openContribution(group)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs hover:shadow transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          >
            <CreditCard
              className="w-3.5 h-3.5 stroke-[2.5]"
              aria-hidden="true"
            />
            <span>
              Submit Hulog (₱{group.contributionAmount.toLocaleString()})
            </span>
          </button>
        </div>
      </div>

      {/* BENTO HEADER COMPARTMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento Compartment 1: Circle Details (Span 8) */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                {group.category} Circle
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F5B800] text-neutral-950">
                {group.frequency} Cycle
              </span>
              <span className="text-xs font-semibold text-neutral-400">
                Round {group.currentRound} of {group.totalRounds}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 dark:text-white">
              {group.name}
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-2xl">
              {group.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Organizer
              </span>
              <strong className="text-neutral-900 dark:text-neutral-100">
                {group.organizer.name}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Started Date
              </span>
              <strong className="text-neutral-900 dark:text-neutral-100">
                {group.startDate}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Slots / Members
              </span>
              <strong className="text-neutral-900 dark:text-neutral-100">
                {group.members.length} Members
              </strong>
            </div>
          </div>
        </div>

        {/* Bento Compartment 2: Sunflower Yellow Pot Summary (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#F5B800] text-neutral-950 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-950 text-white px-2 py-0.5 rounded">
                Total Payout Pot
              </span>
              <PiggyBank
                className="w-5 h-5 text-neutral-950"
                aria-hidden="true"
              />
            </div>

            <div className="mt-4 text-4xl sm:text-5xl font-black tracking-tighter text-neutral-950 leading-none">
              ₱{group.potAmount.toLocaleString()}
            </div>

            <p className="text-xs font-bold text-neutral-900 mt-2">
              Share: ₱{group.contributionAmount.toLocaleString()} / member per
              round
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/15">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span>Current Round Collection</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-950 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] font-semibold text-neutral-800 mt-1.5">
              {paidCount} of {group.members.length} members paid (₱
              {currentCollectedAmount.toLocaleString()})
            </p>
          </div>
        </div>
      </div>

      {/* SUB-TABS: Segmented Pill Bar */}
      <div
        className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl w-fit"
        role="tablist"
        aria-label="Circle details view"
      >
        <button
          id="tab-btn-rotation"
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'rotation'}
          onClick={() => setActiveSubTab('rotation')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'rotation'
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Payout Rotation Order
        </button>

        <button
          id="tab-btn-current-cycle"
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'current-cycle'}
          onClick={() => setActiveSubTab('current-cycle')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'current-cycle'
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <span>Cycle #{group.currentRound} Payments</span>
          <span className="px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-600 text-[10px]">
            {paidCount}/{group.members.length}
          </span>
        </button>

        <button
          id="tab-btn-rules"
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'rules'}
          onClick={() => setActiveSubTab('rules')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'rules'
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Circle Rules & Agreement
        </button>
      </div>

      {/* TAB CONTENT 1: DATA TABLE - PAYOUT ROTATION ORDER */}
      {activeSubTab === 'rotation' && (
        <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-neutral-950 dark:text-white tracking-tight">
                Scheduled Payout Rotation (Order of Sahod)
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Fixed slot assignments. Each member receives the full ₱
                {group.potAmount.toLocaleString()} pot on their turn.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <span
                  className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"
                  aria-hidden="true"
                />
                Completed
              </span>
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
                <span
                  className="w-2 h-2 rounded-full bg-[#F5B800]"
                  aria-hidden="true"
                />
                Current Pot
              </span>
              <span className="flex items-center gap-1.5 text-neutral-400">
                <span
                  className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"
                  aria-hidden="true"
                />
                Upcoming
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-16 text-center">Slot</th>
                  <th className="py-3 px-4">Member Name</th>
                  <th className="py-3 px-4">Scheduled Payout</th>
                  <th className="py-3 px-4">Pot Target</th>
                  <th className="py-3 px-4">Trust Standing</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {group.members.map((member) => {
                  const isCurrent = member.status === 'current_pot'
                  const isCompleted = member.status === 'paid_out'

                  return (
                    <tr
                      key={member.id}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-[#F5B800]/10 font-medium'
                          : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                      }`}
                    >
                      {/* Slot Number */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                            isCurrent
                              ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                              : isCompleted
                                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                                : 'border border-neutral-300 dark:border-neutral-700 text-neutral-500'
                          }`}
                        >
                          #{member.slotNumber}
                        </span>
                      </td>

                      {/* Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-neutral-950 dark:text-white">
                                {member.name}
                              </span>
                              {member.isCurrentUser && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Payout Date */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-medium">
                          <Calendar
                            className="w-3.5 h-3.5 text-neutral-400"
                            aria-hidden="true"
                          />
                          <span>{member.payoutDate}</span>
                        </div>
                      </td>

                      {/* Pot Target */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-neutral-950 dark:text-white">
                          ₱{group.potAmount.toLocaleString()}
                        </span>
                      </td>

                      {/* Trust Score */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck
                            className="w-3.5 h-3.5 text-emerald-500"
                            aria-hidden="true"
                          />
                          <span className="font-bold text-neutral-800 dark:text-neutral-200">
                            {member.trustScore}%
                          </span>
                        </div>
                      </td>

                      {/* Status Tag */}
                      <td className="py-3.5 px-4 text-center">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F5B800] text-neutral-950 shadow-xs">
                            <Sparkles className="w-3 h-3" aria-hidden="true" />
                            Current Pot
                          </span>
                        ) : isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            <Check className="w-3 h-3" aria-hidden="true" />
                            Paid Out
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            Upcoming
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        {isCurrent ? (
                          <button
                            type="button"
                            onClick={() => openContribution(group)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] transition-colors cursor-pointer shadow-xs"
                          >
                            Send Share
                          </button>
                        ) : (
                          <span className="text-[11px] text-neutral-400">
                            Slot Locked
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: CURRENT CYCLE MATRIX */}
      {activeSubTab === 'current-cycle' && (
        <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 className="text-sm font-black text-neutral-950 dark:text-white tracking-tight">
                Cycle #{group.currentRound} Member Payment Tracker
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Automated ledger for member contributions (₱
                {group.contributionAmount.toLocaleString()} each) due this
                round.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{paidCount} Paid</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{group.members.length - paidCount} Pending</span>
              </span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {group.members.map((member) => (
              <div
                key={member.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                        {member.name}
                      </span>
                      {member.isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold">
                          You
                        </span>
                      )}
                      <span className="text-[11px] text-neutral-400">
                        (Slot #{member.slotNumber})
                      </span>
                    </div>

                    {member.currentCyclePaid ? (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                        <span>
                          Paid via {member.paymentMethod || 'Online'} • Ref:{' '}
                          {member.paymentRef || 'TXN-AUTO'}
                        </span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        <span>
                          Awaiting ₱{group.contributionAmount.toLocaleString()}{' '}
                          hulog transfer
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:self-center">
                  <button
                    type="button"
                    onClick={() => toggleMemberPaid(group.id, member.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#F5B800] ${
                      member.currentCyclePaid
                        ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600'
                    }`}
                    title="Click to toggle payment verification status"
                  >
                    {member.currentCyclePaid ? (
                      <>
                        <Check
                          className="w-3.5 h-3.5 text-emerald-600"
                          aria-hidden="true"
                        />
                        <span>Verified</span>
                      </>
                    ) : (
                      <span>Mark as Paid</span>
                    )}
                  </button>

                  {!member.currentCyclePaid && (
                    <button
                      type="button"
                      onClick={() => handleNudge(member)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Send SMS / App Nudge Reminder"
                    >
                      {nudgeSuccessMember === member.id ? (
                        <span className="text-[11px] text-[#8A6300] dark:text-[#FACC15] font-bold">
                          Nudge Sent!
                        </span>
                      ) : (
                        <BellRing className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: CIRCLE RULES & POLICY */}
      {activeSubTab === 'rules' && (
        <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <Info
              className="w-4 h-4 text-[#8A6300] dark:text-[#FACC15]"
              aria-hidden="true"
            />
            <h3 className="text-sm font-black text-neutral-950 dark:text-white">
              Paluwagan Rules & Community Agreement
            </h3>
          </div>

          <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300">
            {group.rules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60"
              >
                <span className="w-5 h-5 rounded-md bg-[#F5B800] text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="leading-relaxed pt-0.5">{rule}</p>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-[#F5B800]/10 border border-[#F5B800]/30 text-neutral-950 dark:text-white text-xs">
              <strong className="block font-black mb-1">
                TrackPal Dispute Protection Guarantee
              </strong>
              All transfers are logged with immutable cryptographic timestamps
              and payment slip references. Failure to submit contributions
              results in immediate trust score deduction.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
