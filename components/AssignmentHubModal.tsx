'use client';

import React, { useState } from 'react';
import { AssignmentItem } from '../src/data/bcaData';

interface AssignmentHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignments: AssignmentItem[];
  semester: number;
}

export const AssignmentHubModal: React.FC<AssignmentHubModalProps> = ({
  isOpen,
  onClose,
  assignments,
  semester,
}) => {
  const [topic, setTopic] = useState('');
  const [includeCitations, setIncludeCitations] = useState(true);
  const [generatedReport, setGeneratedReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      let report = `# Academic Assignment Report: ${topic}\n\n`;
      report += `## Executive Abstract\nThis report presents an in-depth study on ${topic} prepared for BCA Semester ${semester} academic coursework.\n\n`;
      report += `## 1. Technical Introduction & Core Principles\n${topic} serves as a foundational computing concept. In modern software architectures, it optimizes resource allocation and maintains algorithmic correctness.\n\n`;
      report += `## 2. Implementation Methodology\n1. Define system parameters and scope.\n2. Design modular data flow diagram.\n3. Execute unit test validation suites.\n\n`;

      if (includeCitations) {
        report += `## 3. Academic & Technical References / Citations\n`;
        report += `[1] Silberschatz, A., Galvin, P. B., & Gagne, G. (2024). Operating System Concepts & Data Fundamentals (10th ed.). Wiley Press.\n`;
        report += `[2] Tanenbaum, A. S., & Wetherall, D. J. (2023). Computer Architecture & Software Systems. Pearson Education.\n`;
        report += `[3] IEEE Computer Society Technical Guidelines for BCA Curriculum (2025).\n`;
      } else {
        report += `## 3. Practical Summary & Next Steps\nUnderstanding ${topic} equips BCA students to solve complex industry problems effectively.`;
      }

      setGeneratedReport(report);
      setIsGenerating(false);
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">assignment</span>
              <span>Assignment Hub &amp; AI Research Generator</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Semester {semester} Assignments</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 space-y-6">
          {/* Active Department Assignments List */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-orange">task</span>
              <span>Active Department Assignments ({assignments.length})</span>
            </h4>

            {assignments.length > 0 ? (
              <div className="space-y-3">
                {assignments.map((ass) => (
                  <div key={ass.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{ass.title}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Subject: {ass.subject} • Max Marks: {ass.maxMarks} • Deadline: <span className="text-brand-orange font-bold">{ass.deadline}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setTopic(ass.title)}
                      className="bg-brand-orange text-white text-xs font-bold px-3.5 py-2 rounded-xl btn-primary-glow shrink-0"
                    >
                      AI Generator
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl">No active pending department assignments for this semester.</p>
            )}
          </div>

          {/* AI Report & Research Generator */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange">auto_awesome</span>
                <span>AI Assignment Report Generator</span>
              </h4>

              {/* Source Citations Toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-300 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCitations}
                  onChange={(e) => setIncludeCitations(e.target.checked)}
                  className="rounded accent-brand-orange w-4 h-4"
                />
                <span>Include Academic Citations &amp; References</span>
              </label>
            </div>

            <form onSubmit={handleGenerateReport} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter report topic e.g. Call by Value vs Reference in C..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:border-brand-orange"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-brand-orange text-white px-5 py-2.5 rounded-xl font-bold text-xs btn-primary-glow shrink-0 flex items-center gap-1"
              >
                <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
                <span className="material-symbols-outlined text-base">auto_awesome</span>
              </button>
            </form>

            {generatedReport && (
              <div className="bg-slate-950 p-4 rounded-xl text-slate-200 text-xs leading-relaxed max-h-60 overflow-y-auto whitespace-pre-line border border-slate-800 font-mono">
                {generatedReport}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs"
          >
            Close Assignment Hub
          </button>
        </div>
      </div>
    </div>
  );
};
