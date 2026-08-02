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
  onBackToMain,
  onOpenCommunity,
}) => {
  const { user, calculateReadinessScore } = useAuth();

  // Modal States
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [selectedLab, setSelectedLab] = useState<LabProgramItem | null>(null);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isExamAiOpen, setIsExamAiOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  // AI Assistant Chat state
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${user?.name || 'BCA Student'}! Ask me any question from your syllabus.`,
    },
  ]);

  const semesterInfo = BCA_SEMESTER_DATA[semester] || BCA_SEMESTER_DATA[1];
  const readinessData = calculateReadinessScore();

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
    <>
      <main className="flex-1 p-gutter max-w-container-max mx-auto w-full space-y-gutter">
        {/* Distinct Header Block */}
        <section className="bg-[#0f172a] rounded-[24px] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-fixed-dim font-status-label text-[10px] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Verified Semester Portal
              </div>
              <h1 className="font-display-lg text-[40px] tracking-tight">
                {semesterInfo.title.split('—')[0]} <span className="text-slate-500">—</span> {semesterInfo.title.split('—')[1]?.trim() || ''}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-body-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Student: {user?.name || 'BCA Student'}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-primary/20 text-primary text-[12px] font-mono">
                  <span className="material-symbols-outlined text-[14px]">id_card</span>
                  USN: {user?.usn || '1NC22CS123'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  Dept: {user?.department || 'BCA'}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsExamAiOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-label-caps text-label-caps uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                Exam AI Assistant
              </button>
              {onBackToMain && (
                <button 
                  onClick={onBackToMain}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all border border-white/10 font-label-caps text-label-caps uppercase"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  Back to Landing
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Top Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Readiness Tracker */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-label-caps text-[10px] text-slate-400 uppercase tracking-widest">Prep Confidence Tracker</p>
                <h3 className="font-headline-sm text-on-surface">Exam Readiness Score</h3>
              </div>
              <div className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-bold uppercase">
                {readinessData.overall > 0 ? readinessData.label : '0% - Not Started'}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="text-[52px] font-bold text-on-surface leading-none">{readinessData.overall}%</div>
              <div className="flex-1">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${readinessData.overall}%` }}></div>
                </div>
                <p className="mt-2 text-[12px] text-slate-400">
                  {readinessData.overall === 0 ? 'Start prepping to build your score' : 'Keep up the good work'}
                </p>
              </div>
            </div>
          </div>

          {/* Today's Focus */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">priority_high</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-on-surface">Today's Focus</h3>
                <p className="text-body-md text-on-surface-variant leading-snug">Focus on high-yield exam topics or launch a Rapid Fire Quiz sprint for last-minute prep.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSprintOpen(true)}
              className="w-full mt-6 py-3 rounded-lg bg-[#0f172a] text-white font-label-caps text-label-caps uppercase flex items-center justify-center gap-2 hover:bg-slate-800 transition-all group"
            >
              Launch Quiz Sprint
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Continue Learning */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-[#0f172a] border border-slate-800 flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-label-caps text-[10px] text-primary uppercase tracking-widest">Continue Learning</p>
                <h3 className="font-headline-sm text-white">Semester {semester} Vault</h3>
                <p className="text-body-md text-slate-400">Pick up where you left off or ask the AI.</p>
              </div>
              <span className="material-symbols-outlined text-primary text-[24px]">play_circle</span>
            </div>
            <button 
              onClick={() => setIsExamAiOpen(true)}
              className="w-full mt-6 py-4 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform uppercase text-label-caps"
            >
              Open Exam AI Mode
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </button>
          </div>
        </section>

        {/* Row 1: Study Material */}
        <section>
          <div className="flex items-center justify-between mb-stack-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">description</span>
              <h2 className="font-headline-md text-on-surface">Study Material <span className="text-on-surface-variant font-normal text-body-lg">(Subjects, Notes &amp; PYQs)</span></h2>
            </div>
            <div className="text-[12px] text-slate-400 font-status-label flex items-center gap-1 uppercase tracking-wider hidden sm:flex">
              Row 1 of 3 • Scroll Sideways <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
          
          <div className="flex gap-gutter overflow-x-auto no-scrollbar pb-4">
            {semesterInfo.subjects.length > 0 ? (
              semesterInfo.subjects.map(subj => (
                <div key={subj.code} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{subj.icon || 'menu_book'}</span>
                  </div>
                  <h4 className="font-headline-sm text-on-surface mb-2">{subj.name}</h4>
                  <p className="text-body-md text-on-surface-variant mb-8 line-clamp-2">{subj.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      0/5 Units
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2">Semester {semester} Subjects</h4>
                <p className="text-body-md text-on-surface-variant mb-8">Subjects for this semester are being added — check back soon.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                    <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
                    In Progress
                  </div>
                </div>
              </div>
            )}

            {allNotes.length > 0 ? (
              allNotes.map(note => (
                <div key={note.id} onClick={() => setSelectedNote(note)} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <h4 className="font-headline-sm text-on-surface mb-2">{note.title}</h4>
                  <p className="text-body-md text-on-surface-variant mb-8 line-clamp-2">{note.summary}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {note.readTime}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-dashed border-slate-300 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2">Verified Notes Vault</h4>
                <p className="text-body-md text-on-surface-variant mb-8">Notes coming soon. Verified lecture notes &amp; unit outlines are being populated.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    Coming Soon
                  </div>
                </div>
              </div>
            )}

            {allPyqs.length > 0 ? (
              allPyqs.map(pyq => (
                <div key={pyq.id} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <h4 className="font-headline-sm text-on-surface mb-2">{pyq.subject}</h4>
                  <p className="text-body-md text-on-surface-variant mb-8">{pyq.year} {pyq.examType}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      Download
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-dashed border-slate-300 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                  <span className="material-symbols-outlined">history_edu</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2">Previous Year Papers</h4>
                <p className="text-body-md text-on-surface-variant mb-8">Question papers coming soon. 2025 exam papers will drop here.</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase">
                    <span className="material-symbols-outlined text-[16px]">archive</span>
                    Coming Soon
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Row 2: Practice & Sprint */}
        <section>
          <div className="flex items-center justify-between mb-stack-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">bolt</span>
              <h2 className="font-headline-md text-on-surface">Practice &amp; Sprint <span className="text-on-surface-variant font-normal text-body-lg">(Quizzes, Lab &amp; Viva)</span></h2>
            </div>
            <div className="text-[12px] text-slate-400 font-status-label flex items-center gap-1 uppercase tracking-wider hidden sm:flex">
              Row 2 of 3 • Scroll Sideways <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          <div className="flex gap-gutter overflow-x-auto no-scrollbar pb-4">
            <div onClick={() => setIsSprintOpen(true)} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-[#0f172a] border border-primary/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Sprint Generator</span>
              </div>
              <h4 className="font-headline-sm text-white mb-2 relative z-10">Rapid Fire Exam Sprint</h4>
              <p className="text-body-md text-slate-400 mb-8 relative z-10">Practice speed quiz generator. Timed recall challenge for last-minute prep.</p>
              <button className="w-full py-3 rounded-lg bg-primary text-white font-bold flex items-center justify-center gap-2 text-[12px] uppercase relative z-10">
                Launch Quiz Engine
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {allImportant.length > 0 ? (
              allImportant.map((iq) => (
                <div key={iq.id} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 mb-6">
                      <span className="material-symbols-outlined text-[24px]">quiz</span>
                    </div>
                    <h4 className="font-headline-sm text-on-surface mb-2">{iq.question}</h4>
                    <p className="text-body-md text-on-surface-variant mb-8">{iq.marks} Marks • High Probability</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-dashed border-slate-300 hover:border-primary/40 transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 mb-6">
                  <span className="material-symbols-outlined text-[24px]">quiz</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2">Important Questions</h4>
                <p className="text-body-md text-on-surface-variant mb-8">Coming soon. High-yield 10-mark &amp; 5-mark questions per subject.</p>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase pt-4 border-t border-slate-100">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Coming Soon
                </div>
              </div>
            )}

            {allLabs.length > 0 ? (
              allLabs.map((lab) => (
                <div key={lab.id} onClick={() => setSelectedLab(lab)} className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 mb-6">
                    <span className="material-symbols-outlined text-[24px]">terminal</span>
                  </div>
                  <h4 className="font-headline-sm text-on-surface mb-2">Lab #{lab.programNo}</h4>
                  <p className="text-body-md text-on-surface-variant mb-8 line-clamp-2">{lab.title}</p>
                </div>
              ))
            ) : (
              <div className="min-w-[320px] max-w-[320px] group cursor-pointer p-6 rounded-[32px] bg-white border border-dashed border-slate-300 hover:border-primary/40 transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 mb-6">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2">Lab Programs &amp; Viva Prep</h4>
                <p className="text-body-md text-on-surface-variant mb-8">Lab content coming soon. Code syntax and viva cards will be loaded here.</p>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-status-label uppercase pt-4 border-t border-slate-100">
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  Coming Soon
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Row 3: AI Power Tools */}
        <section>
          <div className="flex items-center justify-between mb-stack-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h2 className="font-headline-md text-on-surface">AI Power Tools <span className="text-on-surface-variant font-normal text-body-lg">(Doubt Solvers &amp; Generators)</span></h2>
            </div>
            <div className="text-[12px] text-slate-400 font-status-label flex items-center gap-1 uppercase tracking-wider hidden sm:flex">
              Row 3 of 3 • Scroll Sideways <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* AI Study Assistant */}
            <div className="group p-6 rounded-[32px] bg-white border border-slate-200 hover:border-primary/40 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-on-surface text-[16px]">AI Study Assistant</h4>
                  <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Active</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-[12px] text-on-surface-variant italic leading-relaxed space-y-2 max-h-36 overflow-y-auto mb-4 border border-slate-100">
                {aiChat.slice(-2).map((m, i) => (
                  <div key={i} className={`p-2 rounded-xl text-[11px] ${m.sender === 'user' ? 'bg-primary text-white not-italic font-medium' : 'bg-white text-slate-800 border border-slate-100'}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendAi} className="flex gap-2">
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask any doubt..." 
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-[12px] text-on-surface outline-none focus:border-primary transition-all"
                />
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-[11px] uppercase hover:bg-green-700 transition-colors">Ask</button>
              </form>
            </div>

            {/* Exam AI Assistant (Fast Mode) */}
            <div onClick={() => setIsExamAiOpen(true)} className="group cursor-pointer p-6 rounded-[32px] bg-[#0f172a] border border-primary/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-[24px]">bolt</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Fast Exam-Day Mode</span>
                    <h4 className="font-headline-sm text-white text-[18px]">Exam AI Assistant</h4>
                  </div>
                </div>
                <p className="text-body-md text-slate-400 mb-8 leading-relaxed">Fast-response mode for exam day prep: 10-mark blueprints &amp; instant definitions.</p>
              </div>
              <button className="w-full py-4 rounded-lg bg-primary text-white font-bold flex items-center justify-center gap-2 text-[12px] uppercase shadow-lg shadow-primary/20">
                Open Fast Exam AI
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>

            {/* Assignment Hub */}
            <div onClick={() => setIsAssignmentOpen(true)} className="group cursor-pointer p-6 rounded-[32px] bg-white border border-slate-200 hover:border-secondary/40 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">AI Report Generator</span>
                    <h4 className="font-headline-sm text-on-surface text-[18px]">Assignment Hub</h4>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">Generate technical report outlines with optional IEEE/APA citations.</p>
              </div>
              <button className="w-full py-3 rounded-lg bg-secondary text-white font-bold flex items-center justify-center gap-2 text-[12px] uppercase group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all">
                Open Generator
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Decorative Footer */}
        <div className="pt-section-gap text-center space-y-4">
          <p className="font-status-label text-status-label text-slate-400 uppercase tracking-[0.2em]">Academic Precision • Digital Excellence • Examify 2024</p>
          <div className="flex justify-center gap-8">
            <button onClick={onOpenCommunity} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-[12px]">
              <span className="material-symbols-outlined text-[16px]">forum</span> Community
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-[12px]">
              <span className="material-symbols-outlined text-[16px]">account_circle</span> Profile
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[12px]">
              <span className="material-symbols-outlined text-[16px]">settings</span> Settings
            </div>
          </div>
        </div>
      </main>

      {/* Real Footer for App Shell */}
      <footer className="w-full bg-white py-6 px-gutter border-t border-slate-200 mt-stack-lg">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center text-status-label font-status-label text-slate-400 text-[11px] gap-4">
          <p>© 2024 Examify - Built for BCA Academic Excellence.</p>
          <div className="flex items-center gap-4 uppercase tracking-widest">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-green-500">verified</span>
              Verified Resources
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            Exam-Oriented Engine
          </div>
        </div>
      </footer>

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
    </>
  );
};
