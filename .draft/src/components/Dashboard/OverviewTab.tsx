import React, { useState } from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Wallet,
  LayoutGrid,
  Table as TableIcon,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PaluwaganGroup, CurrentUser } from '../../types';
import { CoinIcon } from '../Common/CoinIcon';

interface OverviewTabProps {
  groups: PaluwaganGroup[];
  currentUser: CurrentUser;
  onSelectGroup: (groupId: string) => void;
  onOpenNewGroup: () => void;
  onSubmitContribution: (group: PaluwaganGroup) => void;
  darkMode: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  groups,
  currentUser,
  onSelectGroup,
  onOpenNewGroup,
  onSubmitContribution,
  darkMode,
}) => {
  const [viewMode, setViewMode] = useState<'bento' | 'table'>('bento');
  const [statusFilter, setStatusFilter] = useState<'all' | 'due' | 'active'>('all');

  const primaryGroup = groups[0] || null;
  const currentRecipient = primaryGroup?.members.find((m) => m.status === 'current_pot') || null;

  const totalPooledFunds = groups.reduce((acc, g) => acc + g.potAmount, 0);
  const totalContributionsPaid = groups.reduce((acc, g) => {
    const user = g.members.find((m) => m.isCurrentUser);
    return acc + (user?.currentCyclePaid ? g.contributionAmount : 0);
  }, 0);

  const pendingContributions = groups.filter((g) => {
    const userMember = g.members.find((m) => m.isCurrentUser);
    return userMember && !userMember.currentCyclePaid;
  });

  const filteredGroups = groups.filter((g) => {
    if (statusFilter === 'due') {
      const user = g.members.find((m) => m.isCurrentUser);
      return user && !user.currentCyclePaid;
    }
    if (statusFilter === 'active') {
      return g.status === 'active';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. BENTO BOX MAIN ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bento Box A: High-Contrast Sunflower Yellow Sahod Box (Span 8) */}
        {primaryGroup && (
          <div 
            id="bento-hero-payout"
            className="lg:col-span-8 rounded-2xl bg-[#F5B800] text-neutral-950 p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-all select-none"
          >
            <div>
              {/* Header tags in Swiss style */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-950 text-white px-2.5 py-1 rounded-md">
                    Next Payout Round
                  </span>
                  <span className="text-xs font-bold text-neutral-900 bg-black/10 px-2.5 py-1 rounded-md">
                    {primaryGroup.name}
                  </span>
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 bg-black/10 px-2.5 py-1 rounded-md">
                  Round {primaryGroup.currentRound} of {primaryGroup.totalRounds}
                </span>
              </div>

              {/* Massive Swiss Display Typography for the Pot */}
              <div className="mt-3">
                <p className="text-[11px] font-black uppercase tracking-wider text-neutral-800">
                  Total Disbursable Pot Amount
                </p>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-neutral-950 leading-none mt-1">
                  ₱{primaryGroup.potAmount.toLocaleString()}
                </div>
                <p className="text-xs font-semibold text-neutral-900 mt-2">
                  Scheduled for distribution on <strong>{primaryGroup.nextPayoutDate}</strong> (4 days remaining)
                </p>
              </div>

              {/* Recipient Bento Compartment */}
              {currentRecipient && (
                <div className="mt-5 p-3.5 rounded-xl bg-neutral-950 text-white flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={currentRecipient.avatar}
                      alt={currentRecipient.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F5B800] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        Assigned Recipient • Slot #{currentRecipient.slotNumber}
                      </p>
                      <p className="text-sm font-black text-white truncate">
                        {currentRecipient.name} {currentRecipient.isCurrentUser && '(You!)'}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5B800] text-neutral-950 inline-block">
                      ★ {currentRecipient.trustScore}% Trust
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions in Bento Card */}
            <div className="mt-6 pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                <span>Contribution share:</span>
                <span className="bg-black/10 px-2 py-0.5 rounded">₱{primaryGroup.contributionAmount.toLocaleString()} / member</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectGroup(primaryGroup.id)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-neutral-950 bg-white/90 hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  View Rotation Order →
                </button>
                <button
                  onClick={() => onSubmitContribution(primaryGroup)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-850 active:bg-neutral-900 transition-all cursor-pointer shadow-xs"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Submit Hulog</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bento Box B: Trust & Reliability Dashboard (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Member Standing
              </span>
              <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
            </div>

            {/* Massive Swiss Typography Score */}
            <div className="mt-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-neutral-950 dark:text-white">
                {currentUser.trustScore}%
              </span>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Ant Design Grade AAA
                </span>
              </div>
            </div>

            {/* Compartment breakdown */}
            <div className="mt-5 space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Completed Cycles</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{currentUser.completedCycles} Cycles (100% On-Time)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Slip Verifications</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">14 Verified • 0 Disputes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Current Status</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  pendingContributions.length > 0
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {pendingContributions.length > 0 ? `${pendingContributions.length} Hulog Due Soon` : 'All Cycles Up to Date'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={onOpenNewGroup}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Launch New Paluwagan Circle</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY BENTO ROW: 4 COMPARTMENTS (Financial Summary) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mini Bento 1 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Total Pooled Capital
          </span>
          <p className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-1">
            ₱{totalPooledFunds.toLocaleString()}
          </p>
          <span className="text-[11px] font-semibold text-neutral-500 mt-1 block">
            Across {groups.length} active circles
          </span>
        </div>

        {/* Mini Bento 2 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Your Contributions
          </span>
          <p className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-1">
            ₱{totalContributionsPaid.toLocaleString()}
          </p>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
            100% Verified Payment Slips
          </span>
        </div>

        {/* Mini Bento 3 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Next Payout Date
          </span>
          <p className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-1">
            {primaryGroup?.nextPayoutDate || 'N/A'}
          </p>
          <span className="text-[11px] font-semibold text-[#8A6300] dark:text-[#FACC15] mt-1 block">
            {primaryGroup?.name}
          </span>
        </div>

        {/* Mini Bento 4 */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Active Community Peers
          </span>
          <p className="text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-1">
            {groups.reduce((acc, g) => acc + g.members.length, 0)} Members
          </p>
          <span className="text-[11px] font-semibold text-neutral-500 mt-1 block">
            Synchronized Schedules
          </span>
        </div>
      </div>

      {/* 3. ANT DESIGN ENTERPRISE TABLE & BENTO CARD HYBRID */}
      <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-4">
        {/* Ant Design Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h2 className="text-base font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Paluwagan Circles Directory
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Enterprise management of active rotation cycles, disbursement timelines, and member contribution compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs (Ant Design segmented style) */}
            <div className="inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                All ({groups.length})
              </button>
              <button
                onClick={() => setStatusFilter('due')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  statusFilter === 'due'
                    ? 'bg-[#F5B800] text-neutral-950 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Due Hulog ({pendingContributions.length})
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-800 p-0.5 text-neutral-500">
              <button
                onClick={() => setViewMode('bento')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'bento' ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs' : ''}`}
                title="Bento Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'table' ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs' : ''}`}
                title="Enterprise Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Ant Design Enterprise Table */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-3">Circle Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Pot Amount</th>
                  <th className="py-3 px-3">Hulog / Share</th>
                  <th className="py-3 px-3">Round Progress</th>
                  <th className="py-3 px-3">Next Payout</th>
                  <th className="py-3 px-3">Hulog Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredGroups.map((group) => {
                  const progressPercent = Math.round((group.currentRound / group.totalRounds) * 100);
                  const userMember = group.members.find((m) => m.isCurrentUser);
                  const isUserPaid = userMember?.currentCyclePaid;

                  return (
                    <tr 
                      key={group.id} 
                      className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                      onClick={() => onSelectGroup(group.id)}
                    >
                      <td className="py-3 px-3 font-bold text-neutral-950 dark:text-white">
                        {group.name}
                        <span className="block text-[10px] text-neutral-400 font-normal truncate max-w-xs">
                          {group.members.length} members • {group.frequency}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {group.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-neutral-950 dark:text-white">
                        ₱{group.potAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-semibold text-neutral-700 dark:text-neutral-300">
                        ₱{group.contributionAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 min-w-[130px]">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-semibold">Round {group.currentRound}/{group.totalRounds}</span>
                          <span className="font-bold text-[#8A6300] dark:text-[#FACC15]">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#F5B800] h-full rounded-full" style={{ width: `${progressPercent}%` }} />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
                        {group.nextPayoutDate}
                      </td>
                      <td className="py-3 px-3">
                        {isUserPaid ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Paid</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                            <AlertCircle className="w-3 h-3" />
                            <span>Due</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectGroup(group.id);
                          }}
                          className="px-2.5 py-1 text-xs font-bold rounded text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] transition-colors"
                        >
                          Open →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* View Mode 2: Bento Grid Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => {
              const progressPercent = Math.round((group.currentRound / group.totalRounds) * 100);
              const userMember = group.members.find((m) => m.isCurrentUser);
              const isUserPaid = userMember?.currentCyclePaid;

              return (
                <div
                  key={group.id}
                  id={`bento-circle-card-${group.id}`}
                  onClick={() => onSelectGroup(group.id)}
                  className="rounded-xl p-5 bg-neutral-50/70 dark:bg-[#1C1F26] border border-neutral-200 dark:border-neutral-800 hover:border-[#F5B800] dark:hover:border-[#F5B800] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        {group.category}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-500 capitalize">
                        {group.frequency}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-neutral-950 dark:text-white group-hover:text-[#8A6300] dark:group-hover:text-[#FACC15] transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {group.description}
                    </p>

                    {/* Pot & Share Numbers */}
                    <div className="mt-4 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total Pot</span>
                        <span className="text-base font-black text-neutral-950 dark:text-white">
                          ₱{group.potAmount.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">Hulog / Turn</span>
                        <span className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                          ₱{group.contributionAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Round {group.currentRound} of {group.totalRounds}
                        </span>
                        <span className="font-bold text-[#8A6300] dark:text-[#FACC15]">
                          {progressPercent}% Complete
                        </span>
                      </div>
                      <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F5B800] rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center -space-x-1.5">
                      {group.members.slice(0, 4).map((m, i) => (
                        <img
                          key={i}
                          src={m.avatar}
                          alt={m.name}
                          className="w-6 h-6 rounded-full object-cover border border-white dark:border-neutral-800"
                          title={m.name}
                        />
                      ))}
                      {group.members.length > 4 && (
                        <span className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[10px] font-bold flex items-center justify-center border border-white dark:border-neutral-800">
                          +{group.members.length - 4}
                        </span>
                      )}
                    </div>

                    <div>
                      {isUserPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Hulog Paid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-950 bg-[#F5B800] px-2 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3" />
                          <span>Due</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
