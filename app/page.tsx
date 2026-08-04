'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { OnboardingCinematic } from '../components/OnboardingCinematic';

function MainApp() {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showCinematic, setShowCinematic] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const isAuthAction = useRef(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setInitialLoad(false);
    }
  }, [loading]);

  // Auto-redirect logged-in students to dashboard
  useEffect(() => {
    if (!loading && user && !isAuthAction.current && !showCinematic) {
      router.replace('/dashboard');
    }
  }, [user, loading, router, showCinematic]);

  const handleOpenAuth = () => {
    isAuthAction.current = true;
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (sem: number) => {
    setAuthModalOpen(false);
    setShowCinematic(true);
  };

  const handleCinematicComplete = () => {
    router.replace('/dashboard');
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
    if (!user) {
      isAuthAction.current = false;
    }
  };

  const handleSelectSemester = () => {
    if (!user) {
      isAuthAction.current = true;
      setAuthModalOpen(true);
    } else {
      router.replace('/dashboard');
    }
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-orange rounded-full animate-spin"></div>
      </div>
    );
  }



  // Public Landing Page
  return (
    <main className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <Navbar
        onGetStarted={handleOpenAuth}
      />

      <div className="pt-[76px]">
        {/* 1. Hero Section */}
        <HeroSection
          onBrowseSemester={handleSelectSemester}
          onStartRevising={() => {
            const el = document.getElementById('how-it-works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Trust Metrics Strip */}
        <TrustStrip />

        {/* 3. Workflow (Only for non-logged-in users) */}
        {!user && <HowItWorks />}

        {/* 4. Institutional Credibility */}
        <AboutSection />

        {/* 5. Final CTA */}
        <FinalCTA onBrowseSemester={handleSelectSemester} />

        {/* Public Marketing Footer */}
        <Footer />
      </div>

      {/* Auth & USN+DOB Verification Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleAuthClose}
        onSuccessRedirect={handleAuthSuccess}
      />

      {/* Cinematic Welcome Overlay */}
      {showCinematic && (
        <OnboardingCinematic onComplete={handleCinematicComplete} />
      )}
    </main>
  );
}

export default function Home() {
  return <MainApp />;
}
