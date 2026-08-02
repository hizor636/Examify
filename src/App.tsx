'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { SemesterPortal } from '../components/SemesterPortal';

function MainApp() {
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSemester, setActiveSemester] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (sem: number) => {
    setActiveSemester(sem);
  };

  return (
    <main className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <Navbar
        onGetStarted={handleOpenAuth}
      />

      <div className="pt-[80px]">
        {user && (
          <div className="bg-slate-900 text-white px-6 py-2.5 text-xs flex flex-wrap justify-between items-center max-w-[1200px] mx-auto rounded-xl mb-4 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-200">
                Welcome, <span className="text-white font-bold">{user.name}</span> ({user.usn}) • Dept: {user.department}
              </span>
              <span className="bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                Semester {activeSemester || user.semester} Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSemester(activeSemester ? null : user.semester)}
                className="text-brand-orange hover:underline font-semibold"
              >
                {activeSemester ? 'View Landing Overview' : `Open Sem ${user.semester} Portal`}
              </button>
              <span className="text-slate-700">|</span>
              <button onClick={logout} className="text-slate-400 hover:text-white transition-colors font-medium">
                Log Out
              </button>
            </div>
          </div>
        )}

        {activeSemester ? (
          <SemesterPortal
            semester={activeSemester}
            onBackToMain={() => setActiveSemester(null)}
          />
        ) : (
          <>
            <HeroSection
              onBrowseSemester={handleOpenAuth}
              onStartRevising={() => scrollToSection('how-it-works')}
            />

            <TrustStrip />

            <HowItWorks />

            <AboutSection />

            <FinalCTA onBrowseSemester={handleOpenAuth} />
          </>
        )}

        <Footer />
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessRedirect={handleAuthSuccess}
      />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
