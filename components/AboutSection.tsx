'use client';

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="why-examify" className="max-w-[1200px] mx-auto px-6 mb-24 scroll-mt-24">
      <div id="about" className="bg-slate-50/90 rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100 mb-5 inline-block">
              Why Students Trust Examify
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
              Built specifically for BCA students preparing under exam pressure.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal">
              Instead of scattering study materials across messaging groups and random folders, Examify organizes verified notes, 2025 question papers, and AI explanations into a single structured academic engine.
            </p>

            {/* Premium Proof Cards */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3.5 card-hover-lift">
                <span className="w-7 h-7 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">check</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Curated Academic Quality</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Notes and solutions double-checked against official university syllabi.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3.5 card-hover-lift">
                <span className="w-7 h-7 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">check</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Exam Pattern Alignment</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Target high-yield units and frequently repeated university questions.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3.5 card-hover-lift">
                <span className="w-7 h-7 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">check</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Instant AI Doubt Assistance</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Get context-aware explanations for theory and programming code 24/7.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formal Institutional Credibility Frame */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
            <img
              src="/ngi_campus.png"
              alt="Nagarjuna Group of Institutions Campus"
              className="w-full h-auto max-h-[440px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="text-[10px] font-bold bg-brand-orange px-3 py-1 rounded text-white uppercase tracking-wider mb-2 inline-block shadow-sm">
                  Academic Association
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Nagarjuna Group of Institutions</h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">Supporting High-Standard University Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
