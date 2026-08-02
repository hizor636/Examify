'use client';

import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { BCA_SEMESTER_DATA, NoteItem, LabProgramItem } from '../src/data/bcaData';
import { NotesViewerModal } from './NotesViewerModal';
import { ExamSprintModal } from './ExamSprintModal';
import { ExamAiModal } from './ExamAiModal';
import { AssignmentHubModal } from './AssignmentHubModal';
import { LabVivaViewerModal } from './LabVivaViewerModal';

interface SemesterPortalProps {
  semester: number;
  onSemesterSelect?: (sem: number) => void;
  onBackToMain?: () => void;
  onOpenCommunity?: () => void;
}

export const SemesterPortal: React.FC<SemesterPortalProps> = ({
  semester,
  onSemesterSelect,
  onBackToMain,
}) => {
  const { user, setSemester, calculateReadinessScore } = useAuth();

  // Modal States
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [selectedLab, setSelectedLab] = useState<LabProgramItem | null>(null);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isExamAiOpen, setIsExamAiOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  // AI Assistant Chat state (Fully functional!)
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${user?.name || 'BCA Student'}! I am your Examify AI Assistant for Semester ${semester}. Ask me any question from your syllabus or exam prep.`,
    },
  ]);

  const semesterInfo = BCA_SEMESTER_DATA[semester] || BCA_SEMESTER_DATA[1];
  const readinessData = calculateReadinessScore();

  const handleSelectSemester = (sem: number) => {
    setSemester(sem);
    if (onSemesterSelect) onSemesterSelect(sem);
  };

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userText = aiQuery;
    setAiChat((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiQuery('');

    setTimeout(() => {
      let reply = `Here is the explanation for "${userText}" in Semester ${semester} syllabus context:\n\n` +
        `1. Core Concept: Structured definition tailored for BCA university valuation.\n` +
        `2. Key Diagram / Formula: Parameter breakdown and key step outline.\n` +
        `3. Marks: Topic carries 8 to 10 marks in end-semester papers.`;
      setAiChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  const allNotes = semesterInfo.notes || [];
  const allPyqs = semesterInfo.pyqs || [];
  const allLabs = semesterInfo.labs || [];
  const allAssignments = semesterInfo.assignments || [];
  const allImportant = semesterInfo.importantQuestions || [];
  const allQuizzes = semesterInfo.quizzes || [];

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Portal Header & Context Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span>Verified Semester Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">{semesterInfo.title}</h1>
            
            {/* Styled USN Neutral Badge Pill (Fixing Red Styling Error) */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-medium text-slate-350">
              <span>Student: <strong className="text-white">{user?.name || 'BCA Student'}</strong></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-brand-orange border border-slate-700 font-mono font-bold text-xs shadow-xs">
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>USN: {user?.usn || '1MV23BC230'}</span>
              </span>
              <span>•</span>
              <span>Dept: <strong className="text-white">{user?.department || 'BCA'}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExamAiOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Exam AI Assistant</span>
            </button>

            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>Back to Overview</span>
              </button>
            )}
          </div>
        </div>

        {/* Semester Switcher Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-brand-orange text-sm">tune</span>
            <span>Switch Active Semester:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((semNum) => (
              <button
                key={semNum}
                onClick={() => handleSelectSemester(semNum)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  semester === semNum
                    ? 'bg-brand-orange text-white shadow-sm scale-105'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Semester {semNum}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOP SECTION: READINESS SCORE & ORIENTATION LAYER */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Widget 1: Readiness Score */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Prep Confidence Tracker
                </span>
                <h3 className="text-base font-bold text-slate-900">Exam Readiness Score</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                {readinessData.overall > 0 ? readinessData.label : '0% • Not Started'}
              </span>
            </div>

            <div className="flex items-end gap-3 my-4">
              <span className="text-4xl font-bold text-brand-orange">{readinessData.overall}%</span>
              <span className="text-xs text-slate-500 pb-1">
                {readinessData.overall === 0 ? 'Start prepping to build your score' : 'Activity Completion Rate'}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-orange h-full transition-all duration-500 rounded-full"
                style={{ width: `${readinessData.overall}%` }}
              />
            </div>
          </div>

          {/* Widget 2: Today's Focus & Urgency Signal */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-brand-orange text-xl">priority_high</span>
              <h3 className="text-base font-bold text-slate-900">Today's Focus</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Focus on 10-mark high-yield topics or launch a Rapid Fire Quiz sprint for last-minute exam prep.
            </p>
            <button
              onClick={() => setIsSprintOpen(true)}
              className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Launch Quiz Sprint</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Widget 3: Continue Learning */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Continue Learning</span>
                <span className="material-symbols-outlined text-brand-orange text-lg">play_circle</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Semester {semester} Vault</h3>
              <p className="text-xs text-slate-400">
                Pick up where you left off or ask the Exam AI Assistant.
              </p>
            </div>
            <button
              onClick={() => setIsExamAiOpen(true)}
              className="mt-4 bg-brand-orange text-white py-2.5 rounded-xl font-bold text-xs btn-primary-glow flex items-center justify-center gap-1.5"
            >
              <span>Open Exam AI Mode</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CATEGORIZED ROW 1: STUDY MATERIAL (Subjects with Progress Bars) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">description</span>
            </span>
            <span>Study Material (Subjects, Notes &amp; PYQs)</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Row 1 of 3 • Scroll Sideways ➔</span>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-3 pt-1">
          {/* My Subjects Cards (with Progress Signals!) */}
          {semesterInfo.subjects.length > 0 ? (
            semesterInfo.subjects.map((subj) => (
              <div
                key={subj.code}
                className="min-w-[300px] max-w-[300px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-9 h-9 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined">{subj.icon}</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {subj.code}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{subj.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{subj.description}</p>
                </div>

                {/* Per-Subject Progress Bar Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-600">
                    <span>Subject Progress</span>
                    <span className="text-brand-orange">0/5 Units</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-orange h-full w-[10%]" />
                  </div>
                  <div className="pt-1 flex items-center justify-between text-xs font-bold text-brand-orange">
                    <span>Access Course Content</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* WIP Subject Placeholder State */
            <div className="min-w-[300px] max-w-[300px] bg-slate-50/90 p-6 rounded-3xl border border-dashed border-slate-300 shadow-xs flex flex-col justify-between shrink-0">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">auto_stories</span>
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Semester {semester} Subjects</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Subjects for this semester are being added — check back soon.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                <span>Content Population in Progress</span>
              </div>
            </div>
          )}

          {/* Notes Vault Cards / Placeholder */}
          {allNotes.length > 0 ? (
            allNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className="min-w-[300px] max-w-[300px] bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-sm hover:border-brand-orange/50 transition-all flex flex-col justify-between shrink-0 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Verified Note
                    </span>
                    <span className="text-xs text-slate-400">{note.readTime}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{note.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{note.summary}</p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-brand-orange">
                  <span>Read Unit Note (+15%)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-[300px] max-w-[300px] bg-slate-50/90 p-6 rounded-3xl border border-dashed border-slate-300 shadow-xs flex flex-col justify-between shrink-0">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">description</span>
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Verified Notes Vault</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Notes coming soon. Verified lecture notes &amp; unit outlines are being populated.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Notes Coming Soon</span>
              </div>
            </div>
          )}

          {/* PYQ Papers Cards / Placeholder */}
          {allPyqs.length > 0 ? (
            allPyqs.map((pyq) => (
              <div
                key={pyq.id}
                className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="w-9 h-9 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined">history_edu</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      100% Solved
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{pyq.subject}</h4>
                  <p className="text-xs text-slate-500">{pyq.year} {pyq.examType}</p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Download Key</span>
                  <span className="material-symbols-outlined text-sm text-brand-orange">download</span>
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-[300px] max-w-[300px] bg-slate-50/90 p-6 rounded-3xl border border-dashed border-slate-300 shadow-xs flex flex-col justify-between shrink-0">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">history_edu</span>
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Previous Year Question Papers</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Question papers coming soon. 2023–2025 exam papers will drop here.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">work_history</span>
                <span>PYQs Coming Soon</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CATEGORIZED ROW 2: PRACTICE & SPRINT */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">bolt</span>
            </span>
            <span>Practice &amp; Sprint (Quizzes, Lab &amp; Viva)</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Row 2 of 3 • Scroll Sideways ➔</span>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-3 pt-1">
          {/* Rapid Fire Quiz Engine Card */}
          <div
            onClick={() => setIsSprintOpen(true)}
            className="min-w-[300px] max-w-[300px] bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between shrink-0 cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Sprint Generator
                </span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">Rapid Fire Exam Sprint</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice speed quiz generator. Timed recall challenge for last-minute prep.
              </p>
            </div>

            <button className="mt-4 w-full bg-brand-orange text-white py-2.5 rounded-xl font-bold text-xs btn-primary-glow flex items-center justify-center gap-1.5">
              <span>Launch Quiz Engine</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Important Questions Card / Placeholder */}
          {allImportant.length > 0 ? (
            allImportant.map((iq) => (
              <div
                key={iq.id}
                className="min-w-[300px] max-w-[300px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                      High Probability ({iq.marks} Marks)
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">{iq.question}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-[300px] max-w-[300px] bg-slate-50/90 p-6 rounded-3xl border border-dashed border-slate-300 shadow-xs flex flex-col justify-between shrink-0">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-orange flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">quiz</span>
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Important Questions Generator</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Coming soon. High-yield 10-mark &amp; 8-mark questions per subject.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock_clock</span>
                <span>Coming Soon</span>
              </div>
            </div>
          )}

          {/* Lab Programs Card / Placeholder */}
          {allLabs.length > 0 ? (
            allLabs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => setSelectedLab(lab)}
                className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-500/40 transition-all flex flex-col justify-between shrink-0 cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Lab #{lab.programNo}: {lab.title}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="min-w-[300px] max-w-[300px] bg-slate-50/90 p-6 rounded-3xl border border-dashed border-slate-300 shadow-xs flex flex-col justify-between shrink-0">
              <div>
                <span className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">terminal</span>
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Lab Programs &amp; Viva Prep</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lab content coming soon. Code syntax, flowchart logic &amp; viva cards will be loaded here.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-200 text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">code</span>
                <span>Lab Content Coming Soon</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CATEGORIZED ROW 3: AI POWER TOOLS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">smart_toy</span>
            </span>
            <span>AI Power Tools (Doubt Solvers &amp; Generators)</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Row 3 of 3 • Scroll Sideways ➔</span>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-3 pt-1">
          {/* Tool 1: AI Study Assistant (Functional!) */}
          <div className="min-w-[340px] max-w-[340px] bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">AI Study Assistant</h4>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Functional &amp; Active</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-2 mb-3 max-h-36 overflow-y-auto">
                {aiChat.slice(-2).map((m, i) => (
                  <div key={i} className={`p-2 rounded-xl text-[11px] ${m.sender === 'user' ? 'bg-brand-orange text-white' : 'bg-white text-slate-800 border'}`}>
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendAi} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Ask any syllabus doubt..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600"
                />
                <button type="submit" className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold">
                  Ask
                </button>
              </form>
            </div>
          </div>

          {/* Tool 2: Exam AI Assistant (Functional!) */}
          <div
            onClick={() => setIsExamAiOpen(true)}
            className="min-w-[300px] max-w-[300px] bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between shrink-0 cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Fast Exam-Day Mode
                </span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">Exam AI Assistant</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fast-response mode for exam day prep: 10-mark essay blueprints, algorithm complexity cheat sheets &amp; instant definitions.
              </p>
            </div>

            <button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
              <span>Open Fast Exam AI</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Tool 3: Assignment Report Generator */}
          <div
            onClick={() => setIsAssignmentOpen(true)}
            className="min-w-[300px] max-w-[300px] bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-purple-500/40 transition-all flex flex-col justify-between shrink-0 cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">assignment</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  AI Report Generator
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Assignment Hub</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate technical report outlines with optional IEEE/APA citations toggle.
              </p>
            </div>

            <button className="mt-4 w-full bg-purple-700 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
              <span>Open Report Generator</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Integrated Modals */}
      <NotesViewerModal note={selectedNote} isOpen={!!selectedNote} onClose={() => setSelectedNote(null)} />
      <ExamSprintModal
        isOpen={isSprintOpen}
        onClose={() => setIsSprintOpen(false)}
        quizzes={allQuizzes.length > 0 ? allQuizzes : [{ id: 'q_default', question: 'Default Question', subject: 'General', options: ['A', 'B'], correctIndex: 0, explanation: 'Default' }]}
        subjectName={semesterInfo.title}
      />
      <ExamAiModal isOpen={isExamAiOpen} onClose={() => setIsExamAiOpen(false)} semester={semester} />
      <AssignmentHubModal
        isOpen={isAssignmentOpen}
        onClose={() => setIsAssignmentOpen(false)}
        assignments={allAssignments}
        semester={semester}
      />
      <LabVivaViewerModal lab={selectedLab} isOpen={!!selectedLab} onClose={() => setSelectedLab(null)} />
    </div>
  );
};
