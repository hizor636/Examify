'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  usn: string;
  department: string; // Default: 'BCA'
  year: number; // 1, 2, or 3
  semester: number; // 1, 2, 3, 4, 5, or 6
  role: 'student' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (profile: Omit<UserProfile, 'uid' | 'role' | 'createdAt'>, pass: string) => Promise<boolean>;
  logout: () => void;
  setSemester: (sem: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  setSemester: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load persisted user session from localStorage if present
    const stored = localStorage.getItem('examify_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // Simulate/Authenticate
    const mockUser: UserProfile = {
      uid: 'user_' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      usn: '1MV23BC' + Math.floor(100 + Math.random() * 900),
      department: 'BCA',
      year: 2,
      semester: 4,
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('examify_user', JSON.stringify(mockUser));
    setLoading(false);
    return true;
  };

  const register = async (
    data: Omit<UserProfile, 'uid' | 'role' | 'createdAt'>,
    pass: string
  ): Promise<boolean> => {
    setLoading(true);
    const newUser: UserProfile = {
      ...data,
      uid: 'user_' + Date.now(),
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('examify_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('examify_user');
  };

  const setSemester = (sem: number) => {
    if (user) {
      const updated = { ...user, semester: sem };
      setUser(updated);
      localStorage.setItem('examify_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setSemester }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
