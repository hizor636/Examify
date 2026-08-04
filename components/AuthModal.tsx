'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: (sem: number) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessRedirect }) => {
  const { verifyUsnDob, setPassword, loginWithPassword, registerStudent, setSemester, loginWithGoogle, completeGoogleSignIn } = useAuth();

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

  const handleVerifyStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!usn || !dob) {
      setError('Please enter both your USN and Date of Birth.');
      return;
    }

    const res = await verifyUsnDob(usn, dob);
    if (res.success) {
      if (res.isFirstTime) {
        setSuccessMsg('Enrollment Verified! Now set your secure password to complete setup.');
        setStepIndex(2);
        setMode('setPassword');
      } else {
        setSuccessMsg('You already have an account! Please log in with your password.');
        setMode('login');
      }
    } else {
      setError('Verification failed. Please double check USN and Date of Birth.');
    }
  };

  const handleSetPasswordStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const ok = await setPassword(password);
    if (ok) {
      setSemester(semester);
      triggerSuccessfulRedirect(semester);
    } else {
      setError('Failed to set password. Please try again.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!usn || !password) {
      setError('Please enter your USN or Email and Password.');
      return;
    }

    const ok = await loginWithPassword(usn, password);
    if (ok) {
      triggerSuccessfulRedirect(semester);
    } else {
      setError('Invalid credentials. Please check your USN and password.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !usn || !dob || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const ok = await registerStudent(
      {
        usn: usn.toUpperCase(),
        dob,
        name,
        email: email || `${usn.toLowerCase()}@college.edu`,
        department: 'BCA',
        semester,
        section: section.toUpperCase(),
      },
      password
    );

    if (ok) {
      triggerSuccessfulRedirect(semester);
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const res = await loginWithGoogle();
    if (res.success) {
      if (res.requiresSemester && res.mockUsn) {
        setTempGoogleUsn(res.mockUsn);
        setMode('setGoogleSemester');
      } else {
        triggerSuccessfulRedirect(semester); // Or use user.semester if we had it synchronously, but usually it reloads or pushes to dashboard
      }
    } else {
      setError('Google Sign-In failed or was cancelled.');
    }
  };

  const handleGoogleSemesterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tempGoogleUsn) {
      await completeGoogleSignIn(tempGoogleUsn, semester, section.toUpperCase());
      triggerSuccessfulRedirect(semester);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full relative overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* LEFT PANEL: Multi-step Verification & Login Form */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative">
          <div>
            {/* Multi-step progress bar */}
            {mode !== 'login' && mode !== 'register' && mode !== 'setGoogleSemester' && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span className={stepIndex >= 1 ? 'text-brand-orange' : ''}>1. USN &amp; DOB</span>
                  <span className={stepIndex >= 2 ? 'text-brand-orange' : ''}>2. Set Password</span>
                  <span className={stepIndex >= 3 ? 'text-brand-orange' : ''}>3. Access Portal</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-orange h-full transition-all duration-500 rounded-full"
                    style={{ width: stepIndex === 1 ? '33%' : stepIndex === 2 ? '66%' : '100%' }}
                  />
                </div>
              </div>
            )}

            {/* Header Title */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {mode === 'verify' && 'One Step Closer to Passing'}
                {mode === 'setPassword' && 'Secure Your Student Account'}
                {mode === 'login' && 'Log In to Student Dashboard'}
                {mode === 'setGoogleSemester' && 'Complete Your Profile'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Enter your enrollment details to unlock 6 semesters of verified notes &amp; AI study tools.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-base shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-base shrink-0">check_circle</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* FORM 1: USN + DOB VERIFICATION STEP */}
            {mode === 'verify' && (
              <form onSubmit={handleVerifyStep1} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    USN (University Seat Number) <span className="text-brand-orange">*</span>
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

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Date of Birth (DOB) <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-3.5 rounded-2xl font-bold text-sm btn-primary-glow flex items-center justify-center gap-2 mt-2"
                >
                  <span>Verify Enrollment &amp; Enter Dashboard</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-slate-700 border border-slate-300 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>
              </form>
            )}

            {/* FORM 2: SET PASSWORD STEP */}
            {mode === 'setPassword' && (
              <form onSubmit={handleSetPasswordStep2} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    New Password / PIN <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Confirm Password <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <span>Save Password &amp; Launch Dashboard</span>
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </button>
              </form>
            )}

            {/* FORM 2.5: GOOGLE SEMESTER SETUP */}
            {mode === 'setGoogleSemester' && (
              <form onSubmit={handleGoogleSemesterSubmit} className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mb-4">
                  <h4 className="text-emerald-800 font-bold text-sm mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Google Sign-In Successful!
                  </h4>
                  <p className="text-emerald-700 text-xs font-medium">Please select your BCA Semester to finalize your dashboard setup.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Semester <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemesterInput(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all bg-white font-bold mb-4"
                    >
                      {[1, 2, 3, 4, 5, 6].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem} (BCA)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Section <span className="text-slate-400">(Opt)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A"
                      maxLength={1}
                      value={section}
                      onChange={(e) => setSection(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all uppercase mb-4"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <span>Complete Setup & Launch Dashboard</span>
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </button>
              </form>
            )}

            {/* FORM 3: LOGIN WITH PASSWORD */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    USN or Email <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1NC22CS123 or student@college.edu"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Password <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-3.5 rounded-2xl font-bold text-sm btn-primary-glow flex items-center justify-center gap-2 mt-2"
                >
                  <span>Log In to Dashboard</span>
                  <span className="material-symbols-outlined text-lg">login</span>
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-slate-700 border border-slate-300 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>
              </form>
            )}

          </div>

          {/* Mode Switcher Options */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-600 font-semibold">
            {mode !== 'verify' && mode !== 'setGoogleSemester' && (
              <button onClick={() => setMode('verify')} className="text-brand-orange hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">shield</span>
                <span>USN Verification</span>
              </button>
            )}

            {mode !== 'login' && (
              <button onClick={() => setMode('login')} className="text-slate-700 hover:underline">
                Log In with Password
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (DESKTOP): High-energy visual illustration & trust strip */}
        <div className="hidden md:flex flex-1 bg-slate-900 text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
          {/* Subtle Orange Glow Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-orange/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span>All 6 BCA Semesters Covered</span>
            </div>

            <h3 className="text-2xl font-bold text-white leading-tight">
              One platform.<br />
              All study materials.<br />
              <span className="text-brand-orange">Pass together.</span>
            </h3>

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
