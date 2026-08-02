'use client';

import React from 'react';

export const TrustStrip: React.FC = () => {
  const stats = [
    {
      metric: '6 Semesters',
      label: 'Full BCA Syllabus Covered',
      icon: 'school',
    },
    {
      metric: '2025 Papers',
      label: 'Latest University Exam Papers',
      icon: 'folder_zip',
    },
    {
      metric: '100% Verified',
      label: 'Academic Notes & Answers',
      icon: 'verified_user',
    },
    {
      metric: '24/7 AI Help',
      label: 'Instant Doubt Resolutions',
      icon: 'psychology',
    },
  ];

  return (
    <section className="w-full bg-slate-950 text-white py-10 mb-20 shadow-inner border-y border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-brand-orange/40 hover:bg-slate-900 transition-all duration-300 card-hover-lift"
          >
            <span className="w-10 h-10 rounded-lg bg-orange-500/10 text-brand-orange flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              {item.metric}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
