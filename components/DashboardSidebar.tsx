'use client';

import React from 'react';
import Link from 'next/link';

interface DashboardSidebarProps {
  onNavClick?: () => void;
  onGoHome?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onNavClick, onGoHome }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#0c1322] z-50 flex flex-col border-r border-white/5">
      <div 
        className="p-gutter flex items-center gap-3 mb-stack-lg cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome}
      >
        <div className="w-10 h-10 rounded-xl bg-[#ffb690] flex items-center justify-center">
          <span className="material-symbols-outlined text-[#552100]">school</span>
        </div>
        <span className="font-display-lg text-[32px] text-white tracking-tighter">Examify</span>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <div className="px-4 py-2 text-label-caps font-label-caps text-slate-400/60 uppercase">Academic</div>
        <a aria-current="page" className="flex items-center px-4 py-3 rounded-lg transition-all bg-[#f97316] text-white font-bold shadow-lg" href="#">
          <span className="material-symbols-outlined mr-3">dashboard</span>Dashboard
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">inventory_2</span>Notes Vault
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">history_edu</span>PYQ Archive
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">assignment</span>Assignment Hub
        </a>
        <div className="px-4 py-4 text-label-caps font-label-caps text-slate-400/60 uppercase">Practice</div>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">timer</span>Quiz Sprint
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">priority_high</span>Imp. Questions
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">science</span>Lab &amp; Viva
        </a>
        <div className="px-4 py-4 text-label-caps font-label-caps text-slate-400/60 uppercase">AI Tools</div>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">psychology</span>Study Assistant
        </a>
        <a className="flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all" href="#">
          <span className="material-symbols-outlined mr-3">terminal</span>Exam Mode
        </a>
      </nav>
    </aside>
  );
};
