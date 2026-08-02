'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../src/context/AuthContext';

interface NavbarProps {
  onOpenLogin?: () => void;
  onGetStarted?: () => void;
  activeSemester?: number | null;
  onSemesterChange?: (sem: number) => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onOpenCommunity?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGetStarted,
  activeSemester = 4,
  onSemesterChange,
  onOpenProfile,
  onOpenAdmin,
  onOpenCommunity,
}) => {
  const { user, setSemester } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSem = (sem: number) => {
    if (!user) {
      if (onGetStarted) onGetStarted();
    } else {
      setSemester(sem);
      if (onSemesterChange) onSemesterChange(sem);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-0'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-1'
      }`}
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 flex justify-between items-center h-[72px]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-xl shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-2xl">school</span>
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-orange transition-colors">
            Examify
          </span>
        </Link>

        {/* Top Navbar Semester Switcher */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-bold uppercase text-slate-500 pl-2.5 pr-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-brand-orange">tune</span>
            <span>Sem:</span>
          </span>
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              onClick={() => handleSelectSem(sem)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSemester === sem
                  ? 'bg-brand-orange text-white shadow-sm scale-105'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenCommunity && (
            <button
              onClick={onOpenCommunity}
              className="text-xs font-bold text-slate-700 hover:text-brand-orange px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">forum</span>
              <span>Community</span>
            </button>
          )}

          {user?.role === 'admin' && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>Admin</span>
            </button>
          )}

          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 px-3.5 py-2 rounded-xl transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center">
                {user.name.charAt(0)}
              </span>
              <span className="text-xs font-bold text-slate-800">{user.usn || user.name}</span>
            </button>
          ) : (
            <button
              onClick={onGetStarted}
              aria-label="Get Started"
              className="bg-brand-orange text-white px-5 py-2.5 rounded-xl font-bold text-xs btn-primary-glow flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-brand-orange transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-6 py-4 space-y-4 shadow-lg animate-fade-in">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Switch Semester</span>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  onClick={() => {
                    handleSelectSem(sem);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border ${
                    activeSemester === sem
                      ? 'bg-brand-orange text-white border-brand-orange'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {onOpenCommunity && (
              <button
                onClick={() => {
                  onOpenCommunity();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">forum</span>
                <span>Community Discussion Forum</span>
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  if (onOpenProfile) onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold text-center"
              >
                Student Profile ({user.usn})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onGetStarted) onGetStarted();
                }}
                className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold text-xs text-center btn-primary-glow"
              >
                Get Started (USN Verification)
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
