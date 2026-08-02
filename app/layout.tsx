import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examify - BCA Academic Engine & Resource Vault',
  description: 'Semester-wise BCA notes, 2025 question papers, model question solutions, and 24/7 AI tutor for exam preparation.',
  keywords: ['BCA', 'BCA Notes', '2025 Question Papers', 'Exam Prep', 'Examify', 'Academic Engine', 'AI Tutor'],
  authors: [{ name: 'Examify Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-brand-orange selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
