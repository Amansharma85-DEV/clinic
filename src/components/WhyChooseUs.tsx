import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Cpu,
  ShieldCheck,
  BadgeDollarSign,
  HeartHandshake,
  Sparkles,
  Clock,
  CalendarCheck
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  UserCheck,
  Cpu,
  ShieldCheck,
  BadgeDollarSign,
  HeartHandshake,
  Sparkles,
  Clock,
  CalendarCheck
};

export const WhyChooseUs: React.FC = () => {
  const { state } = useCMS();

  return (
    <section id="why-us" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Our Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Why Patients Choose Aura Clinic
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            We merge medical science with state-of-the-art technology to provide high-safety cosmetic and clinical solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.whyChooseUs.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName] || ShieldCheck;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-8 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 shadow-sm transition-all hover:bg-white dark:hover:bg-neutral-800 hover:shadow-lg hover:border-[var(--color-accent)]/20 hover:-translate-y-1 text-left flex flex-col"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
