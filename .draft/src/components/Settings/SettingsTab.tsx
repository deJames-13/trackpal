import React from 'react';
import { 
  Sun, 
  Moon, 
  ShieldCheck, 
  Bell, 
  Database, 
  Code, 
  CheckCircle2, 
  Globe, 
  DollarSign, 
  Sliders
} from 'lucide-react';
import { CoinIcon } from '../Common/CoinIcon';

interface SettingsTabProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
          System Settings & Preferences
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Configure visual appearance, Paluwagan currency defaults, and ledger backend integration.
        </p>
      </div>

      {/* Bento Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Appearance Bento Compartment */}
        <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                Visual Theme
              </span>
              <Sliders className="w-4 h-4 text-[#F5B800]" />
            </div>

            <h3 className="text-base font-black text-neutral-950 dark:text-white mt-3">
              Theme Mode & Colorway
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Swiss-inspired high contrast with vibrant Sunflower Yellow highlights.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Display Mode
            </span>
            <button
              onClick={onToggleDarkMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#F5B800]" /> : <Moon className="w-3.5 h-3.5 text-neutral-600" />}
              <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Active Brand Color
            </span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#F5B800] ring-2 ring-offset-2 ring-[#F5B800]" title="Sunflower Yellow" />
              <span className="text-xs font-bold text-neutral-950 dark:text-neutral-200">#F5B800</span>
            </div>
          </div>
        </div>

        {/* 2. Paluwagan Currency & Defaults Bento Compartment */}
        <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                Localization
              </span>
              <CoinIcon size={18} className="text-[#F5B800]" />
            </div>

            <h3 className="text-base font-black text-neutral-950 dark:text-white mt-3">
              Currency & Rotation Rules
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Default monetary unit and automatic penalty enforcement grace periods.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Primary Currency
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F5B800] text-neutral-950 text-xs font-black">
              PHP (₱ - Philippine Peso)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Grace Period Tolerance
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-black text-neutral-950 dark:text-white">
              24 Hours
            </span>
          </div>
        </div>
      </div>

      {/* 3. Laravel Backend API Integration Architecture Bento */}
      <div className="rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#F5B800]" />
            <h3 className="text-base font-black text-neutral-950 dark:text-white tracking-tight">
              Backend REST API Integration Architecture
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready for Production</span>
          </span>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Structured for seamless binding to enterprise backend API controllers (Sanctum authentication, rotating savings schedules, cryptographic lottery seeds, and slip multipart uploads):
        </p>

        <div className="p-4 rounded-xl bg-neutral-950 text-[#F5B800] font-mono text-xs space-y-1.5 overflow-x-auto">
          <p><span className="text-emerald-400 font-bold">GET </span> <span className="text-white">/api/v1/paluwagan/groups</span></p>
          <p><span className="text-[#F5B800] font-bold">POST</span> <span className="text-white">/api/v1/paluwagan/groups/{'{id}'}/contributions</span></p>
          <p><span className="text-emerald-400 font-bold">GET </span> <span className="text-white">/api/v1/paluwagan/groups/{'{id}'}/rotation-order</span></p>
          <p><span className="text-amber-300 font-bold">POST</span> <span className="text-white">/api/v1/paluwagan/members/{'{id}'}/nudge</span></p>
        </div>
      </div>
    </div>
  );
};
