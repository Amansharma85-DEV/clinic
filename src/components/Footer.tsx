import React from 'react';
import { Sparkles, Mail } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { state } = useCMS();
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
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
    <footer className="bg-neutral-900 text-neutral-400 py-16 border-t border-neutral-800 pb-24 md:pb-16 select-none text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* About Branding Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
              <Sparkles className="w-4.5 h-4.5 fill-white/20 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-wide text-white">
              {state.clinicInfo.logoText}
            </span>
          </div>
          <p className="text-2xs text-neutral-500 leading-relaxed max-w-sm">
            Board-certified skin, hair and anti-aging care solutions. Merging advanced clinical lasers with premium spa wellness protocols.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href={state.clinicInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[var(--color-accent)] hover:text-white flex items-center justify-center text-neutral-400 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={state.clinicInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[var(--color-accent)] hover:text-white flex items-center justify-center text-neutral-400 transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="mailto:info@auraclinic.com"
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[var(--color-accent)] hover:text-white flex items-center justify-center text-neutral-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-3.5">
            {['About Us', 'Why Us', 'Our Doctors', 'Before After'].map((item) => {
              const hrefs: Record<string, string> = {
                'About Us': '#about',
                'Why Us': '#why-us',
                'Our Doctors': '#doctors',
                'Before After': '#before-after'
              };
              return (
                <li key={item}>
                  <a
                    href={hrefs[item]}
                    onClick={(e) => handleScrollTo(e, hrefs[item])}
                    className="text-2xs text-neutral-450 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Services Links Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6">Popular Treatments</h4>
          <ul className="space-y-3.5">
            {state.services.slice(0, 4).map((srv) => (
              <li key={srv.id}>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="text-2xs text-neutral-450 hover:text-white transition-colors"
                >
                  {srv.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6">Legal & Support</h4>
          <ul className="space-y-3.5">
            {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Online FAQ'].map((item) => {
              const target = item === 'Online FAQ' ? '#faq' : '#';
              return (
                <li key={item}>
                  <a
                    href={target}
                    onClick={(e) => target !== '#' && handleScrollTo(e, target)}
                    className="text-2xs text-neutral-450 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-3xs text-neutral-600">
        <span>
          © {currentYear} {state.clinicInfo.name}. All rights reserved.
        </span>
        <span>
          Designed with Premium Luxury & Scientific Standards.
        </span>
      </div>
    </footer>
  );
};
