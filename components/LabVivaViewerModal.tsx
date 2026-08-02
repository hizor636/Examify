'use client';

import React, { useState } from 'react';
import { LabProgramItem } from '../src/data/bcaData';
import { useAuth } from '../src/context/AuthContext';

interface LabVivaViewerModalProps {
  lab: LabProgramItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LabVivaViewerModal: React.FC<LabVivaViewerModalProps> = ({ lab, isOpen, onClose }) => {
  const { markItemCompleted, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'code' | 'flowchart' | 'output' | 'viva'>('code');
  const [revealedViva, setRevealedViva] = useState<Record<number, boolean>>({});

  if (!isOpen || !lab) return null;

  const isCompleted = user?.completedItems?.labs?.includes(lab.id);

  const toggleVivaReveal = (index: number) => {
    setRevealedViva((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMarkComplete = () => {
    markItemCompleted('labs', lab.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>Lab Program #{lab.programNo} • {lab.language.toUpperCase()}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{lab.title}</h3>
            <p className="text-xs text-slate-500 font-medium">Subject: {lab.subject}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            <span>Source Code</span>
          </button>

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'flowchart'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">schema</span>
            <span>Flowchart Logic</span>
          </button>

          <button
            onClick={() => setActiveTab('output')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'output'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">output</span>
            <span>Program Output</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'viva'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span className="material-symbols-outlined text-base">quiz</span>
            <span>Viva Voice Q&amp;A ({lab.vivaQuestions.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'code' && (
            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono leading-relaxed overflow-x-auto border border-slate-800">
              <pre><code>{lab.code}</code></pre>
            </div>
          )}

          {activeTab === 'flowchart' && (
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-950 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined">account_tree</span>
                <span>Program Algorithm &amp; Flowchart Steps</span>
              </h4>
              <div className="bg-white p-4 rounded-xl border border-indigo-100 font-mono text-xs text-indigo-900 leading-relaxed">
                {lab.flowchart}
              </div>
            </div>
          )}

          {activeTab === 'output' && (
            <div className="bg-black text-emerald-400 p-5 rounded-2xl font-mono border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-slate-500 text-[10px] uppercase font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span>Console Output Window</span>
              </div>
              <pre className="pt-2"><code>{lab.output}</code></pre>
            </div>
          )}

          {activeTab === 'viva' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Likely Lab Examiner Viva Questions &amp; Model Answers</h4>
              {lab.vivaQuestions.map((vq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Q{idx + 1}: {vq.q}
                    </h5>
                    <button
                      onClick={() => toggleVivaReveal(idx)}
                      className="text-xs font-bold text-indigo-600 hover:underline shrink-0 ml-2"
                    >
                      {revealedViva[idx] ? 'Hide Answer' : 'Show Answer Key'}
                    </button>
                  </div>

                  {revealedViva[idx] && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium leading-relaxed animate-fade-in">
                      💡 <strong>Viva Answer:</strong> {vq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isCompleted ? 'check_circle' : 'task_alt'}
            </span>
            <span>{isCompleted ? 'Lab Prep Completed (+15%)' : 'Mark Lab Completed (+15%)'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs"
          >
            Close Lab Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
