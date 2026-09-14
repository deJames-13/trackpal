import React from 'react';
import { 
  PiggyBank, 
  ShieldCheck, 
  RotateCw, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  CreditCard,
  Sun,
  Moon,
  Coins
} from 'lucide-react';
import { CoinIcon } from '../Common/CoinIcon';

interface GuestLandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onExploreDemo: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const GuestLanding: React.FC<GuestLandingProps> = ({
  onGetStarted,
  onSignIn,
  onExploreDemo,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7] dark:bg-[#0D0E11] text-neutral-950 dark:text-neutral-50 transition-colors selection:bg-[#F5B800] selection:text-neutral-950 font-sans">
      {/* Swiss Minimalist Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#16181D]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-6 py-3.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          {/* Minted Coin Brand Icon */}
          <CoinIcon size={34} className="w-8 h-8 rounded-xl shadow-xs" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-neutral-950 dark:text-white">
                TrackPal
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#F5B800] text-neutral-950">
                Paluwagan
              </span>
            </div>
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest hidden sm:block">
              Rotating Savings & Credit Ledger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle */}
          <button
            id="landing-theme-toggle"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer"
            title="Toggle Light / Dark theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F5B800]" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          <button
            id="landing-signin-btn"
            onClick={onSignIn}
            className="text-xs font-bold px-4 py-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all cursor-pointer"
          >
            Sign In
          </button>

          <button
            id="landing-getstarted-nav-btn"
            onClick={onGetStarted}
            className="text-xs font-bold px-4 py-2 rounded-lg text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 md:py-14 flex flex-col items-center">
        {/* Ant Design Style Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-xs mb-5 text-neutral-800 dark:text-neutral-200">
          <span className="w-2 h-2 rounded-full bg-[#F5B800]" />
          <span>Next Generation Community Paluwagan & ROSCA Tracker</span>
        </div>

        {/* Swiss High-Contrast Display Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center tracking-tight text-neutral-950 dark:text-white max-w-4xl leading-[1.05]">
          Transparent, Dispute-Free <br />
          <span className="bg-[#F5B800] text-neutral-950 px-2 py-0.5 rounded-lg inline-block my-1">
            Paluwagan
          </span> Circles.
        </h1>

        {/* Swiss Subtitle */}
        <p className="mt-5 text-base md:text-lg text-neutral-600 dark:text-neutral-400 text-center max-w-2xl leading-relaxed">
          Structured bento compartmentalization meets enterprise ledger accountability. 
          Automate payout turns, verify GCash/Maya contribution slips, and protect community trust.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
          <button
            id="hero-cta-get-started"
            onClick={onGetStarted}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Start a Paluwagan Circle</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            id="hero-cta-explore-demo"
            onClick={onExploreDemo}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-xs transition-all cursor-pointer"
          >
            <span>Explore Live Dashboard</span>
          </button>
        </div>

        {/* BENTO BOX HERO GRID */}
        <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Bento Block 1: Highlight Sunflower Box (8 cols) */}
          <div className="md:col-span-8 rounded-2xl bg-[#F5B800] text-neutral-950 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-neutral-950 text-white px-2.5 py-0.5 rounded-md">
                  Active Sahod Round
                </span>
                <span className="text-xs font-bold bg-black/10 px-2 py-0.5 rounded">
                  Round 4 of 10
                </span>
              </div>
              <p className="mt-4 text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                Family & Friends Grand Pot
              </p>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mt-1">
                ₱50,000
              </div>
              <p className="text-xs font-semibold text-neutral-900 mt-2">
                Payout distribution date: <strong>September 18, 2026</strong> (4 days remaining)
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-950 text-white flex items-center justify-center font-black text-sm">
                  JD
                </div>
                <div>
                  <p className="text-xs font-black">Juan Dela Cruz (You)</p>
                  <p className="text-[11px] font-medium text-neutral-800">Assigned Payout Recipient</p>
                </div>
              </div>
              <div className="bg-black/10 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-900">
                8 of 10 Paid (80% Collected)
              </div>
            </div>
          </div>

          {/* Bento Block 2: Trust & Integrity Compartment (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-neutral-500 text-xs font-bold uppercase tracking-wider">
                <span>Trust Rating</span>
                <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
              </div>
              <div className="mt-4 text-4xl sm:text-5xl font-black tracking-tighter text-neutral-950 dark:text-white">
                99.4%
              </div>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                ● Ant Design Tier AAA Verified
              </span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed">
                Zero default history across 14 rotation cycles with cryptographic slip verification.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Platform Rank:</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">Organizer Top 1%</span>
            </div>
          </div>

          {/* Bento Block 3: Automated Rotations (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 flex items-center justify-center text-[#F5B800] mb-4">
              <RotateCw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
              Fair Rotation Scheduling
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
              Transparent turn-taking logic. Eliminate disputes with immutable slot queues, emergency swap votes, and automated payouts.
            </p>
          </div>

          {/* Bento Block 4: Synchronized Deadlines (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mb-4">
              <Calendar className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
              Synchronized Hulog Due Dates
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
              Automated reminders before every payout. Synchronize monthly or bi-weekly cycles with SMS nudges and due-date countdowns.
            </p>
          </div>

          {/* Bento Block 5: Social Accountability (4 cols) */}
          <div className="md:col-span-4 rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 flex items-center justify-center text-[#F5B800] mb-4">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
              Verified Social Network
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
              Invite family, co-workers, and neighborhood circles. Keep all member bank & GCash details verified within a single private ledger.
            </p>
          </div>
        </div>

        {/* Minimal Swiss Footer */}
        <div className="mt-16 text-center text-xs text-neutral-400 dark:text-neutral-500 pb-6 border-t border-neutral-200 dark:border-neutral-800 pt-6 w-full">
          <p className="font-semibold">
            TrackPal Paluwagan Architecture • Ant Design Table Hierarchy • Bento Box UI • Swiss Typographic Minimalism
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">
            A traditional Rotating Savings & Credit Association (ROSCA / Tandas / Chit Funds) digital platform.
          </p>
        </div>
      </main>
    </div>
  );
};
