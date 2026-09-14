import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { X, Plus } from 'lucide-react'
import type { PaluwaganGroup, PayoutFrequency } from '../../types'
import { CoinIcon } from '../../components/ui/CoinIcon'
import { useModals } from '../../context/ModalContext'
import { useGroups } from '../../context/GroupsContext'
import { useAuth } from '../auth/AuthContext'

export const NewGroupModal: React.FC = () => {
  const { isNewGroupOpen, closeNewGroup } = useModals()
  const { createGroup } = useGroups()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<
    'Family' | 'Office' | 'Personal' | 'Business'
  >('Personal')
  const [potAmount, setPotAmount] = useState<number>(50000)
  const [membersCount, setMembersCount] = useState<number>(10)
  const [frequency, setFrequency] = useState<PayoutFrequency>('semi-monthly')

  if (!isNewGroupOpen) return null

  const contributionPerCycle = Math.round(potAmount / membersCount)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newGroupId = `grp-${Date.now()}`
    const newGroup: PaluwaganGroup = {
      id: newGroupId,
      name: name.trim(),
      description:
        description.trim() ||
        `Automated ${frequency} Paluwagan circle managed via TrackPal.`,
      category,
      potAmount,
      contributionAmount: contributionPerCycle,
      frequency,
      totalRounds: membersCount,
      currentRound: 1,
      startDate: '2026-10-01',
      nextPayoutDate: '2026-10-15',
      currency: '₱',
      organizer: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        trustScore: currentUser.trustScore,
      },
      rules: [
        'Contributions must be submitted before midnight on scheduled cycle date.',
        'Upload transfer slip (GCash, Maya, Bank) immediately upon payment.',
        'Slot order determined via TrackPal automated cryptographic lottery.',
      ],
      members: [
        {
          id: currentUser.id,
          name: `${currentUser.name} (You)`,
          avatar: currentUser.avatar,
          email: currentUser.email,
          phone: currentUser.phone,
          slotNumber: 1,
          payoutDate: '2026-10-15',
          isCurrentUser: true,
          status: 'current_pot',
          currentCyclePaid: true,
          trustScore: currentUser.trustScore,
        },
        {
          id: 'usr_maria',
          name: 'Maria Santos',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
          email: 'maria.santos@gmail.com',
          phone: '+63 918 111 2345',
          slotNumber: 2,
          payoutDate: '2026-10-30',
          status: 'upcoming',
          currentCyclePaid: false,
          trustScore: 100,
        },
        {
          id: 'usr_roberto',
          name: 'Roberto Aquino',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
          email: 'roberto.a@outlook.com',
          phone: '+63 920 222 3456',
          slotNumber: 3,
          payoutDate: '2026-11-15',
          status: 'upcoming',
          currentCyclePaid: false,
          trustScore: 98,
        },
      ],
    }

    createGroup(newGroup)
    closeNewGroup()
    navigate({ to: '/groups/$groupId', params: { groupId: newGroupId } })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-group-modal-title"
    >
      <div
        id="new-group-modal-card"
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeNewGroup}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          aria-label="Close circle creation modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[#F5B800] text-neutral-950">
              New Savings Circle
            </span>
          </div>
          <h2
            id="new-group-modal-title"
            className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight mt-1"
          >
            Create Rotating Circle
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Configure rotation terms, target pot amount, and member capacity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="new-group-name-input"
              className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
            >
              Circle Name
            </label>
            <input
              id="new-group-name-input"
              type="text"
              required
              placeholder="e.g. Holiday Gadget Fund or Boracay 2027"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800]"
            />
          </div>

          <div>
            <label
              htmlFor="new-group-desc-input"
              className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
            >
              Purpose / Description
            </label>
            <input
              id="new-group-desc-input"
              type="text"
              placeholder="Brief summary of what this savings fund is for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#F5B800]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="new-group-pot-input"
                className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
              >
                Target Pot Amount (₱)
              </label>
              <input
                id="new-group-pot-input"
                type="number"
                min="5000"
                step="5000"
                value={potAmount}
                onChange={(e) => setPotAmount(Number(e.target.value))}
                className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white font-black focus:outline-hidden focus:border-[#F5B800]"
              />
            </div>

            <div>
              <label
                htmlFor="new-group-slots-input"
                className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
              >
                Number of Member Slots
              </label>
              <input
                id="new-group-slots-input"
                type="number"
                min="3"
                max="30"
                value={membersCount}
                onChange={(e) => setMembersCount(Number(e.target.value))}
                className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white font-black focus:outline-hidden focus:border-[#F5B800]"
              />
            </div>
          </div>

          {/* Dynamic Calculation Bento Callout */}
          <div className="p-4 rounded-xl bg-[#F5B800] text-neutral-950 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900 block">
                Calculated Share per Round
              </span>
              <span className="text-2xl font-black tracking-tight text-neutral-950">
                ₱{contributionPerCycle.toLocaleString()}{' '}
                <span className="text-xs font-bold">/ member</span>
              </span>
            </div>
            <CoinIcon size={24} className="text-neutral-950" />
          </div>

          {/* Frequency & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="new-group-frequency-select"
                className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
              >
                Payout Frequency
              </label>
              <select
                id="new-group-frequency-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white focus:outline-hidden focus:border-[#F5B800]"
              >
                <option value="weekly">Weekly (Every Mon)</option>
                <option value="semi-monthly">Semi-Monthly (15th & 30th)</option>
                <option value="monthly">Monthly (End of Month)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="new-group-category-select"
                className="block text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1"
              >
                Category
              </label>
              <select
                id="new-group-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 px-3 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white focus:outline-hidden focus:border-[#F5B800]"
              >
                <option value="Personal">Personal / Friends</option>
                <option value="Family">Family</option>
                <option value="Office">Office / Workplace</option>
                <option value="Business">Business / MSME</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={closeNewGroup}
              className="px-4 py-2 rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="new-group-create-submit-btn"
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>Create Circle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
