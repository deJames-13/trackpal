import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCw, 
  CalendarClock, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X
} from 'lucide-react';
import { CoinIcon } from '../Common/CoinIcon';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
  darkMode: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onFinish,
  darkMode,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      icon: CoinIcon,
      title: 'What is Paluwagan?',
      subtitle: 'The Traditional Rotating Savings Circle Made Modern',
      description: 'In a Paluwagan, a trusted group of friends, colleagues, or family members pool a fixed amount of money at regular intervals (weekly or semi-monthly).',
      highlight: 'Every member contributes equally each round.',
      color: 'text-neutral-950',
      bgBadge: 'bg-[#F5B800]',
    },
    {
      icon: RotateCw,
      title: 'How Payouts Rotate',
      subtitle: 'Guaranteed Lump-Sum Turn (Sahod)',
      description: 'Each cycle, one member is designated to receive the entire pooled pot. Slots can be chosen by lottery, consensus, or seniority. The cycle continues until everyone receives their pot once.',
      highlight: 'Transparent rotation order prevents payout disputes.',
      color: 'text-emerald-700 dark:text-emerald-300',
      bgBadge: 'bg-emerald-100 dark:bg-emerald-950/60',
    },
    {
      icon: CalendarClock,
      title: 'Setting Contribution Frequencies',
      subtitle: 'Synchronized Deadlines & Auto-Verification',
      description: 'Set custom deadlines matching payrolls (15th & 30th or weekly). Upload payment reference slips from GCash, Maya, or Bank transfers for instant organizer sign-off.',
      highlight: 'Automated nudge notifications keep contributions on time.',
      color: 'text-[#F5B800]',
      bgBadge: 'bg-neutral-950',
    },
    {
      icon: UserCheck,
      title: 'Inviting Friends & Building Trust',
      subtitle: 'Peer Trust Scores & Accountability',
      description: 'Invite members via link or direct contact. Each completed cycle and timely contribution boosts your verified Trust Score (up to 100%), unlocking higher capital circles.',
      highlight: 'Strong social ties ensure 99%+ completion rates.',
      color: 'text-neutral-950 dark:text-white',
      bgBadge: 'bg-neutral-100 dark:bg-neutral-800',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const current = slides[currentSlide];
  const IconComponent = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="onboarding-modal-card"
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181D] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-7 bg-[#F5B800]'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            id="onboarding-skip-btn"
            onClick={onClose}
            className="text-xs font-bold text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md"
          >
            Skip Guide
          </button>
        </div>

        {/* Animated Slide Content */}
        <div className="p-6 md:p-8 flex-1 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
            >
              {/* Feature Icon */}
              <div className={`w-16 h-16 rounded-2xl ${current.bgBadge} flex items-center justify-center ${current.color} mb-5 shadow-xs`}>
                <IconComponent className="w-8 h-8" />
              </div>

              {/* Slide Title */}
              <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">
                {current.title}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F5B800] mt-1">
                {current.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed max-w-md">
                {current.description}
              </p>

              {/* Highlight callout pill */}
              <div className="mt-5 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F5B800] shrink-0 stroke-[3]" />
                <span>{current.highlight}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-850 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <button
            id="onboarding-prev-btn"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentSlide === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Back</span>
          </button>

          <button
            id="onboarding-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F5B800] hover:bg-[#E0A700] active:bg-[#C79200] shadow-xs transition-all cursor-pointer"
          >
            <span>{currentSlide === slides.length - 1 ? 'Go to Dashboard' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
