/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Screen, 
  DashboardTab, 
  PaluwaganGroup, 
  Friend, 
  CurrentUser, 
  CalendarEvent 
} from './types';
import { 
  initialCurrentUser, 
  initialGroups, 
  initialFriends, 
  initialCalendarEvents 
} from './data/mockData';

// Component imports
import { FluentSidebar } from './components/Navigation/FluentSidebar';
import { FluentTopNav } from './components/Navigation/FluentTopNav';
import { GuestLanding } from './components/Guest/GuestLanding';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { AuthModal } from './components/Auth/AuthModal';
import { OverviewTab } from './components/Dashboard/OverviewTab';
import { GroupDetailTab } from './components/Dashboard/GroupDetailTab';
import { ContributionModal } from './components/Dashboard/ContributionModal';
import { NewGroupModal } from './components/Dashboard/NewGroupModal';
import { CalendarTab } from './components/Calendar/CalendarTab';
import { SocialTab } from './components/Social/SocialTab';
import { SettingsTab } from './components/Settings/SettingsTab';

export default function App() {
  // Screen & Navigation States
  const [currentScreen, setCurrentScreen] = useState<Screen>('guest');
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('grp-1');

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [activeContributionGroup, setActiveContributionGroup] = useState<PaluwaganGroup | null>(null);

  // App Data States
  const [currentUser, setCurrentUser] = useState<CurrentUser>(initialCurrentUser);
  const [groups, setGroups] = useState<PaluwaganGroup[]>(initialGroups);
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [searchQuery, setSearchQuery] = useState('');

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trackpal_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('trackpal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('trackpal_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Handler: Get Started from Guest
  const handleGetStarted = () => {
    setIsOnboardingOpen(true);
  };

  // Handler: Finish Onboarding
  const handleFinishOnboarding = () => {
    setIsOnboardingOpen(false);
    setCurrentScreen('dashboard');
  };

  // Handler: Login Success
  const handleLoginSuccess = (name: string, email: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
    }));
    setIsAuthOpen(false);
    setCurrentScreen('dashboard');
  };

  // Handler: Select Group for Details
  const handleSelectGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setCurrentTab('group-detail');
  };

  // Handler: Open Contribution Modal for a specific group
  const handleOpenContribution = (group: PaluwaganGroup) => {
    setActiveContributionGroup(group);
    setIsContributionOpen(true);
  };

  // Handler: Contribution Submission Success
  const handleContributionSuccess = (groupId: string, method: string, refNumber: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g;

        const updatedMembers = g.members.map((m) => {
          if (m.isCurrentUser) {
            return {
              ...m,
              currentCyclePaid: true,
              paymentMethod: method,
              paymentRef: refNumber,
              paidAt: 'Just now',
            };
          }
          return m;
        });

        return {
          ...g,
          members: updatedMembers,
        };
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      totalContributed: prev.totalContributed + (activeContributionGroup?.contributionAmount || 0),
    }));
  };

  // Handler: Toggle Member Paid Status (Organizer Verification)
  const handleToggleMemberPaid = (groupId: string, memberId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g;

        const updatedMembers = g.members.map((m) => {
          if (m.id === memberId) {
            return {
              ...m,
              currentCyclePaid: !m.currentCyclePaid,
              paymentMethod: m.currentCyclePaid ? undefined : 'Verified by Organizer',
              paymentRef: m.currentCyclePaid ? undefined : 'MANUAL-OK',
              paidAt: m.currentCyclePaid ? undefined : 'Just now',
            };
          }
          return m;
        });

        return {
          ...g,
          members: updatedMembers,
        };
      })
    );
  };

  // Handler: Create New Paluwagan Group
  const handleCreateGroup = (newGroup: PaluwaganGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
    setSelectedGroupId(newGroup.id);
    setCurrentTab('group-detail');
  };

  // Handler: Invite Friend to Group
  const handleInviteFriendToGroup = (friend: Friend, groupId: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((g) => {
        if (g.id !== groupId) return g;
        // Check if already in group
        if (g.members.some((m) => m.id === friend.id)) return g;

        const newSlot = g.members.length + 1;
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
        };

        return {
          ...g,
          members: [...g.members, newMember],
          totalRounds: newSlot,
        };
      })
    );
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  // Filtered groups based on top nav search query
  const displayedGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0D0F12] text-neutral-950 dark:text-neutral-100 font-sans antialiased transition-colors duration-200 selection:bg-[#F5B800]/30 selection:text-neutral-950">
      {/* 1. GUEST LANDING SCREEN */}
      {currentScreen === 'guest' && (
        <GuestLanding
          onGetStarted={handleGetStarted}
          onSignIn={() => setIsAuthOpen(true)}
          onExploreDemo={() => setCurrentScreen('dashboard')}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}

      {/* 2. MAIN APP DASHBOARD SCREEN */}
      {currentScreen === 'dashboard' && (
        <div className="flex h-screen overflow-hidden">
          {/* Persistent Left Sidebar */}
          <FluentSidebar
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
            }}
            currentUser={currentUser}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onOpenNewGroup={() => setIsNewGroupOpen(true)}
            onSignOut={() => setCurrentScreen('guest')}
            activeGroupCount={groups.length}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8F9FA] dark:bg-[#0D0F12]">
            {/* Top Navigation Bar */}
            <FluentTopNav
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onOpenNewGroup={() => setIsNewGroupOpen(true)}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              groupName={currentTab === 'group-detail' ? selectedGroup?.name : undefined}
              darkMode={darkMode}
            />

            {/* Main Scrollable Canvas */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-7xl mx-auto">
                {/* View 1: Overview */}
                {currentTab === 'overview' && (
                  <OverviewTab
                    groups={displayedGroups}
                    currentUser={currentUser}
                    onSelectGroup={handleSelectGroup}
                    onOpenNewGroup={() => setIsNewGroupOpen(true)}
                    onSubmitContribution={handleOpenContribution}
                    darkMode={darkMode}
                  />
                )}

                {/* View 2: My Groups List View (Bento Box Grid) */}
                {currentTab === 'groups' && (
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
                        onClick={() => setIsNewGroupOpen(true)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] transition-all cursor-pointer shadow-xs w-fit"
                      >
                        + Create New Circle
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {displayedGroups.map((group) => {
                        const progressPercent = Math.round((group.currentRound / group.totalRounds) * 100);
                        const paidCount = group.members.filter((m) => m.currentCyclePaid).length;

                        return (
                          <div
                            key={group.id}
                            onClick={() => handleSelectGroup(group.id)}
                            className="p-6 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 hover:border-[#F5B800] dark:hover:border-[#F5B800] transition-all cursor-pointer flex flex-col justify-between shadow-xs group"
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
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Total Pot</span>
                                  <span className="text-xl font-black text-neutral-950 dark:text-white">
                                    ₱{group.potAmount.toLocaleString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Current Cycle</span>
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
                                    className="h-full bg-[#F5B800] rounded-full transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                              <span className="text-xs text-neutral-500">
                                Next: <strong className="text-neutral-800 dark:text-neutral-200 font-bold">{group.nextPayoutDate}</strong>
                              </span>
                              <span className="text-xs font-black text-neutral-950 dark:text-[#F5B800] group-hover:translate-x-0.5 transition-transform">
                                Open Circle →
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* View 3: Group Detail (Paluwagan Logic & Contributions Tracking) */}
                {currentTab === 'group-detail' && selectedGroup && (
                  <GroupDetailTab
                    group={selectedGroup}
                    onBack={() => setCurrentTab('overview')}
                    onSubmitContribution={handleOpenContribution}
                    onInviteFriend={() => {
                      setCurrentTab('friends');
                    }}
                    onToggleMemberPaid={handleToggleMemberPaid}
                    darkMode={darkMode}
                  />
                )}

                {/* View 4: Calendar Tracking */}
                {currentTab === 'calendar' && (
                  <CalendarTab
                    events={calendarEvents}
                    onOpenContribution={(groupId) => {
                      const grp = groups.find((g) => g.id === groupId);
                      if (grp) {
                        handleOpenContribution(grp);
                      }
                    }}
                    darkMode={darkMode}
                  />
                )}

                {/* View 5: Friends & Social Trust */}
                {currentTab === 'friends' && (
                  <SocialTab
                    currentUser={currentUser}
                    friends={friends}
                    groups={groups}
                    onInviteFriendToGroup={handleInviteFriendToGroup}
                    darkMode={darkMode}
                  />
                )}

                {/* View 6: Settings */}
                {currentTab === 'settings' && (
                  <SettingsTab
                    darkMode={darkMode}
                    onToggleDarkMode={toggleDarkMode}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* ONBOARDING MODAL */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinish={handleFinishOnboarding}
        darkMode={darkMode}
      />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        darkMode={darkMode}
      />

      {/* NEW GROUP MODAL */}
      <NewGroupModal
        isOpen={isNewGroupOpen}
        onClose={() => setIsNewGroupOpen(false)}
        onCreateGroup={handleCreateGroup}
        darkMode={darkMode}
      />

      {/* CONTRIBUTION MODAL */}
      <ContributionModal
        isOpen={isContributionOpen}
        group={activeContributionGroup}
        onClose={() => {
          setIsContributionOpen(false);
          setActiveContributionGroup(null);
        }}
        onSubmitSuccess={handleContributionSuccess}
        darkMode={darkMode}
      />
    </div>
  );
}
