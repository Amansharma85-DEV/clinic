import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onAdminToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminToggle }) => {
  const { state } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Results', href: '#before-after' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm py-4 border-b border-neutral-200/40'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => handleScrollTo(e, '#')}>
          <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-accent)]/20 transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white fill-white/20" />
          </div>
          <span className="font-semibold text-xl tracking-wide text-neutral-900 dark:text-white transition-all group-hover:opacity-90">
            {state.clinicInfo.logoText}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-neutral-600 hover:text-[var(--color-accent)] dark:text-neutral-300 dark:hover:text-[var(--color-accent)] transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onAdminToggle}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[var(--color-accent)] transition-colors cursor-pointer mr-2 px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full hover:border-[var(--color-accent)]/30"
          >
            Admin Panel
          </button>
          
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, '#booking')}
            className="flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-[var(--color-accent)]/10 hover:shadow-[var(--color-accent)]/20 transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onAdminToggle}
            className="text-2xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[var(--color-accent)] transition-colors cursor-pointer px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 rounded-full"
          >
            CMS
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-800 dark:text-white p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] z-40 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 animate-in fade-in slide-in-from-top duration-300">
          <div className="p-6 flex flex-col gap-5 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-accent)] py-2 border-b border-neutral-50 dark:border-neutral-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <a
              href="#booking"
              onClick={(e) => handleScrollTo(e, '#booking')}
              className="mt-4 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-3.5 rounded-full text-base font-semibold transition-all shadow-md shadow-[var(--color-accent)]/20"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </a>
            
            <div className="mt-auto pt-6 text-center text-xs text-neutral-400">
              {state.clinicInfo.phone} • {state.clinicInfo.email}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
