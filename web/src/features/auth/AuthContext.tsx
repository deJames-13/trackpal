import React, { createContext, useContext, useState } from 'react'
import type { CurrentUser } from '../../types'
import { initialCurrentUser } from '../../lib/mockData'

interface AuthContextType {
  currentUser: CurrentUser
  isAuthenticated: boolean
  login: (name: string, email: string) => void
  logout: () => void
  updateUser: (user: Partial<CurrentUser>) => void
  recordContribution: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(initialCurrentUser)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true) // Demo mode starts authenticated or toggles

  const login = (name: string, email: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
    }))
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const updateUser = (updated: Partial<CurrentUser>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updated,
    }))
  }

  const recordContribution = (amount: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      totalContributed: prev.totalContributed + amount,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        updateUser,
        recordContribution,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
