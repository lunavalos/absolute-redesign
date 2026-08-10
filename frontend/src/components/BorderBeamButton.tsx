'use client';

import { ReactNode } from 'react';

interface BorderBeamButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function BorderBeamButton({
  children,
  href,
  onClick,
  className = ''
}: BorderBeamButtonProps) {
  const buttonMarkup = (
    <div className={`relative inline-flex p-[1px] rounded-xl overflow-hidden group shadow-xl transition-transform hover:scale-[1.03] active:scale-[0.97] bg-white/10 ${className}`}>
      {/* 1px Perfectly Fluid Rotating Conic Beam (Square aspect-ratio ensures 100% constant linear speed) */}
      <div className="absolute top-1/2 left-1/2 w-[300%] aspect-square animate-border-beam-fluid bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_330deg,#60a5fa_350deg,#ffffff_360deg)] opacity-100 pointer-events-none" />

      {/* Solid Inner Button Container */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-[11px] bg-[#0E4194] hover:bg-[#1453B9] text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300 w-full">
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="nofollow noreferrer">
        {buttonMarkup}
      </a>
    );
  }

  return <button onClick={onClick}>{buttonMarkup}</button>;
}
