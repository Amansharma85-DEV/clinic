import React from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, Calendar, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Hero: React.FC = () => {
  const { state } = useCMS();

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#booking');
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

  // Convert newlines in title to HTML breaks
  const renderTitle = (title: string) => {
    return title.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < title.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center bg-gradient-to-tr from-sky-50 via-white to-emerald-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900/50 overflow-hidden">
      {/* Background blobs for luxury aura */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-200/10 dark:bg-emerald-900/5 rounded-full filter blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left text content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge Rating */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-neutral-800/70 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm mb-6"
          >
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {state.hero.rating}
            </span>
            <span className="text-2xs text-neutral-400 dark:text-neutral-500">|</span>
            <span className="text-2xs font-medium text-neutral-500 dark:text-neutral-400">
              {state.hero.ratingCount}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6"
          >
            {renderTitle(state.hero.title)}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed mb-8"
          >
            {state.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
          >
            <a
              href="#booking"
              onClick={handleBookClick}
              className="flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/30 transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </a>
            
            <a
              href={`tel:${state.clinicInfo.callNumber}`}
              className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 px-8 py-3.5 rounded-full text-base font-semibold border border-neutral-200 dark:border-neutral-700 transition-all shadow-sm transform hover:-translate-y-0.5 text-center"
            >
              <Phone className="w-5 h-5 text-[var(--color-accent)]" />
              <span>Call Now</span>
            </a>
          </motion.div>

          {/* Trust Bar Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 w-full"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                <Star className="w-4 h-4 text-[var(--color-accent)] fill-[var(--color-accent)]/10" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">4.9 Rating</h4>
                <p className="text-3xs text-neutral-400">Google Verified</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                <HeartHandshake className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">5000+</h4>
                <p className="text-3xs text-neutral-400">Happy Patients</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                <Award className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{state.hero.experience}</h4>
                <p className="text-3xs text-neutral-400">Clinical Expertise</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-[var(--color-accent)]/10 rounded-xl text-[var(--color-accent)]">
                <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{state.hero.safety}</h4>
                <p className="text-3xs text-neutral-400">Certified Safeties</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Dermatologist Image */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative max-w-sm sm:max-w-md lg:max-w-full w-full"
          >
            {/* Geometric shadow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-blue-200/30 rounded-[40px] transform rotate-3 scale-102 filter blur-sm -z-10" />
            
            {/* Main Image */}
            <div className="rounded-[36px] overflow-hidden aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 shadow-xl border border-white/40 dark:border-neutral-800">
              <img
                src={state.hero.imageUrl}
                alt="Clinical treatment"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
                loading="eager"
              />
            </div>

            {/* Float Badge 1 */}
            <div className="absolute -top-6 -left-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-neutral-100/50 dark:border-neutral-700/50 flex items-center gap-3 animate-bounce-slow">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-3xs text-neutral-400">Certified Quality</p>
                <p className="text-xs font-bold text-neutral-950 dark:text-white">US FDA Approved</p>
              </div>
            </div>

            {/* Float Badge 2 */}
            <div className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-neutral-100/50 dark:border-neutral-700/50 flex items-center gap-3 animate-pulse-slow">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/25 flex items-center justify-center text-[var(--color-accent)]">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-3xs text-neutral-400">Technological Care</p>
                <p className="text-xs font-bold text-neutral-950 dark:text-white">Laser Skin Therapy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
