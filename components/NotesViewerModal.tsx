'use client';

import React from 'react';
import { NoteItem } from '../src/data/bcaData';
import { useAuth } from '../src/context/AuthContext';

interface NotesViewerModalProps {
  note: NoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NotesViewerModal: React.FC<NotesViewerModalProps> = ({ note, isOpen, onClose }) => {
  const { markItemCompleted, user } = useAuth();
  if (!isOpen || !note) return null;

  const isCompleted = user?.completedItems?.notes?.includes(note.id);

  const handleMarkRead = () => {
    markItemCompleted('notes', note.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-start border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>{note.unit} • Verified BCA Lecture Notes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{note.title}</h2>
            <p className="text-xs text-slate-350 mt-1 font-medium">
              Subject: <span className="text-brand-orange">{note.subject}</span> • Read time: {note.readTime} • Pages: {note.pages}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Note Content Reader Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 text-sm leading-relaxed space-y-4 font-sans">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-xs text-orange-950 flex items-start gap-3">
            <span className="material-symbols-outlined text-brand-orange text-xl shrink-0 mt-0.5">menu_book</span>
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Module Summary</h4>
              <p>{note.summary}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-4">
            {note.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h3 key={index} className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1">
                    {paragraph.replace('# ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h4 key={index} className="text-base font-bold text-slate-800 pt-1">
                    {paragraph.replace('## ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeLines = paragraph.replace(/```[a-z]*/g, '').trim();
                return (
                  <pre key={index} className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
                    <code>{codeLines}</code>
                  </pre>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-brand-orange">insights</span>
            <span>Completing this note boosts your Exam Readiness Score!</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleMarkRead}
              disabled={isCompleted}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-700 cursor-default'
                  : 'bg-brand-orange text-white btn-primary-glow'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isCompleted ? 'check_circle' : 'task_alt'}
              </span>
              <span>{isCompleted ? 'Completed (+15% Confidence)' : 'Mark Unit as Read (+15%)'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold text-xs transition-colors"
            >
              Close Reader
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
