'use client';

import React, { useState } from 'react';

interface SemesterData {
  sem: number;
  title: string;
  subjectsCount: number;
  notesCount: number;
  pyqYears: string;
  subjects: string[];
}

const semestersData: SemesterData[] = [
  {
    sem: 1,
    title: 'Semester 1 - Foundation',
    subjectsCount: 5,
    notesCount: 42,
    pyqYears: '2018–2025',
    subjects: ['Problem Solving using C', 'Computer Essentials', 'Discrete Mathematics', 'Digital Electronics', 'Communicative English'],
  },
  {
    sem: 2,
    title: 'Semester 2 - Core Programming',
    subjectsCount: 5,
    notesCount: 38,
    pyqYears: '2018–2025',
    subjects: ['Data Structures & Algorithms', 'OOPS using C++', 'Operating Systems', 'Environmental Studies', 'Financial Accounting'],
  },
  {
    sem: 3,
    title: 'Semester 3 - Systems & Databases',
    subjectsCount: 5,
    notesCount: 45,
    pyqYears: '2018–2025',
    subjects: ['DBMS & SQL', 'OOPS using Java', 'Software Engineering', 'Computer Networks', 'Fundamentals of Fintech'],
  },
  {
    sem: 4,
    title: 'Semester 4 - Web & Security',
    subjectsCount: 5,
    notesCount: 40,
    pyqYears: '2018–2025',
    subjects: ['Full-Stack Web Dev', 'Python Programming', 'Computer Architecture', 'Cyber Security Essentials', 'Cloud Computing'],
  },
  {
    sem: 5,
    title: 'Semester 5 - Advanced Engineering',
    subjectsCount: 5,
    notesCount: 36,
    pyqYears: '2018–2025',
    subjects: ['Mobile App Dev (Android)', 'Artificial Intelligence', 'Data Science & Analytics', 'Linux System Admin', 'Mini Project'],
  },
  {
    sem: 6,
    title: 'Semester 6 - Specialization & Capstone',
    subjectsCount: 4,
    notesCount: 30,
    pyqYears: '2018–2025',
    subjects: ['Machine Learning', 'DevOps Fundamentals', 'Information Security', 'Major Capstone Project'],
  },
];

export const SemesterExplorer: React.FC = () => {
  const [activeSem, setActiveSem] = useState<number>(1);

  const selectedData = semestersData.find((s) => s.sem === activeSem) || semestersData[0];

  return (
    <section id="semesters" className="max-w-[1200px] mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          SYLLABUS EXPLORER
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3 mb-3">
          Semester Explorer
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Browse academic content organized semester by semester.
        </p>
      </div>

      {/* Semester Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {semestersData.map((s) => (
          <button
            key={s.sem}
            onClick={() => setActiveSem(s.sem)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeSem === s.sem
                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20 scale-[1.02]'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Semester {s.sem}
          </button>
        ))}
      </div>

      {/* Active Semester Detailed Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase text-brand-orange tracking-wider bg-orange-50 px-2.5 py-1 rounded">
              BCA Curriculum
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{selectedData.title}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md">
              <span className="material-symbols-outlined text-base text-brand-orange">menu_book</span>
              {selectedData.subjectsCount} Subjects
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md">
              <span className="material-symbols-outlined text-base text-brand-orange">description</span>
              {selectedData.notesCount} Verified Notes
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md">
              <span className="material-symbols-outlined text-base text-brand-orange">history_edu</span>
              PYQs {selectedData.pyqYears}
            </span>
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
          Included Subjects &amp; Modules
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {selectedData.subjects.map((subj, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center justify-between hover:border-brand-orange/40 hover:bg-orange-50/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-orange transition-colors">
                  {subj}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-brand-orange text-lg">
                arrow_forward
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 text-white p-5 rounded-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="material-symbols-outlined text-brand-orange text-3xl">verified</span>
            <div>
              <p className="text-sm font-bold">Ready to revise Semester {selectedData.sem}?</p>
              <p className="text-xs text-slate-300">Access unit notes, model solutions, and past exam papers.</p>
            </div>
          </div>
          <button className="bg-brand-orange text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-md">
            <span>Open Semester {selectedData.sem} Vault</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
