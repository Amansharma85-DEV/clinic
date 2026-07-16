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
  
  // Track URL path & hash for routing
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname + window.location.hash;
  });
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('aura_admin_session') === 'true';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.hash);
    };
    
    // Listen to browser navigation events
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    // Dispatch popstate event to let app know the URL changed
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('aura_admin_session', 'true');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('aura_admin_session');
    navigateTo('/');
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
    const accentHover = accent + 'dd'; // Slight transparency for hover states
    
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

  // Check if current route is the Admin CMS page
  const isAdminRoute = currentPath.includes('/admin') || currentPath.includes('#admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 font-sans">
        {isAdminLoggedIn ? (
          <AdminDashboard
            onLogout={handleLogout}
            onClose={() => navigateTo('/')}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => navigateTo('/')}
          />
        )}
      </div>
    );
  }

  // Otherwise, render Public Landing Page
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 antialiased font-sans">
      <Navbar onAdminToggle={() => navigateTo('/admin')} />
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
