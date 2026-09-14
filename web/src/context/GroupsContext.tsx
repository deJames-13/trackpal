import React, { createContext, useContext, useState } from 'react'
import type { PaluwaganGroup, Friend } from '../types'
import { initialGroups } from '../lib/mockData'
import { useAuth } from '../features/auth/AuthContext'

interface GroupsContextType {
  groups: PaluwaganGroup[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  displayedGroups: PaluwaganGroup[]
  selectedGroupId: string
  setSelectedGroupId: (id: string) => void
  selectedGroup: PaluwaganGroup | undefined
  getGroupById: (id: string) => PaluwaganGroup | undefined
  createGroup: (group: PaluwaganGroup) => void
  submitContribution: (
    groupId: string,
    method: string,
    refNumber: string,
    amount: number,
  ) => void
  toggleMemberPaid: (groupId: string, memberId: string) => void
  inviteFriendToGroup: (friend: Friend, groupId: string) => void
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined)

export function GroupsProvider({ children }: { children: React.ReactNode }) {
  const { recordContribution } = useAuth()
  const [groups, setGroups] = useState<PaluwaganGroup[]>(initialGroups)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState<string>('grp-1')

  const displayedGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getGroupById = (id: string) => {
    return groups.find((g) => g.id === id)
  }

  const selectedGroup =
    groups.find((g) => g.id === selectedGroupId) || groups[0]

  const createGroup = (newGroup: PaluwaganGroup) => {
    setGroups((prev) => [newGroup, ...prev])
    setSelectedGroupId(newGroup.id)
  }

  const submitContribution = (
    groupId: string,
    method: string,
    refNumber: string,
    amount: number,
  ) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g

        const updatedMembers = g.members.map((m) => {
          if (m.isCurrentUser) {
            return {
              ...m,
              currentCyclePaid: true,
              paymentMethod: method,
              paymentRef: refNumber,
              paidAt: 'Just now',
            }
          }
          return m
        })

        return {
          ...g,
          members: updatedMembers,
        }
      }),
    )

    recordContribution(amount)
  }

  const toggleMemberPaid = (groupId: string, memberId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g

        const updatedMembers = g.members.map((m) => {
          if (m.id === memberId) {
            const willBePaid = !m.currentCyclePaid
            return {
              ...m,
              currentCyclePaid: willBePaid,
              paymentMethod: willBePaid ? 'Verified by Organizer' : undefined,
              paymentRef: willBePaid ? 'MANUAL-OK' : undefined,
              paidAt: willBePaid ? 'Just now' : undefined,
            }
          }
          return m
        })

        return {
          ...g,
          members: updatedMembers,
        }
      }),
    )
  }

  const inviteFriendToGroup = (friend: Friend, groupId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g
        if (g.members.some((m) => m.id === friend.id)) return g

        const newSlot = g.members.length + 1
        const newMember = {
          id: friend.id,
          name: friend.name,
          avatar: friend.avatar,
          email: friend.email,
          phone: friend.phone,
          slotNumber: newSlot,
          payoutDate: '2026-12-30',
          status: 'upcoming' as const,
          currentCyclePaid: false,
          trustScore: friend.trustScore,
        }

        return {
          ...g,
          members: [...g.members, newMember],
          totalRounds: newSlot,
        }
      }),
    )
  }

  return (
    <GroupsContext.Provider
      value={{
        groups,
        searchQuery,
        setSearchQuery,
        displayedGroups,
        selectedGroupId,
        setSelectedGroupId,
        selectedGroup,
        getGroupById,
        createGroup,
        submitContribution,
        toggleMemberPaid,
        inviteFriendToGroup,
      }}
    >
      {children}
    </GroupsContext.Provider>
  )
}

export function useGroups() {
  const context = useContext(GroupsContext)
  if (!context) {
    throw new Error('useGroups must be used within a GroupsProvider')
  }
  return context
}
