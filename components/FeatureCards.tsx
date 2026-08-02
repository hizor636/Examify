'use client';

import React from 'react';

interface FeatureCardsProps {
  onSelectFeature?: (feature: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'BCA Curriculum',
      title: 'BCA Curriculum',
      subtitle: 'Semester-wise roadmap with complete subject clarity and structured syllabus breakdown.',
      icon: 'auto_stories',
      color: 'bg-orange-50 text-brand-orange',
      badge: 'Full Syllabus',
    },
    {
      id: 'PYQ Vault',
      title: 'PYQ Vault',
      subtitle: 'Find repeated university questions faster and spot high-yield exam patterns across 2018–2025.',
      icon: 'folder_zip',
      color: 'bg-orange-50 text-brand-orange',
      badge: '2018–2025 Papers',
    },
    {
      id: 'Questionnaires',
      title: 'Model Questionnaires',
      subtitle: 'Practice with exam-oriented model answers, unit-wise key questions, and step-by-step solutions.',
      icon: 'quiz',
      color: 'bg-slate-100 text-slate-800',
      badge: 'Step-by-Step',
    },
    {
      id: 'AI Tutor 24/7',
      title: 'AI Tutor 24/7',
      subtitle: 'Clear complex code & theory doubts instantly, tailored directly to your BCA syllabus context.',
      icon: 'smart_toy',
      color: 'bg-emerald-50 text-emerald-600',
      badge: 'Instant Help',
    },
  ];

  return (
    <section id="features" className="max-w-[1200px] mx-auto px-6 mb-24">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          CORE CAPABILITIES
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3 mb-3">
          Core Features
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Everything in Examify is designed to support faster and smarter exam preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => onSelectFeature?.(feature.id)}
            className="cursor-pointer bg-white p-7 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md hover:border-brand-orange/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm font-normal text-slate-600 leading-relaxed">
                {feature.subtitle}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-orange group-hover:translate-x-1 transition-transform">
              <span>Explore Resource</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
