import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

export const About: React.FC = () => {
  const { state } = useCMS();

  return (
    <section id="about" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Image with premium frame */}
        <div className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-md"
          >
            {/* Border frame accent */}
            <div className="absolute inset-4 border border-[var(--color-accent)] rounded-[32px] translate-x-4 translate-y-4 -z-10 hidden sm:block" />
            
            {/* Main doctor image */}
            <div className="rounded-[32px] overflow-hidden aspect-[3/4] bg-neutral-100 dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-850">
              <img
                src={state.about.imageUrl}
                alt="Clinic Doctor"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            
            {/* Floating Clinic Seal */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--color-accent)] text-white px-5 py-4 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center border border-white/10">
              <span className="text-xl font-bold font-serif leading-none">Aura</span>
              <span className="text-4xs uppercase tracking-widest mt-1 opacity-80">Certified Clinic</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
              About the Clinic
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
              {state.about.heading}
            </h2>
            <div className="h-0.5 w-16 bg-[var(--color-accent)] mb-6" />
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base mb-10 whitespace-pre-line">
              {state.about.content}
            </p>
          </motion.div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 gap-6 w-full">
            {state.about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80 shadow-sm flex flex-col items-start transition-all hover:shadow-md hover:border-[var(--color-accent)]/20 hover:-translate-y-0.5"
              >
                <span className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] mb-1">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
