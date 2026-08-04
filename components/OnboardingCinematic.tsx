'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface OnboardingCinematicProps {
  onComplete: () => void;
}

export const OnboardingCinematic: React.FC<OnboardingCinematicProps> = ({ onComplete }) => {
  const { user, updateProfile } = useAuth();
  
  // step 0 = Cinematic Sequence 1 (Welcome text)
  // step 1 = Cinematic Sequence 2 (Form/Setup)
  const [step, setStep] = useState(0);
  const [cinematicOut, setCinematicOut] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [semester, setSemester] = useState<number>(4);
  const [section, setSection] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSemester(user.semester || 4);
      setSection(user.section || '');
    }
  }, [user]);

  useEffect(() => {
    // Stage 1: Display Cinematic Welcome text for a few seconds.
    const timer1 = setTimeout(() => {
      setCinematicOut(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      // After cinematic out, check if user profile is complete
      const isComplete = user?.name && user?.section && user?.semester;
      if (isComplete) {
        // Safe redirect
        onComplete();
      } else {
        // Needs setup
        setStep(1);
        setCinematicOut(false);
      }
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [user, onComplete]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !section.trim() || !semester) {
      setFormError('Please fill in all details.');
      return;
    }
    
    setIsSubmitting(true);
    const success = await updateProfile({ name: name.trim(), section: section.trim().toUpperCase(), semester });
    
    if (success) {
      // Wait for a tiny transition effect then redirect
      setCinematicOut(true);
      setTimeout(() => {
         onComplete();
      }, 800);
    } else {
      setFormError('Failed to save profile. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
       {/* Background ambient glow */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse-slow"></div>
       </div>
       
       <div className="relative z-10 w-full max-w-md px-6">
         {step === 0 && (
           <div className={cinematicOut ? 'animate-cinematic-out' : 'animate-cinematic-in'}>
              <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl shadow-brand-orange/20">
                   <span className="material-symbols-outlined text-4xl text-brand-orange">school</span>
                 </div>
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight text-center leading-tight">
                Welcome to Examify
              </h1>
              <p className="text-slate-400 text-center mt-6 text-sm md:text-base font-medium">
                Your academic dashboard is getting ready
              </p>
           </div>
         )}

         {step === 1 && (
           <div className={cinematicOut ? 'animate-cinematic-out' : 'animate-cinematic-form-in'}>
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Let's set up your profile</h2>
                <p className="text-slate-400 text-sm">Just a few quick details to personalize your dashboard.</p>
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-semibold">
                    {formError}
                  </div>
                )}
                
                <div className="animate-cinematic-form-in-delay-1">
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Enter your name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange transition-all placeholder:text-slate-500"
                  />
                </div>
                
                <div className="animate-cinematic-form-in-delay-2 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Choose your semester <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(s => (
                        <option key={s} value={s} className="text-slate-900">
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Select your section <span className="text-brand-orange">*</span>
                    </label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled className="text-slate-500">Select</option>
                      {['A', 'B', 'C', 'D'].map(sec => (
                        <option key={sec} value={sec} className="text-slate-900">Section {sec}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 rounded-xl bg-brand-orange text-white font-bold text-sm shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Saving...' : 'Continue to Dashboard'}
                  {!isSubmitting && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                </button>
             </form>
           </div>
         )}
       </div>
    </div>
  );
};
