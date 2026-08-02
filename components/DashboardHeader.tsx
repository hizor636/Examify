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
        {/* Spacer for potential breadcrumbs in the future */}
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
