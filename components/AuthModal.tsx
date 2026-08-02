'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: (sem: number) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessRedirect }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usn, setUsn] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [year, setYear] = useState<number>(1);
  const [semester, setSemester] = useState<number>(1);
  const [password, setPassword] = useState('');

  // Automatic Semester Dropdown Options based on Selected Year Rule
  const getSemesterOptions = (selectedYear: number) => {
    switch (selectedYear) {
      case 1:
        return [1, 2];
      case 2:
        return [3, 4];
      case 3:
        return [5, 6];
      default:
        return [1, 2];
    }
  };

  // Update semester automatically when year changes
  useEffect(() => {
    const validSemesters = getSemesterOptions(year);
    if (!validSemesters.includes(semester)) {
      setSemester(validSemesters[0]);
    }
  }, [year]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name || !email || !usn || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      const success = await register(
        {
          name,
          email,
          usn,
          department,
          year,
          semester,
        },
        password
      );
      if (success) {
        onClose();
        if (onSuccessRedirect) onSuccessRedirect(semester);
      }
    } else {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }
      const success = await login(email, password);
      if (success) {
        onClose();
        if (onSuccessRedirect) onSuccessRedirect(semester);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-xl shadow-md text-white">
            <span className="material-symbols-outlined text-xl">school</span>
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {isRegister ? 'Create Student Account' : 'Student Portal Login'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">BCA Department Academic Engine</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Full Name <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  USN (University Seat Number) <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1MV23BC001"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Academic Year <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Semester <span className="text-brand-orange">*</span>
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-brand-orange"
                  >
                    {getSemesterOptions(year).map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  disabled
                  value={department}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              College Email <span className="text-brand-orange">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Password <span className="text-brand-orange">*</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-orange text-white py-3 rounded-xl font-semibold text-sm btn-primary-glow flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegister ? 'Register Account' : 'Log In to Portal'}</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </form>

        {/* Toggle Login / Register */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="font-bold text-brand-orange hover:underline"
              >
                Log In Here
              </button>
            </p>
          ) : (
            <p>
              New BCA Student?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="font-bold text-brand-orange hover:underline"
              >
                Register Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
