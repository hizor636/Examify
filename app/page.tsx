'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
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
      {/* Sticky Header with User Status Badge */}
      <Navbar
        onGetStarted={handleOpenAuth}
      />

      <div className="pt-[80px]">
        {/* If Active Semester Portal is selected, show Portal View */}
        {activeSemester ? (
          <SemesterPortal
            semester={activeSemester}
            onBackToMain={() => setActiveSemester(null)}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onBrowseSemester={handleOpenAuth}
              onStartRevising={() => scrollToSection('how-it-works')}
            />

            {/* 2. Trust Metrics Strip */}
            <TrustStrip />

            {/* 3. Step-by-Step Workflow */}
            <HowItWorks />

            {/* 4. Student Trust & Institutional Credibility */}
            <AboutSection />

            {/* 5. Final CTA */}
            <FinalCTA onBrowseSemester={handleOpenAuth} />
          </>
        )}

        {/* 6. Footer */}
        <Footer />
      </div>

      {/* Auth & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessRedirect={handleAuthSuccess}
      />
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
