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



      </main>

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
