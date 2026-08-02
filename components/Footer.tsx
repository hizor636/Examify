'use client';

import React from 'react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-slate-200 py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-slate-100">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-brand-orange flex items-center justify-center rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-white text-lg">school</span>
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">Examify</span>
            </div>
            <p className="text-xs text-slate-500 font-medium max-w-sm mt-1">
              Your BCA exam resources, organized for last-minute prep. Semester notes, 2025 question papers, model answers, and AI doubt help.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollToSection('hero')} className="hover:text-brand-orange transition-colors">
              Overview
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-brand-orange transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('why-examify')} className="hover:text-brand-orange transition-colors">
              Why Examify
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-brand-orange transition-colors">
              About Us
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© 2026 Examify. Built for BCA Academic Excellence.</p>
          <p className="font-medium text-slate-400">Organized • Verified • Exam-Oriented</p>
        </div>
      </div>
    </footer>
  );
};
