'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '../navigation';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, UserPlus } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale() as 'en' | 'es';
  const isEs = locale === 'es';
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about-us', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/team', label: t('team') },
    { href: '/blog', label: t('blog') },
    { href: '/contact-us', label: t('contact') }
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Glass Header Container */}
      <div
        className={`w-full transition-all duration-300 rounded-2xl py-2.5 px-6 flex items-center justify-between border shadow-2xl backdrop-blur-2xl ${
          isScrolled
            ? 'bg-[#0f182c]/75 border-blue-400/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
            : 'bg-[#0f182c]/95 border-blue-400/20 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]'
        }`}
      >
        {/* Brand Logo - Raw Logo Image ONLY */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo Absolute.png"
              alt="Absolute Group Inc."
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links - Clean Illuminated Text ONLY */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Language + Normal Client Login Button) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <LanguageSwitcher />

          {/* Normal Client Login Button */}
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#0E4194] hover:bg-[#1453B9] text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <UserPlus className="w-3.5 h-3.5" />
            {isEs ? 'Únete al team' : 'Join the team'}
          </Link>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 border border-blue-400/30 backdrop-blur-2xl rounded-2xl p-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl" style={{ background: '#0f182c' }}>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10">
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0E4194] rounded-xl shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              {isEs ? 'Únete al team' : 'Join the team'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
