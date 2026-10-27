'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '../navigation';
import { UserPlus } from 'lucide-react';

export default function JoinTeamBubble() {
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';
  const pathname = usePathname();

  // Hide the floating button if user is already on the application form page
  if (pathname === '/apply') {
    return null;
  }

  const label = isEs ? 'Únete al equipo' : 'Join the team';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover (desktop) */}
      <div
        className="mr-3 pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 px-3.5 py-2 rounded-xl bg-[#0f182c]/95 backdrop-blur-md text-white text-xs font-bold tracking-wide shadow-2xl border border-blue-400/30 whitespace-nowrap hidden sm:flex items-center gap-1.5"
        role="tooltip"
      >
        <span>{label}</span>
      </div>

      {/* Floating Bubble Button */}
      <Link
        href="/apply"
        aria-label={label}
        title={label}
        className="relative w-14 h-14 rounded-full bg-[#BE0D08] hover:bg-[#a10b07] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(190,13,8,0.5)] hover:shadow-[0_12px_40px_rgba(190,13,8,0.75)] border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/40"
      >
        {/* Soft pulse glow ring */}
        <span className="absolute -inset-1 rounded-full bg-red-600/30 animate-pulse pointer-events-none -z-10" />

        {/* User icon */}
        <UserPlus className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </Link>
    </div>
  );
}
