'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
  onNavClick?: () => void;
  onGoHome?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onNavClick, onGoHome }) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Academic', items: [
      { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
      { name: 'Notes Vault', href: '/dashboard/notes', icon: 'inventory_2' },
      { name: 'PYQ Archive', href: '/dashboard/papers', icon: 'history_edu' },
      { name: 'Assignment Hub', href: '/dashboard/assignments', icon: 'assignment' },
    ]},
    { label: 'Practice', items: [
      { name: 'Quiz Sprint', href: '/dashboard/practice/sprint', icon: 'timer' },
      { name: 'Imp. Questions', href: '/dashboard/practice/important-questions', icon: 'priority_high' },
      { name: 'Lab & Viva', href: '/dashboard/practice/lab-viva', icon: 'science' },
    ]},
    { label: 'AI Tools', items: [
      { name: 'Study Assistant', href: '/dashboard/ai/study-assistant', icon: 'psychology' },
      { name: 'Exam Mode', href: '/dashboard/ai/exam-mode', icon: 'terminal' },
    ]},
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col border-r border-slate-200 shadow-sm">
      <div 
        className="p-8 flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome}
      >
        <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white">
          <span className="material-symbols-outlined">school</span>
        </div>
        <span className="font-display-lg text-[32px] text-slate-900 tracking-tighter">Examify</span>
      </div>
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.label}</div>
            <div className="space-y-1 mt-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={onNavClick}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${
                      isActive 
                        ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-brand-orange'
                    }`}
                  >
                    <span className="material-symbols-outlined mr-3 text-[20px]">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
