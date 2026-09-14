import React from 'react'
import { Outlet } from '@tanstack/react-router'
import { FluentSidebar } from './FluentSidebar'
import { FluentTopNav } from './FluentTopNav'
import { NewGroupModal } from '../../features/groups/NewGroupModal'
import { ContributionModal } from '../../features/groups/ContributionModal'
import { OnboardingModal } from '../../features/onboarding/OnboardingModal'
import { AuthModal } from '../../features/auth/AuthModal'

export const AppShell: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA] dark:bg-[#0D0F12] text-neutral-950 dark:text-neutral-100 font-sans antialiased transition-colors duration-200 selection:bg-[#F5B800]/30 selection:text-neutral-950">
      {/* Persistent Left Sidebar */}
      <FluentSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8F9FA] dark:bg-[#0D0F12]">
        {/* Top Navigation Bar */}
        <FluentTopNav />

        {/* Main Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Application Modals */}
      <NewGroupModal />
      <ContributionModal />
      <OnboardingModal />
      <AuthModal />
    </div>
  )
}
