'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';

export interface UserCompletedItems {
  notes: string[];
  quizzes: string[];
  pyqs: string[];
  labs: string[];
  important: string[];
}

export interface UserProfile {
  uid: string;
  usn: string;
  dob: string; // YYYY-MM-DD
  name: string;
  email: string;
  department: string; // Default: 'BCA'
  semester: number; // 1 to 6
  role: 'student' | 'admin';
  passwordSet: boolean;
  createdAt: string;
  completedItems: UserCompletedItems;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  verifyUsnDob: (usn: string, dob: string) => Promise<{ success: boolean; isFirstTime: boolean; userProfile?: UserProfile }>;
  setPassword: (password: string) => Promise<boolean>;
  loginWithPassword: (identifier: string, pass: string) => Promise<boolean>;
  registerStudent: (profile: Omit<UserProfile, 'uid' | 'role' | 'createdAt' | 'completedItems' | 'passwordSet'>, pass: string) => Promise<boolean>;
  logout: () => void;
  setSemester: (sem: number) => void;
  markItemCompleted: (type: keyof UserCompletedItems, itemId: string) => void;
  calculateReadinessScore: () => { overall: number; label: string; breakdown: Record<string, number> };
  loginWithGoogle: () => Promise<{ success: boolean; requiresSemester?: boolean; mockUsn?: string }>;
  completeGoogleSignIn: (mockUsn: string, semester: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  verifyUsnDob: async () => ({ success: false, isFirstTime: true }),
  setPassword: async () => false,
  loginWithPassword: async () => false,
  registerStudent: async () => false,
  logout: () => {},
  setSemester: () => {},
  markItemCompleted: () => {},
  calculateReadinessScore: () => ({ overall: 0, label: 'Getting Started', breakdown: {} }),
  loginWithGoogle: async () => ({ success: false }),
  completeGoogleSignIn: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load persisted user session from localStorage if present
    const stored = localStorage.getItem('examify_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.completedItems) {
          parsed.completedItems = { notes: [], quizzes: [], pyqs: [], labs: [], important: [] };
        }
        setUser(parsed);
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    setLoading(false);
  }, []);

  const saveUserSession = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('examify_user', JSON.stringify(updatedUser));
  };

  // USN + DOB verification flow
  const verifyUsnDob = async (usnInput: string, dobInput: string) => {
    setLoading(true);
    const cleanedUsn = usnInput.trim().toUpperCase();

    // Check if user already registered in localStorage database
    const dbStored = localStorage.getItem(`examify_db_${cleanedUsn}`);
    if (dbStored) {
      try {
        const existing: UserProfile = JSON.parse(dbStored);
        if (existing.dob === dobInput) {
          saveUserSession(existing);
          setLoading(false);
          return { success: true, isFirstTime: !existing.passwordSet, userProfile: existing };
        }
      } catch (e) {
        console.error(e);
      }
    }

    // First time verification seed
    const newProfile: UserProfile = {
      uid: 'usr_' + Date.now(),
      usn: cleanedUsn,
      dob: dobInput,
      name: `BCA Student (${cleanedUsn.slice(-4)})`,
      email: `${cleanedUsn.toLowerCase()}@college.edu`,
      department: 'BCA',
      semester: 4, // default sem
      role: 'student',
      passwordSet: false,
      createdAt: new Date().toISOString(),
      completedItems: { notes: [], quizzes: [], pyqs: [], labs: [], important: [] },
    };

    saveUserSession(newProfile);
    localStorage.setItem(`examify_db_${cleanedUsn}`, JSON.stringify(newProfile));
    setLoading(false);
    return { success: true, isFirstTime: true, userProfile: newProfile };
  };

  const setPassword = async (password: string): Promise<boolean> => {
    if (!user) return false;
    const updated: UserProfile = {
      ...user,
      passwordSet: true,
    };
    saveUserSession(updated);
    localStorage.setItem(`examify_db_${user.usn}`, JSON.stringify(updated));
    return true;
  };

  const loginWithPassword = async (identifier: string, pass: string): Promise<boolean> => {
    setLoading(true);
    const cleanId = identifier.trim().toUpperCase();

    const dbStored = localStorage.getItem(`examify_db_${cleanId}`);
    if (dbStored) {
      const existing: UserProfile = JSON.parse(dbStored);
      saveUserSession(existing);
      setLoading(false);
      return true;
    }

    // Fallback login
    const mockUser: UserProfile = {
      uid: 'user_' + Date.now(),
      usn: cleanId.includes('1') ? cleanId : '1NC22CS123',
      dob: '2004-05-15',
      name: identifier.split('@')[0].toUpperCase(),
      email: identifier.includes('@') ? identifier : `${cleanId.toLowerCase()}@college.edu`,
      department: 'BCA',
      semester: 4,
      role: identifier.toLowerCase().includes('admin') ? 'admin' : 'student',
      passwordSet: true,
      createdAt: new Date().toISOString(),
      completedItems: { notes: ['n101_1'], quizzes: ['q101_1'], pyqs: ['pyq101_1'], labs: ['lab101_1'], important: ['iq101_1'] },
    };
    saveUserSession(mockUser);
    setLoading(false);
    return true;
  };

  const registerStudent = async (
    data: Omit<UserProfile, 'uid' | 'role' | 'createdAt' | 'completedItems' | 'passwordSet'>,
    pass: string
  ): Promise<boolean> => {
    setLoading(true);
    const newUser: UserProfile = {
      ...data,
      uid: 'user_' + Date.now(),
      role: 'student',
      passwordSet: true,
      createdAt: new Date().toISOString(),
      completedItems: { notes: [], quizzes: [], pyqs: [], labs: [], important: [] },
    };
    saveUserSession(newUser);
    localStorage.setItem(`examify_db_${newUser.usn}`, JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; requiresSemester?: boolean; mockUsn?: string }> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const gUser = result.user;

      const mockUsn = `GOOGLE_${gUser.uid.substring(0, 8)}`.toUpperCase();
      
      const dbStored = localStorage.getItem(`examify_db_${mockUsn}`);
      if (dbStored) {
        const existing = JSON.parse(dbStored);
        saveUserSession(existing);
        return { success: true, requiresSemester: false };
      }

      // First time Google User
      const newProfile: UserProfile = {
        uid: gUser.uid,
        usn: mockUsn,
        dob: '2000-01-01',
        name: gUser.displayName || 'Google Student',
        email: gUser.email || '',
        department: 'BCA',
        semester: 4, // Temp, will be set in completeGoogleSignIn
        role: 'student',
        passwordSet: true, // N/A for Google Auth
        createdAt: new Date().toISOString(),
        completedItems: { notes: [], quizzes: [], pyqs: [], labs: [], important: [] },
      };

      // Don't save session globally yet, wait for semester
      localStorage.setItem(`examify_temp_google_${mockUsn}`, JSON.stringify(newProfile));
      
      return { success: true, requiresSemester: true, mockUsn };
    } catch (error) {
      console.error('Google Sign In Error', error);
      return { success: false };
    }
  };

  const completeGoogleSignIn = (mockUsn: string, semester: number) => {
    const tempStored = localStorage.getItem(`examify_temp_google_${mockUsn}`);
    if (tempStored) {
      const profile: UserProfile = JSON.parse(tempStored);
      profile.semester = semester;
      saveUserSession(profile);
      localStorage.setItem(`examify_db_${profile.usn}`, JSON.stringify(profile));
      localStorage.removeItem(`examify_temp_google_${mockUsn}`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('examify_user');
  };

  const setSemester = (sem: number) => {
    if (user) {
      const updated = { ...user, semester: sem };
      saveUserSession(updated);
      if (user.usn) {
        localStorage.setItem(`examify_db_${user.usn}`, JSON.stringify(updated));
      }
    }
  };

  const markItemCompleted = (type: keyof UserCompletedItems, itemId: string) => {
    if (!user) return;
    const currentList = user.completedItems?.[type] || [];
    if (currentList.includes(itemId)) return; // already marked

    const updatedItems: UserCompletedItems = {
      ...user.completedItems,
      [type]: [...currentList, itemId],
    };

    const updatedUser: UserProfile = {
      ...user,
      completedItems: updatedItems,
    };

    saveUserSession(updatedUser);
    localStorage.setItem(`examify_db_${user.usn}`, JSON.stringify(updatedUser));
  };

  const calculateReadinessScore = () => {
    if (!user || !user.completedItems) {
      return { overall: 0, label: 'Getting Started', breakdown: { notes: 0, quizzes: 0, pyqs: 0, labs: 0, important: 0 } };
    }

    const { notes = [], quizzes = [], pyqs = [], labs = [], important = [] } = user.completedItems;

    // Weights calculation (max 100%)
    const notesScore = Math.min(notes.length * 15, 25);
    const quizScore = Math.min(quizzes.length * 10, 20);
    const pyqScore = Math.min(pyqs.length * 12, 25);
    const labScore = Math.min(labs.length * 10, 15);
    const importantScore = Math.min(important.length * 8, 15);

    const overall = Math.min(100, notesScore + quizScore + pyqScore + labScore + importantScore);

    let label = 'Getting Started';
    if (overall >= 75) label = 'Exam Ready 🔥';
    else if (overall >= 45) label = 'Building Momentum ⚡';
    else if (overall >= 20) label = 'Making Progress 📈';

    return {
      overall,
      label,
      breakdown: {
        notes: notesScore,
        quizzes: quizScore,
        pyqs: pyqScore,
        labs: labScore,
        important: importantScore,
      },
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        verifyUsnDob,
        setPassword,
        loginWithPassword,
        registerStudent,
        logout,
        setSemester,
        markItemCompleted,
        calculateReadinessScore,
        loginWithGoogle,
        completeGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
