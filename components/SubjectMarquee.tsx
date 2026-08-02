'use client';

import React from 'react';

const subjectsRow1 = [
  'Problem Solving using C',
  'OOPS using Java',
  'DBMS & SQL',
  'Operating Systems',
  'Fundamentals of Fintech',
  'Software Engineering',
];

const subjectsRow2 = [
  'Data Structures & Algorithms',
  'Computer Essentials',
  'Environmental Studies',
  'Web Development',
  'Computer Networks',
  'Communication Skills',
];

export const SubjectMarquee: React.FC = () => {
  return (
    <section id="subjects" className="w-full overflow-hidden mb-24 py-12 border-y border-border-subtle bg-slate-50/50 relative">
      {/* Centered Section Heading */}
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-subtle shadow-sm mb-3">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-[0.2em]">
            ALL SEMESTER SUBJECTS EXPERIENCED &amp; CURATED
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto font-medium">
          Comprehensive, structured material tailored across core foundation &amp; specialization tracks
        </p>
      </div>

      {/* Marquee Wrapper with Side Fade Gradients */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 py-2">
        {/* Soft Edge Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

        {/* Row 1: Scrolling Left */}
        <div className="flex whitespace-nowrap overflow-hidden relative select-none group">
          <div className="animate-marquee group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-6 sm:gap-8 px-4 min-w-full">
            {subjectsRow1.map((subj, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-sm shrink-0 min-w-[220px] sm:min-w-[260px] hover:border-brand-orange/50 hover:shadow-md transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0"></span>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-900 uppercase">
                  {subj}
                </span>
              </div>
            ))}
          </div>
          <div className="animate-marquee group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-6 sm:gap-8 px-4 min-w-full" aria-hidden="true">
            {subjectsRow1.map((subj, i) => (
              <div
                key={`dup-${i}`}
                className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-sm shrink-0 min-w-[220px] sm:min-w-[260px] hover:border-brand-orange/50 hover:shadow-md transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0"></span>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-900 uppercase">
                  {subj}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex whitespace-nowrap overflow-hidden relative select-none group">
          <div className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-6 sm:gap-8 px-4 min-w-full">
            {subjectsRow2.map((subj, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-sm shrink-0 min-w-[220px] sm:min-w-[260px] hover:border-brand-orange/50 hover:shadow-md transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0"></span>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-brand-orange uppercase">
                  {subj}
                </span>
              </div>
            ))}
          </div>
          <div className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-6 sm:gap-8 px-4 min-w-full" aria-hidden="true">
            {subjectsRow2.map((subj, i) => (
              <div
                key={`dup2-${i}`}
                className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-sm shrink-0 min-w-[220px] sm:min-w-[260px] hover:border-brand-orange/50 hover:shadow-md transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0"></span>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-brand-orange uppercase">
                  {subj}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
