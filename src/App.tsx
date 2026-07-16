import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Doctors } from './components/Doctors';
import { Process } from './components/Process';
import { BeforeAfter } from './components/BeforeAfter';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MobileActions } from './components/MobileActions';
import { BackToTop } from './components/BackToTop';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { state } = useCMS();

  // Hash-based routing — works on GitHub Pages static hosting
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('aura_admin_session') === 'true';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('aura_admin_session', 'true');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('aura_admin_session');
    navigateTo('');
  };

  // Dynamic Theme Color Injection
  useEffect(() => {
    let styleTag = document.getElementById('cms-theme-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cms-theme-styles';
      document.head.appendChild(styleTag);
    }

    const accent = state.theme.accentColor;
    const accentHover = accent + 'dd';

    styleTag.innerHTML = `
      :root {
        --color-primary: ${state.theme.primaryColor};
        --color-accent: ${state.theme.accentColor};
        --color-accent-hover: ${accentHover};
        --color-green: ${state.theme.greenColor};
        font-family: '${state.theme.primaryFont}', system-ui, -apple-system, sans-serif !important;
      }
    `;
  }, [state.theme]);

  // SEO Updates
  useEffect(() => {
    document.title = state.seo.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', state.seo.metaDescription);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', state.seo.metaKeywords);
  }, [state.seo]);

  // Hash-based admin route check — works on any static host
  const isAdminRoute = currentHash === '#admin' || currentHash === '#/admin';

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-neutral-100 font-sans">
        {isAdminLoggedIn ? (
          <AdminDashboard
            onLogout={handleLogout}
            onClose={() => navigateTo('')}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => navigateTo('')}
          />
        )}
      </div>
    );
  }

  // Public Landing Page
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 antialiased font-sans">
      <Navbar onAdminToggle={() => navigateTo('#admin')} />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Process />
      <BeforeAfter />
      <Testimonials />
      <FAQ />
      <BookingForm />
      <Contact />
      <Footer />

      {/* Floating Widget Actions */}
      <MobileActions />
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <CMSProvider>
      <MainLayout />
    </CMSProvider>
  );
}

export default App;
