'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../src/context/AuthContext';

interface AppNavbarProps {
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onOpenCommunity: () => void;
  onBackToOverview?: () => void;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  onOpenProfile,
  onOpenAdmin,
  onOpenCommunity,
  onBackToOverview,
}) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex justify-between items-center h-[72px]">
        {/* Left: Brand Logo & Back Control */}
        <div className="flex items-center gap-3">
          <Link href="/" onClick={onBackToOverview} className="flex items-center gap-2.5 group shrink-0">
            <span className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-xl shadow-md shadow-brand-orange/30 group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-2xl">school</span>
            </span>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-orange transition-colors">
              Examify
            </span>
          </Link>

          {onBackToOverview && (
            <button
              onClick={onBackToOverview}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors ml-2"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to Landing</span>
            </button>
          )}
        </div>

        {/* Center: Clean / Empty (Zero semester tabs, zero marketing links) */}

        {/* Right Side: Community Icon & Profile Badge Dropdown (App Shell) */}
        <div className="hidden md:flex items-center gap-3 relative">
          <button
            onClick={onOpenCommunity}
            className="text-xs font-bold text-slate-300 hover:text-brand-orange px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base text-brand-orange">forum</span>
            <span>Community Forum</span>
          </button>

          {user?.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-bold text-purple-300 bg-purple-900/50 hover:bg-purple-900/80 border border-purple-700/60 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>Admin</span>
            </button>
          )}

          {/* User Profile Avatar Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-1.5 rounded-2xl transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user?.name?.charAt(0) || 'S'}
              </span>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-tight">{user?.name || 'BCA Student'}</span>
                <span className="text-[10px] font-mono text-brand-orange font-bold block">{user?.usn || '1NC22CS123'}</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-base ml-1">expand_more</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in space-y-1">
                <div className="p-2.5 border-b border-slate-800">
                  <span className="text-xs font-bold text-white block">{user?.name}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">{user?.usn}</span>
                </div>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-brand-orange">account_circle</span>
                  <span>Student Profile</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-brand-orange">settings</span>
                  <span>Settings &amp; Preferences</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    if (onBackToOverview) onBackToOverview();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-950/40 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-6 py-4 space-y-3 shadow-xl animate-fade-in">
          <button
            onClick={() => {
              onOpenCommunity();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-slate-800 text-xs font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-brand-orange">forum</span>
            <span>Community Discussion Forum</span>
          </button>

          <button
            onClick={() => {
              onOpenProfile();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-slate-800 text-xs font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-brand-orange">account_circle</span>
            <span>Student Profile ({user?.usn})</span>
          </button>

          <button
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
              if (onBackToOverview) onBackToOverview();
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-red-950/40 text-xs font-bold text-red-400 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
};
