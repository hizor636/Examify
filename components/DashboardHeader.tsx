'use client';

import React from 'react';

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
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-gutter flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <nav className="flex gap-6">
          <button onClick={onOpenCommunity} className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors">
            Community Forum
          </button>
          <button onClick={onOpenProfile} className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors">
            Student Profile
          </button>
          <button onClick={onOpenSettings} className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors">
            Settings
          </button>
        </nav>
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
