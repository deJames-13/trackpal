import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { DashboardTab } from '../../types';

interface FluentTopNavProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onOpenNewGroup: () => void;
  onOpenOnboarding: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  groupName?: string;
  darkMode: boolean;
}

export const FluentTopNav: React.FC<FluentTopNavProps> = ({
  currentTab,
  onOpenNewGroup,
  onOpenOnboarding,
  searchQuery,
  onSearchChange,
  groupName,
  darkMode,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'groups':
        return 'My Paluwagan Circles';
      case 'group-detail':
        return groupName ? `Circle / ${groupName}` : 'Circle Ledger';
      case 'calendar':
        return 'Contribution & Payout Schedule';
      case 'friends':
        return 'Community & Trust Directory';
      case 'settings':
        return 'Settings & Preferences';
      default:
        return 'Dashboard';
    }
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'Hulog Reminder',
      desc: 'Tech Gadget Circle contribution of ₱5,000 is due in 11 days.',
      time: '15m ago',
      unread: true,
      type: 'warning',
    },
    {
      id: 2,
      title: 'Upcoming Sahod (Payout)!',
      desc: 'You are scheduled to receive the ₱50,000 pot for Family Vacation on Sept 18.',
      time: '2h ago',
      unread: true,
      type: 'success',
    },
    {
      id: 3,
      title: 'Contribution Verified',
      desc: 'Roberto Aquino verified your ₱5,000 GCash transfer.',
      time: '1d ago',
      unread: false,
      type: 'info',
    },
  ];

  return (
    <header 
      id="fluent-top-nav"
      className="h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#16181D]/95 backdrop-blur-sm flex items-center justify-between px-6 z-10 sticky top-0 transition-colors select-none"
    >
      {/* Left: Swiss Breadcrumbs & Current Context */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
          TrackPal
        </span>
        <span className="text-xs text-neutral-300 dark:text-neutral-700">/</span>
        <h1 className="text-sm font-bold text-neutral-950 dark:text-white truncate max-w-xs md:max-w-md tracking-tight">
          {getBreadcrumbTitle()}
        </h1>
      </div>

      {/* Center / Right: Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Ant Design Style Search Input */}
        <div className="relative w-48 sm:w-64">
          <input
            id="top-nav-search-input"
            type="text"
            placeholder="Search circles, members, pot..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-xs bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200/50 dark:hover:bg-neutral-750 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800] outline-none transition-all duration-150 font-normal"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* How Paluwagan Works Guide */}
        <button
          id="top-nav-help-btn"
          onClick={onOpenOnboarding}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 transition-all cursor-pointer"
          title="Review Paluwagan Guide"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#F5B800]" />
          <span className="hidden md:inline">How It Works</span>
        </button>

        {/* Notifications Button & Popover */}
        <div className="relative">
          <button
            id="top-nav-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 relative cursor-pointer transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5B800] rounded-full" />
          </button>

          {/* Ant Design / Bento Popover Menu */}
          {showNotifications && (
            <div 
              className="absolute right-0 mt-2 w-80 rounded-xl p-3 shadow-xl border bg-white dark:bg-[#16181D] z-50"
              style={{
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800 mb-2">
                <span className="text-xs font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] text-[#F5B800] dark:text-[#FACC15] cursor-pointer hover:underline font-bold">
                  Mark all as read
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {mockNotifications.map((n) => (
                  <div 
                    key={n.id}
                    className={`p-2.5 rounded-lg transition-colors text-xs ${
                      n.unread 
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/40 dark:border-amber-800/40' 
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-850'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {n.type === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-[#F5B800] mt-0.5 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-neutral-900 dark:text-neutral-100">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-0.5">
                          {n.desc}
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA - Sunflower Yellow */}
        <button
          id="top-nav-create-circle-btn"
          onClick={onOpenNewGroup}
          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">New Circle</span>
        </button>
      </div>
    </header>
  );
};
