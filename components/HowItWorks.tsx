'use client';

import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Semester',
      description: 'Select your current semester from Sem 1 to Sem 6 for customized course modules.',
      icon: 'format_list_bulleted',
      actionId: 'about',
    },
    {
      number: '02',
      title: 'Select Subject',
      description: 'Open structured subjects including Programming, DBMS, Networks, OOPS, and Web Dev.',
      icon: 'menu_book',
      actionId: 'about',
    },
    {
      number: '03',
      title: 'Access Resources',
      description: 'Open the resources you need for exam preparation.',
      icon: 'folder_open',
      actionId: 'about',
    },
    {
      number: '04',
      title: 'Practice Smart',
      description: 'Generate MCQs and predicted questions with actual answers for exam-focused preparation.',
      icon: 'bolt',
      actionId: 'about',
    },
  ];

  const handleStepClick = (actionId: string) => {
    const el = document.getElementById(actionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="max-w-[1200px] mx-auto px-6 mb-24 scroll-mt-24">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100/80">
          Streamlined Process
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3 mb-3">
          How Examify Accelerates Your Revision
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Four simple steps to go from exam anxiety to structured preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => handleStepClick(step.actionId)}
            className="cursor-pointer bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between relative group hover:border-brand-orange/50 hover:shadow-lg card-hover-lift transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="w-11 h-11 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </span>
                <span className="text-3xl font-black text-slate-200 group-hover:text-brand-orange/30 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-orange transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-orange opacity-80 group-hover:opacity-100 transition-opacity">
              <span>View Workflow</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
