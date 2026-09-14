import React, { createContext, useContext, useState } from 'react'
import type { PaluwaganGroup } from '../types'

interface ModalContextType {
  isOnboardingOpen: boolean
  openOnboarding: () => void
  closeOnboarding: () => void

  isAuthOpen: boolean
  openAuth: () => void
  closeAuth: () => void

  isNewGroupOpen: boolean
  openNewGroup: () => void
  closeNewGroup: () => void

  isContributionOpen: boolean
  activeContributionGroup: PaluwaganGroup | null
  openContribution: (group: PaluwaganGroup) => void
  closeContribution: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false)
  const [isContributionOpen, setIsContributionOpen] = useState(false)
  const [activeContributionGroup, setActiveContributionGroup] =
    useState<PaluwaganGroup | null>(null)

  const openOnboarding = () => setIsOnboardingOpen(true)
  const closeOnboarding = () => setIsOnboardingOpen(false)

  const openAuth = () => setIsAuthOpen(true)
  const closeAuth = () => setIsAuthOpen(false)

  const openNewGroup = () => setIsNewGroupOpen(true)
  const closeNewGroup = () => setIsNewGroupOpen(false)

  const openContribution = (group: PaluwaganGroup) => {
    setActiveContributionGroup(group)
    setIsContributionOpen(true)
  }

  const closeContribution = () => {
    setIsContributionOpen(false)
    setActiveContributionGroup(null)
  }

  return (
    <ModalContext.Provider
      value={{
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        isAuthOpen,
        openAuth,
        closeAuth,
        isNewGroupOpen,
        openNewGroup,
        closeNewGroup,
        isContributionOpen,
        activeContributionGroup,
        openContribution,
        closeContribution,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider')
  }
  return context
}
