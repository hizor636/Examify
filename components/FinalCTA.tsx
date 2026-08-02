'use client';

import React from 'react';

interface FinalCTAProps {
  onBrowseSemester?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBrowseSemester }) => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-24 text-center">
      <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-orange/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-slate-900 px-3.5 py-1 rounded-full border border-slate-800 mb-6 inline-block">
            Start Preparing Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Ready to ace your upcoming BCA exams?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 font-normal leading-relaxed">
            Open your semester and start revising in minutes with verified notes, 2025 question papers, and AI doubt help.
          </p>

          <button
            onClick={onBrowseSemester}
            className="bg-brand-orange text-white px-9 py-4 rounded-xl font-semibold text-lg btn-primary-glow inline-flex items-center gap-2.5 group"
          >
            <span>Open Your Semester &amp; Start Revising</span>
            <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
