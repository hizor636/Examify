'use client';

import React, { useState } from 'react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'students' | 'analytics'>('analytics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Admin Management &amp; Analytics Hub</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Examify Control Center</h3>
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
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">insights</span>
            <span>Analytics &amp; Usage Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'students'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">groups</span>
            <span>Student Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            <span>Content Vault Management</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto space-y-6 text-xs">
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium block mb-1">Total Active Students</span>
                  <span className="text-2xl font-bold text-slate-900">1,482</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ +18% this month</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium block mb-1">Total Views / Downloads</span>
                  <span className="text-2xl font-bold text-slate-900">34,920</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ +24% pre-exam peak</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium block mb-1">Avg. Quiz Score</span>
                  <span className="text-2xl font-bold text-brand-orange">84.2%</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Across all 6 semesters</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-medium block mb-1">Avg. Study Readiness</span>
                  <span className="text-2xl font-bold text-purple-700">76%</span>
                  <span className="text-[10px] text-purple-600 font-bold block mt-1">Exam Ready status</span>
                </div>
              </div>

              {/* Bar Chart Representation */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-slate-200">Top Viewed Subjects (Pre-Exam Activity)</h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Problem Solving using C (Sem 1)</span>
                      <span className="font-bold text-brand-orange">9,420 views</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full w-[88%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Data Structures &amp; Algorithms (Sem 2)</span>
                      <span className="font-bold text-brand-orange">8,110 views</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full w-[76%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>DBMS &amp; SQL (Sem 3)</span>
                      <span className="font-bold text-brand-orange">7,850 views</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full w-[72%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Full-Stack Web Dev (Sem 4)</span>
                      <span className="font-bold text-brand-orange">6,390 views</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Enrolled Student Roster</h4>
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                    <tr>
                      <th className="p-3">USN</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Sem</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Readiness</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    <tr>
                      <td className="p-3 font-mono font-bold text-brand-orange">1NC22CS123</td>
                      <td className="p-3 font-semibold">Aarav Sharma</td>
                      <td className="p-3">Semester 4</td>
                      <td className="p-3 font-bold text-emerald-600">Student</td>
                      <td className="p-3 font-bold">85% (Exam Ready)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-brand-orange">1NC22CS089</td>
                      <td className="p-3 font-semibold">Priya N.</td>
                      <td className="p-3">Semester 2</td>
                      <td className="p-3 font-bold text-emerald-600">Student</td>
                      <td className="p-3 font-bold">60% (Building)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-brand-orange">1NC22CS042</td>
                      <td className="p-3 font-semibold">Rahul Verma</td>
                      <td className="p-3">Semester 6</td>
                      <td className="p-3 font-bold text-purple-700">Admin</td>
                      <td className="p-3 font-bold">95% (Exam Ready)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Upload New Lecture Notes or 2025 PYQ Paper</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Document Title (e.g. Unit 3 DBMS Normalization)..."
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <select className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white">
                    <option value={1}>Semester 1</option>
                    <option value={2}>Semester 2</option>
                    <option value={3}>Semester 3</option>
                    <option value={4}>Semester 4</option>
                    <option value={5}>Semester 5</option>
                    <option value={6}>Semester 6</option>
                  </select>
                </div>
                <button className="bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-800">
                  Publish to Content Vault
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs"
          >
            Close Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
