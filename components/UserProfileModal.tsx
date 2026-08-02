'use client';

import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, setSemester, calculateReadinessScore, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  if (!isOpen || !user) return null;

  const scoreData = calculateReadinessScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center text-xl font-bold shadow-md shadow-brand-orange/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500 font-mono">
                USN: <span className="text-brand-orange font-bold">{user.usn}</span> • DOB: {user.dob}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-orange text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Student Profile &amp; Stats
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-brand-orange text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Settings &amp; Preferences
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Readiness Score Card */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-350">
                    Exam Readiness Score ("Prep Confidence")
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-orange text-white">
                    {scoreData.label}
                  </span>
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-brand-orange">{scoreData.overall}%</span>
                  <span className="text-xs text-slate-400 pb-1">Activity Completion Rate</span>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-orange h-full transition-all duration-500"
                    style={{ width: `${scoreData.overall}%` }}
                  />
                </div>

                {/* Score breakdown pills */}
                <div className="grid grid-cols-3 gap-2 text-[10px] pt-2 border-t border-slate-800">
                  <div className="bg-slate-800 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block">Notes</span>
                    <span className="font-bold text-white">{scoreData.breakdown.notes} / 25%</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block">PYQs</span>
                    <span className="font-bold text-white">{scoreData.breakdown.pyqs} / 25%</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block">Quizzes</span>
                    <span className="font-bold text-white">{scoreData.breakdown.quizzes} / 20%</span>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-slate-800">
                  <div>
                    <span className="text-slate-400 block uppercase text-[10px] font-bold">Email Address</span>
                    <span className="font-bold">{user.email}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block uppercase text-[10px] font-bold">Department</span>
                    <span className="font-bold">{user.department}</span>
                  </div>



                  <div>
                    <span className="text-slate-400 block uppercase text-[10px] font-bold">Role</span>
                    <span className="font-bold uppercase text-brand-orange">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Platform Preferences</h4>

                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 block">Exam Reminder Notifications</span>
                    <span className="text-slate-500 text-[10px]">Receive daily preparation sprint alerts</span>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle rounded accent-brand-orange w-4 h-4" />
                </div>

                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-bold text-slate-800 block">High Contrast Mode</span>
                    <span className="text-slate-500 text-[10px]">Optimized for night study sessions</span>
                  </div>
                  <input type="checkbox" className="toggle rounded accent-brand-orange w-4 h-4" />
                </div>


              </div>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                <span>Sign Out of Account</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
