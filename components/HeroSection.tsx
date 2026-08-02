'use client';

import React from 'react';

interface HeroSectionProps {
  onBrowseSemester?: () => void;
  onStartRevising?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseSemester,
  onStartRevising,
}) => {
  return (
    <section id="hero" className="max-w-[1100px] mx-auto px-6 mb-16 text-center relative pt-8 sm:pt-12">
      {/* Subtle Background Glow Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] bg-gradient-to-tr from-orange-400/10 to-amber-200/20 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      {/* Hero Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50/90 border border-brand-orange/20 mb-6 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
        <span className="text-xs font-semibold tracking-wide text-slate-800">
          Built for Last-Minute BCA Exam Success
        </span>
      </div>

      {/* Main Headline with Staggered Entrance */}
      <h1 className="font-heading text-3xl sm:text-5xl md:text-[58px] font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.12] tracking-tight animate-fade-in-delay-1">
        Your BCA exam resources, organized for last-minute prep.
      </h1>

      {/* Subheadline with Delay */}
      <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto font-normal animate-fade-in-delay-2">
        Access semester-wise notes, 2025 question papers, model answers, and AI-powered doubt support in one clean place.
      </p>

      {/* Action Buttons with Clear Hierarchy */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-delay-3">
        {/* Primary CTA: Dominant Action */}
        <button
          onClick={onBrowseSemester}
          className="w-full sm:w-auto bg-brand-orange text-white px-9 py-4 rounded-lg font-semibold text-base btn-primary-glow flex items-center justify-center gap-2.5 group"
        >
          <span>Browse My Semester</span>
          <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onStartRevising}
          className="w-full sm:w-auto text-slate-800 bg-white border border-slate-200/90 px-8 py-4 rounded-lg font-semibold text-base hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:border-slate-300"
        >
          <span>Start Revising</span>
          <span className="material-symbols-outlined text-xl text-slate-500">menu_book</span>
        </button>
      </div>

      {/* Trust Chips below CTAs */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-slate-600 text-xs sm:text-sm font-medium pt-4 border-t border-slate-100 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200/60 card-hover-lift">
          <span className="material-symbols-outlined text-brand-orange text-base">verified</span>
          <span>Verified Notes</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200/60 card-hover-lift">
          <span className="material-symbols-outlined text-brand-orange text-base">history_edu</span>
          <span>2025 Question Papers</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200/60 card-hover-lift">
          <span className="material-symbols-outlined text-brand-orange text-base">smart_toy</span>
          <span>AI Doubt Solver</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50/80 px-3.5 py-2 rounded-lg border border-slate-200/60 card-hover-lift">
          <span className="material-symbols-outlined text-brand-orange text-base">auto_stories</span>
          <span>6-Semester Coverage</span>
        </div>
      </div>
    </section>
  );
};
