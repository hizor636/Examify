'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { Navbar } from '../components/Navbar';
import { AppNavbar } from '../components/AppNavbar';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { AppFooter } from '../components/AppFooter';
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

  // Auto-redirect returning logged-in student to dashboard for THEIR current semester only
  React.useEffect(() => {
    if (user && activeSemester === null) {
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

  return (
    <main className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      {/* 
        STRICT SHELL SEPARATION:
        - Dashboard uses AppNavbar (App Shell: Community + Profile only, ZERO marketing links, ZERO semester tabs).
        - Landing Page uses Navbar (Public Shell: Marketing links + Get Started CTA).
      */}
      {activeSemester ? (
        <AppNavbar
          onOpenProfile={() => setProfileModalOpen(true)}
          onOpenAdmin={() => setAdminModalOpen(true)}
          onOpenCommunity={() => setCommunityModalOpen(true)}
          onBackToOverview={() => setActiveSemester(null)}
        />
      ) : (
        <Navbar
          onGetStarted={handleOpenAuth}
        />
      )}

      <div className="pt-[76px]">
        {activeSemester ? (
          /* Main Authenticated Dashboard View (Single-Semester Access: user's current semester) */
          <>
            <SemesterPortal
              semester={user?.semester || activeSemester || 4}
              onBackToMain={() => setActiveSemester(null)}
              onOpenCommunity={() => setCommunityModalOpen(true)}
            />
            <AppFooter
              onOpenProfile={() => setProfileModalOpen(true)}
              onOpenCommunity={() => setCommunityModalOpen(true)}
            />
          </>
        ) : (
          /* Public Marketing Landing Page View & Public Footer */
          <>
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

            {/* 3. Workflow */}
            <HowItWorks />

            {/* 4. Institutional Credibility */}
            <AboutSection />

            {/* 5. Final CTA */}
            <FinalCTA onBrowseSemester={handleSelectSemester} />

            {/* Public Marketing Footer */}
            <Footer />
          </>
        )}
      </div>

      {/* Auth & USN+DOB Verification Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessRedirect={handleAuthSuccess}
      />

      {/* Student Profile Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Admin Dashboard & Analytics Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
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

export default function Home() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
