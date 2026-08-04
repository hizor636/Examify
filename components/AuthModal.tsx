'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: (sem: number) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessRedirect }) => {
  const { bypassLogin, loginWithPassword, registerStudent, setSemester } = useAuth();

  // Auth Modes: 'verify', 'setPassword', 'login', 'register', 'setGoogleSemester'
  const [mode, setMode] = useState<'verify' | 'setPassword' | 'login' | 'register' | 'setGoogleSemester'>('verify');
  const [stepIndex, setStepIndex] = useState<number>(1);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [tempGoogleUsn, setTempGoogleUsn] = useState('');

  // Form Fields
  const [usn, setUsn] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Registration specifics
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemesterInput] = useState<number>(4);
  const [section, setSection] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      if (mode === 'verify') setStepIndex(1);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const triggerSuccessfulRedirect = (targetSem: number) => {
    onClose();
    if (onSuccessRedirect) {
      onSuccessRedirect(targetSem);
    }
  };

  const handleQuickAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!usn) {
      setError('Please enter a USN.');
      return;
    }

    const email = `${usn.toLowerCase().trim()}@college.edu`;
    const defaultPassword = 'examify-open-access';

    // Try logging in first
    const loginOk = await loginWithPassword(usn.toUpperCase().trim(), defaultPassword);
    if (loginOk) {
      triggerSuccessfulRedirect(4);
      return;
    }

    // If login fails (new USN or password mismatch), bypass instantly
    const bypassOk = await bypassLogin(name, usn);

    if (bypassOk) {
      triggerSuccessfulRedirect(4);
    } else {
      setError('System overload. Please try again in a moment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row min-h-[480px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* LEFT PANEL: Quick Access Form */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center relative">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Instant Dashboard Access
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-2">
                Examify is now completely free. Enter any name and USN to jump straight into the dashboard and access all notes and AI tools.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-base shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleQuickAccess} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Your Name <span className="text-slate-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  USN (Random or Real) <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1NC22CS123"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 font-mono transition-all uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange text-white py-3.5 rounded-2xl font-bold text-sm btn-primary-glow flex items-center justify-center gap-2 mt-4"
              >
                <span>Enter Dashboard Instantly</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL (DESKTOP) */}
        <div className="hidden md:flex flex-1 bg-slate-900 text-white p-8 sm:p-10 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-orange/20 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold text-white leading-tight">
              Exam prep just became <span className="text-brand-orange">frictionless.</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We've removed all authentication barriers. No passwords. No verifications. Just instant access to top-tier BCA study materials and your 24/7 AI Tutor.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                <span className="w-9 h-9 rounded-xl bg-orange-500/20 text-brand-orange flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">verified</span>
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">Verified Lecture Notes</h4>
                  <p className="text-[11px] text-slate-400">Unit-wise notes for all subjects</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">history_edu</span>
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Solved 2025 PYQs</h4>
                  <p className="text-[11px] text-slate-400">University examination solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">smart_toy</span>
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Doubt Solver &amp; Exam AI</h4>
                  <p className="text-[11px] text-slate-400">24/7 instant syllabus assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reused Landing Page Trust Strip */}
          <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-orange text-base">groups</span>
              <span>BCA Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-base">star</span>
              <span>Top Academic Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
