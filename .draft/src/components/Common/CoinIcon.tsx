import React from 'react';

interface CoinIconProps {
  className?: string;
  size?: number;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ 
  className = "w-8 h-8", 
  size = 32 
}) => {
  return (
    <div 
      className={`relative rounded-xl bg-[#F5B800] text-neutral-950 flex items-center justify-center shrink-0 shadow-xs select-none ${className}`}
      style={{ minWidth: size, minHeight: size }}
    >
      <svg 
        width={Math.round(size * 0.65)} 
        height={Math.round(size * 0.65)} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Outer Coin Edge */}
        <circle cx="12" cy="12" r="9" />
        {/* Inner Coin Ridge / Rim */}
        <circle cx="12" cy="12" r="6.2" strokeWidth="1.2" strokeDasharray="1.5 2" />
        {/* Crisp Currency Pillar / ₱ Paluwagan Coin Center */}
        <path d="M12 7v10" strokeWidth="2.2" />
        <path d="M9.5 9.5h5" strokeWidth="2.2" />
        <path d="M9.5 12h5" strokeWidth="2.2" />
      </svg>
    </div>
  );
};

export const StackedCoinsIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h2" />
      <path d="M8 5v2" />
    </svg>
  );
};
