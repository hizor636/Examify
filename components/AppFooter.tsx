'use client';

import React from 'react';

interface AppFooterProps {
  onOpenProfile?: () => void;
  onOpenCommunity?: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onOpenProfile, onOpenCommunity }) => {
  return (
    <footer className="w-full border-t border-slate-800 py-8 bg-slate-900 text-white mt-12">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-brand-orange flex items-center justify-center rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-white text-lg">school</span>
            </span>
            <div>
              <span className="text-base font-bold tracking-tight text-white block">Examify Student Portal</span>
              <span className="text-[10px] text-slate-400 font-mono">BCA Academic Resource Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-350">
            {onOpenCommunity && (
              <button onClick={onOpenCommunity} className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">forum</span>
                <span>Community Forum</span>
              </button>
            )}

            {onOpenProfile && (
              <button onClick={onOpenProfile} className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">account_circle</span>
                <span>Student Profile</span>
              </button>
            )}

            {onOpenProfile && (
              <button onClick={onOpenProfile} className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">settings</span>
                <span>Settings</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
          <p>© 2026 Examify • Built for BCA Academic Excellence.</p>
          <p className="font-medium text-slate-500">Verified Resources • Exam-Oriented Engine</p>
        </div>
      </div>
    </footer>
  );
};
