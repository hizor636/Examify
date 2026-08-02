'use client';

import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { SemesterPortal } from '../../components/SemesterPortal';

export default function DashboardPage() {
  const { user } = useAuth();
  return <SemesterPortal semester={user?.semester || 4} />;
}
