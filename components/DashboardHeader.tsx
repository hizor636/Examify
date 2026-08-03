'use client';

import React from 'react';
import { useAuth } from '../src/context/AuthContext';

interface DashboardHeaderProps {
  onOpenProfile?: () => void;
  onOpenCommunity?: () => void;
  onOpenSettings?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenProfile,
  onOpenCommunity,
  onOpenSettings,
}) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-gutter flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8 pl-6">
        {user && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">
              {user.name} <span className="text-slate-400 font-normal">({user.usn})</span>
            </span>
            <span className="text-[11px] font-medium text-brand-orange uppercase tracking-wider">
              Semester {user.semester} {user.section ? `• Section ${user.section}` : ''}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div 
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-white text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
