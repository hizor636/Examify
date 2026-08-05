'use client';

import React, { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { DashboardHeader } from '../../components/DashboardHeader';
import { UserProfileModal } from '../../components/UserProfileModal';
import { CommunityForumModal } from '../../components/CommunityForumModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-orange selection:text-white">
      <DashboardSidebar onGoHome={() => window.location.assign('/dashboard')} />
      
      <div className="pl-72 flex flex-col min-h-screen">
        <DashboardHeader 
          onOpenProfile={() => setProfileModalOpen(true)}
          onOpenCommunity={() => setCommunityModalOpen(true)}
          onOpenSettings={() => setProfileModalOpen(true)}
        />
        
        <main className="flex-1">
          {children}
        </main>
      </div>

      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <CommunityForumModal
        isOpen={communityModalOpen}
        onClose={() => setCommunityModalOpen(false)}
        semester={user?.semester || 4}
      />
    </div>
  );
}
