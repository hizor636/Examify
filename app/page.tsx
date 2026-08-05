'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex items-center gap-3 text-slate-400">
        <span className="material-symbols-outlined animate-spin text-brand-orange">progress_activity</span>
        <span className="text-sm font-medium">Loading dashboard…</span>
      </div>
    </div>
  );
}

