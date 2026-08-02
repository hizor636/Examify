'use client';

import React, { useState } from 'react';

interface ExamAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: number;
}

export const ExamAiModal: React.FC<ExamAiModalProps> = ({ isOpen, onClose, semester }) => {
  const [activeTab, setActiveTab] = useState<'cheat' | 'formulas' | 'fastQuery'>('cheat');
  const [fastQuery, setFastQuery] = useState('');
  const [fastAnswer, setFastAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fastQuery.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setFastAnswer(
        `⚡ **EXAM-DAY FAST ANSWER for "${fastQuery}"**:\n\n` +
          `• **1-Sentence Definition**: Key architectural mechanism or formula in Semester ${semester} syllabus.\n` +
          `• **Key Diagram/Equation**: Draw 3-layer block diagram / state transition chart.\n` +
          `• **10-Mark Breakdown**:\n` +
          `  1. Definition & Context (2 Marks)\n` +
          `  2. Core Algorithm / Circuit / Code (4 Marks)\n` +
          `  3. Advantages & Tradeoffs (2 Marks)\n` +
          `  4. Real-world University Example (2 Marks)\n\n` +
          `💡 *Tip: High probability topic carrying 8–10 marks in end-semester papers.*`
      );
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <span className="material-symbols-outlined text-2xl">bolt</span>
            </span>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full mb-0.5 border border-amber-200">
                <span>Fast-Response Exam Prep Mode</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Exam AI Assistant</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Quick Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveTab('cheat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cheat'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Exam Day Cheat Sheet
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'formulas'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Formulas &amp; Complexity
          </button>

          <button
            onClick={() => setActiveTab('fastQuery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fastQuery'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Instant Answer Generator
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'cheat' && (
            <div className="space-y-3">
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-amber-400 text-sm mb-1">🔥 Top 10-Mark Questions Blueprint (Sem {semester})</h4>
                <p className="text-slate-350 leading-relaxed">
                  Always start 10-mark answers with a bold definition block, draw a labelled architecture block diagram, write working steps, and list advantages & disadvantages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950">
                  <h5 className="font-bold text-sm mb-1">Call by Value vs Reference</h5>
                  <p className="text-xs text-orange-900">Pass by value copies arguments into parameter stack; reference passes memory address pointers.</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <h5 className="font-bold text-sm mb-1">3NF vs BCNF Rule</h5>
                  <p className="text-xs text-emerald-900">BCNF strictly mandates that every determinant in functional dependency X -&gt; Y must be a super key.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Algorithm Time Complexity Quick Chart</h4>
                <ul className="space-y-2 text-slate-700 font-mono text-xs">
                  <li className="flex justify-between border-b pb-1">
                    <span>QuickSort (Average / Worst):</span>
                    <span className="font-bold text-brand-orange">O(N log N) / O(N^2)</span>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span>Binary Search:</span>
                    <span className="font-bold text-brand-orange">O(log N)</span>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span>Matrix Multiplication:</span>
                    <span className="font-bold text-brand-orange">O(N^3)</span>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span>Prime Check (Sqrt):</span>
                    <span className="font-bold text-brand-orange">O(√N)</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'fastQuery' && (
            <div className="space-y-4">
              <form onSubmit={handleGenerateAnswer} className="space-y-3">
                <label className="block font-bold text-slate-800 text-xs">
                  Type any exam question or topic for fast answer outline:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Differentiate between Process vs Thread [8 Marks]"
                    value={fastQuery}
                    onChange={(e) => setFastQuery(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-600 transition-colors shrink-0"
                  >
                    {loading ? 'Generating...' : 'Get Exam Key'}
                  </button>
                </div>
              </form>

              {fastAnswer && (
                <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl leading-relaxed whitespace-pre-line border border-slate-800">
                  {fastAnswer}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs"
          >
            Close Exam AI
          </button>
        </div>
      </div>
    </div>
  );
};
