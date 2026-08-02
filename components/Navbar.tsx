'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onOpenLogin?: () => void;
  onGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'how-it-works', 'why-examify', 'about'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-0'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-1'
      }`}
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 flex justify-between items-center h-[72px]">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="w-9 h-9 bg-brand-orange flex items-center justify-center rounded-xl shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-white text-2xl">school</span>
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-orange transition-colors">
            Examify
          </span>
        </Link>

        {/* Center: Desktop Marketing Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => scrollToSection('hero')}
            className={`transition-colors duration-200 relative py-1 ${
              activeSection === 'hero' ? 'text-brand-orange font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
            {activeSection === 'hero' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('how-it-works')}
            className={`transition-colors duration-200 relative py-1 ${
              activeSection === 'how-it-works' ? 'text-brand-orange font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            How It Works
            {activeSection === 'how-it-works' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('why-examify')}
            className={`transition-colors duration-200 relative py-1 ${
              activeSection === 'why-examify' ? 'text-brand-orange font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Why Examify
            {activeSection === 'why-examify' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className={`transition-colors duration-200 relative py-1 ${
              activeSection === 'about' ? 'text-brand-orange font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About Us
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
            )}
          </button>
        </div>

        {/* Right: "Get Started" CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onGetStarted}
            aria-label="Get Started"
            className="bg-brand-orange text-white px-6 py-2.5 rounded-xl font-bold text-xs btn-primary-glow flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-brand-orange transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-6 py-4 space-y-3 shadow-lg animate-fade-in">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-brand-orange"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-brand-orange"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('why-examify')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-brand-orange"
          >
            Why Examify
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-brand-orange"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onGetStarted) onGetStarted();
            }}
            className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold text-xs text-center btn-primary-glow flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Get Started (USN Verification)</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}
    </nav>
  );
};
