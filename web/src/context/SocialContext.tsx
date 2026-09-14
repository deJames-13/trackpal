import React, { createContext, useContext, useState } from 'react'
import type { Friend } from '../types'
import { initialFriends } from '../lib/mockData'

interface SocialContextType {
  friends: Friend[]
  addFriend: (friend: Friend) => void
  getFriendById: (id: string) => Friend | undefined
}

const SocialContext = createContext<SocialContextType | undefined>(undefined)

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>(initialFriends)

  const addFriend = (friend: Friend) => {
    setFriends((prev) => [friend, ...prev])
  }

  const getFriendById = (id: string) => {
    return friends.find((f) => f.id === id)
  }

  return (
    <SocialContext.Provider value={{ friends, addFriend, getFriendById }}>
      {children}
    </SocialContext.Provider>
  )
}

export function useSocial() {
  const context = useContext(SocialContext)
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider')
  }
  return context
}
