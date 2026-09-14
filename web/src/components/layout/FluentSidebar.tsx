import React from 'react'
import { Link, useRouterState, useNavigate } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Users2,
  CalendarDays,
  Settings,
  Plus,
  ShieldCheck,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  PiggyBank,
} from 'lucide-react'
import { CoinIcon } from '../ui/CoinIcon'
import { useAuth } from '../../features/auth/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useModals } from '../../context/ModalContext'
import { useGroups } from '../../context/GroupsContext'

export const FluentSidebar: React.FC = () => {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname

  const { currentUser, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const { openNewGroup } = useModals()
  const { groups } = useGroups()

  const navItems = [
    {
      to: '/overview',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      isActive: currentPath === '/overview' || currentPath === '/overview/',
    },
    {
      to: '/groups',
      label: 'My Circles',
      icon: PiggyBank,
      badge: groups.length.toString(),
      isActive: currentPath.startsWith('/groups'),
    },
    {
      to: '/calendar',
      label: 'Schedule & Due',
      icon: CalendarDays,
      badge: '2 Due',
      isActive: currentPath.startsWith('/calendar'),
    },
    {
      to: '/friends',
      label: 'Community & Trust',
      icon: Users2,
      badge: null,
      isActive: currentPath.startsWith('/friends'),
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      isActive: currentPath.startsWith('/settings'),
    },
  ]

  const handleSignOut = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <aside
      id="fluent-sidebar"
      aria-label="Application Sidebar"
      className="w-64 h-full flex flex-col justify-between border-r bg-white dark:bg-[#16181D] transition-colors duration-200 select-none z-20 shrink-0 border-neutral-200/80 dark:border-white/[0.08]"
    >
      {/* Top Header / App Brand */}
      <div className="p-4">
        <Link
          to="/overview"
          className="flex items-center gap-3 px-2 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/70 dark:border-neutral-800/80 hover:border-[#F5B800] dark:hover:border-[#F5B800] transition-colors"
        >
          {/* Minted Coin Brand Icon */}
          <CoinIcon size={32} className="w-8 h-8 rounded-lg shadow-xs" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-base tracking-tight text-neutral-950 dark:text-white">
                TrackPal
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#F5B800] text-neutral-950">
                Paluwagan
              </span>
            </div>
            <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
              Enterprise ROSCA Ledger
            </p>
          </div>
        </Link>

        {/* Quick New Group Action Button - Sunflower Yellow */}
        <div className="mt-4">
          <button
            id="sidebar-new-group-btn"
            type="button"
            onClick={openNewGroup}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs hover:shadow transition-all duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>Create New Circle</span>
          </button>
        </div>

        {/* Navigation List - Ant Design Minimalist Style */}
        <nav className="mt-5 space-y-1" aria-label="Main Navigation">
          <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Workspace
          </div>

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer relative group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                  item.isActive
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {/* Sunflower Yellow Active Indicator Bar */}
                {item.isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#F5B800] rounded-r-full" />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      item.isActive
                        ? 'text-[#F5B800]'
                        : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="tracking-tight">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      item.isActive
                        ? 'bg-[#F5B800] text-neutral-950'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer Section: Profile & Theme Toggle */}
      <div className="p-3 border-t bg-neutral-50/70 dark:bg-neutral-900/40 border-neutral-200/80 dark:border-white/[0.08]">
        {/* User Card */}
        <Link
          to="/friends"
          className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"
          title="View profile & trust score"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#F5B800]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-800 rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                {currentUser.name}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-neutral-600 dark:text-neutral-400 font-semibold">
                <ShieldCheck
                  className="w-3 h-3 text-[#F5B800]"
                  aria-hidden="true"
                />
                <span>{currentUser.trustScore}% Score</span>
              </div>
            </div>
          </div>
          <ChevronRight
            className="w-3.5 h-3.5 text-neutral-400 shrink-0"
            aria-hidden="true"
          />
        </Link>

        {/* Bottom Utility Controls */}
        <div className="mt-2 pt-2 flex items-center justify-between px-1">
          {/* Theme Toggle Button */}
          <button
            id="sidebar-theme-toggle"
            type="button"
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#F5B800]"
          >
            {darkMode ? (
              <>
                <Sun
                  className="w-3.5 h-3.5 text-[#F5B800]"
                  aria-hidden="true"
                />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon
                  className="w-3.5 h-3.5 text-neutral-700"
                  aria-hidden="true"
                />
                <span>Dark mode</span>
              </>
            )}
          </button>

          {/* Sign Out / Exit Demo */}
          <button
            id="sidebar-signout-btn"
            type="button"
            onClick={handleSignOut}
            className="p-1.5 rounded-md text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-rose-500"
            title="Sign Out to Landing Page"
            aria-label="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
