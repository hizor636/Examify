'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
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
import { SemesterPortal } from '../components/SemesterPortal';
import { UserProfileModal } from '../components/UserProfileModal';
import { AdminDashboardModal } from '../components/AdminDashboardModal';
import { CommunityForumModal } from '../components/CommunityForumModal';

function MainApp() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);

  // Active Semester View (null means show Landing Page)
  const [activeSemester, setActiveSemester] = useState<number | null>(null);

  // Auto-redirect returning logged-in student to dashboard, and handle logout
  React.useEffect(() => {
    if (!user) {
      setActiveSemester(null);
    } else if (activeSemester === null) {
      setActiveSemester(user.semester || 4);
    }
  }, [user]);

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (sem: number) => {
    setActiveSemester(sem);
  };

  const handleSelectSemester = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      setActiveSemester(user.semester || 4);
    }
  };

  if (activeSemester) {
    return (
      <main className="relative min-h-screen bg-surface-dim font-body-md text-on-background overflow-x-hidden selection:bg-primary selection:text-white">
        <DashboardSidebar onGoHome={() => setActiveSemester(null)} />
        
        <div className="pl-72 flex flex-col min-h-screen">
          <DashboardHeader 
            onOpenProfile={() => setProfileModalOpen(true)}
            onOpenCommunity={() => setCommunityModalOpen(true)}
            onOpenSettings={() => setProfileModalOpen(true)}
          />
          
          <SemesterPortal
            semester={user?.semester || activeSemester || 4}
            onBackToMain={() => setActiveSemester(null)}
            onOpenCommunity={() => setCommunityModalOpen(true)}
          />
        </div>

        {/* Student Profile Modal */}
        <UserProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />

        {/* Community Discussion Forum Modal */}
        <CommunityForumModal
          isOpen={communityModalOpen}
          onClose={() => setCommunityModalOpen(false)}
          semester={user?.semester || activeSemester || 4}
        />
      </main>
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
