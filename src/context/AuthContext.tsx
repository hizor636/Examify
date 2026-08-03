'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

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

  // Temporary state to hold user data during verification -> setPassword flow
  const [pendingUser, setPendingUser] = useState<Partial<UserProfile> | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            // Ensure completedItems structure exists in case it was created without it
            if (!profile.completedItems) {
               profile.completedItems = { notes: [], quizzes: [], pyqs: [], labs: [], important: [] };
            }
            setUser(profile);
          } else {
            console.warn('Firebase user exists but no Firestore profile found.');
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const verifyUsnDob = async (usnInput: string, dobInput: string) => {
    setLoading(true);
    const cleanedUsn = usnInput.trim().toUpperCase();

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('usn', '==', cleanedUsn));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User exists
        const existingDoc = querySnapshot.docs[0];
        const existingUser = existingDoc.data() as UserProfile;
        
        if (existingUser.dob === dobInput) {
          setLoading(false);
          return { success: true, isFirstTime: !existingUser.passwordSet, userProfile: existingUser };
        } else {
          setLoading(false);
          return { success: false, isFirstTime: false }; // DOB mismatch
        }
      }

      // First time verification seed (user doesn't exist yet)
      const newProfile: Partial<UserProfile> = {
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

      setPendingUser(newProfile);
      setLoading(false);
      return { success: true, isFirstTime: true };

    } catch (error) {
      console.error("Error verifying USN:", error);
      setLoading(false);
      return { success: false, isFirstTime: true };
    }
  };

  const setPassword = async (password: string): Promise<boolean> => {
    if (!pendingUser || !pendingUser.email) return false;
    
    try {
      setLoading(true);
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, pendingUser.email, password);
      
      // Save profile to Firestore
      const fullProfile: UserProfile = {
        ...pendingUser,
        uid: userCredential.user.uid,
        passwordSet: true,
      } as UserProfile;

      await setDoc(doc(db, 'users', userCredential.user.uid), fullProfile);
      
      // The onAuthStateChanged listener will pick up the new user and set state
      setPendingUser(null);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error setting password:", error);
      setLoading(false);
      return false;
    }
  };

  const loginWithPassword = async (identifier: string, pass: string): Promise<boolean> => {
    try {
      setLoading(true);
      const cleanId = identifier.trim().toLowerCase();
      // If identifier is not an email, assume it's a USN
      const email = cleanId.includes('@') ? cleanId : `${cleanId}@college.edu`;
      
      await signInWithEmailAndPassword(auth, email, pass);
      // Let the auth state listener handle fetching and setting user
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
      return false;
    }
  };

  const registerStudent = async (
    data: Omit<UserProfile, 'uid' | 'role' | 'createdAt' | 'completedItems' | 'passwordSet'>,
    pass: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const email = data.email || `${data.usn.toLowerCase()}@college.edu`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      
      const newUser: UserProfile = {
        ...data,
        uid: userCredential.user.uid,
        email,
        role: 'student',
        passwordSet: true,
        createdAt: new Date().toISOString(),
        completedItems: { notes: [], quizzes: [], pyqs: [], labs: [], important: [] },
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error registering student:", error);
      setLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; requiresSemester?: boolean; mockUsn?: string }> => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const gUser = result.user;

      const userDocRef = doc(db, 'users', gUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
         const profile = userDoc.data() as UserProfile;
         if (!profile.completedItems) {
            profile.completedItems = { notes: [], quizzes: [], pyqs: [], labs: [], important: [] };
         }
         setUser(profile);
         setLoading(false);
         return { success: true, requiresSemester: false };
      }

      // First time Google User
      const mockUsn = `GOOGLE_${gUser.uid.substring(0, 8)}`.toUpperCase();
      
      const newProfile: Partial<UserProfile> = {
        uid: gUser.uid,
        usn: mockUsn,
        dob: '2000-01-01',
        name: gUser.displayName || 'Google Student',
        email: gUser.email || '',
        department: 'BCA',
        role: 'student',
        passwordSet: true, // N/A for Google Auth
        createdAt: new Date().toISOString(),
        completedItems: { notes: [], quizzes: [], pyqs: [], labs: [], important: [] },
      };

      setPendingUser(newProfile);
      setLoading(false);
      return { success: true, requiresSemester: true, mockUsn };
    } catch (error) {
      console.error('Google Sign In Error', error);
      setLoading(false);
      return { success: false };
    }
  };

  const completeGoogleSignIn = async (mockUsn: string, semester: number) => {
    if (!pendingUser || !pendingUser.uid) return;
    try {
       setLoading(true);
       const fullProfile: UserProfile = {
         ...pendingUser,
         semester,
       } as UserProfile;

       await setDoc(doc(db, 'users', pendingUser.uid), fullProfile);
       setUser(fullProfile);
       setPendingUser(null);
       setLoading(false);
    } catch (error) {
       console.error("Error completing Google Sign In:", error);
       setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const setSemester = async (sem: number) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { semester: sem });
      setUser({ ...user, semester: sem });
    } catch (error) {
       console.error("Error updating semester:", error);
    }
  };

  const markItemCompleted = async (type: keyof UserCompletedItems, itemId: string) => {
    if (!user) return;
    const currentList = user.completedItems?.[type] || [];
    if (currentList.includes(itemId)) return; // already marked

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`completedItems.${type}`]: arrayUnion(itemId)
      });

      const updatedItems: UserCompletedItems = {
        ...user.completedItems,
        [type]: [...currentList, itemId],
      };

      setUser({
        ...user,
        completedItems: updatedItems,
      });
    } catch (error) {
       console.error("Error marking item completed:", error);
    }
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
