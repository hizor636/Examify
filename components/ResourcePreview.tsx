'use client';

import React, { useState } from 'react';

export const ResourcePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'pyq' | 'model'>('notes');

  return (
    <section id="previews" className="max-w-[1200px] mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          INSTANT QUALITY PROOF
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-3 mb-3">
          Inside Examify
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          A quick look at how the platform supports structured exam preparation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'notes'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📄 Unit Notes Sample
        </button>
        <button
          onClick={() => setActiveTab('pyq')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'pyq'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📝 PYQ Exam Paper Sample
        </button>
        <button
          onClick={() => setActiveTab('model')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'model'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          💡 Model Questionnaire Sample
        </button>
      </div>

      {/* Preview Content Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
        {activeTab === 'notes' && (
          <div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded">
                  ✓ Verified Notes
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Data Structures: Linked Lists &amp; Binary Trees</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">BCA Semester 2 • Unit 3</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 font-mono text-xs text-slate-700 leading-relaxed mb-4">
              <p className="font-bold text-slate-900 mb-1">// Core Definition: Singly Linked List Node Structure</p>
              <p className="text-emerald-700">struct Node &#123;</p>
              <p className="pl-4">int data;</p>
              <p className="pl-4">struct Node* next;</p>
              <p className="text-emerald-700">&#125;;</p>
              <p className="mt-2 text-slate-500">// Key Exam Point: Insertion at head has O(1) time complexity.</p>
            </div>
            <p className="text-xs text-slate-600">Includes visual memory diagrams, algorithm steps, and past 5-year exam questions.</p>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold bg-orange-50 text-brand-orange px-2.5 py-1 rounded">
                  2024 University Question Paper
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">DBMS &amp; SQL - End Semester Examination</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">BCA Semester 3 • 70 Marks</span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex justify-between items-center">
                <span>Q1. Explain 3NF and BCNF normalization with suitable tables. [10 Marks]</span>
                <span className="text-[10px] font-bold uppercase bg-orange-100 text-brand-orange px-2 py-0.5 rounded">Repeated 4x</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex justify-between items-center">
                <span>Q2. Write SQL queries for INNER JOIN vs LEFT OUTER JOIN on Employee database. [10 Marks]</span>
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">High Yield</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'model' && (
          <div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded">
                  Model Solution Key
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Operating Systems: Deadlock Prevention &amp; Banker's Algorithm</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">BCA Semester 2</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Step-by-step breakdown of safe sequence evaluation for Banker's Algorithm with matrix calculations and clear exam answer presentation.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange bg-orange-50 px-3 py-1.5 rounded-md border border-orange-100">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>100% Verified Step-by-Step Marking Scheme</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
