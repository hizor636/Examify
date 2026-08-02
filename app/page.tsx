'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';

function MainApp() {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const router = useRouter();

  // Auto-redirect logged-in students to dashboard
  React.useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (sem: number) => {
    router.replace('/dashboard');
  };

  const handleSelectSemester = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      router.replace('/dashboard');
    }
  };

  if (loading) {
    return null;
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
        onClose={() => setAuthModalOpen(false)}
        onSuccessRedirect={handleAuthSuccess}
      />
    </main>
  );
}

export default function Home() {
  return <MainApp />;
}
