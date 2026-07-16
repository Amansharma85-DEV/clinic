import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Stethoscope, Activity, FileText, CheckSquare, Heart } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const steps: ProcessStep[] = [
  {
    title: "Book Appointment",
    description: "Claim your diagnostic slot easily via our digital calendar or contact lines.",
    icon: Calendar
  },
  {
    title: "Consultation",
    description: "Discuss clinical history and aesthetic concerns in private with your doctor.",
    icon: Stethoscope
  },
  {
    title: "Skin Analysis",
    description: "Advanced surface imaging to map melanin, sebum, and dermal hydration.",
    icon: Activity
  },
  {
    title: "Treatment Plan",
    description: "Receive a tailored clinical prescription mapping sessions, costs, and goals.",
    icon: FileText
  },
  {
    title: "Procedure",
    description: "Undergo your clinical sessions in our sterile, high-end treatment rooms.",
    icon: CheckSquare
  },
  {
    title: "Follow-up Care",
    description: "Scheduled checks and post-treatment routines to lock in aesthetic gains.",
    icon: Heart
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Our Treatment Process
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            A methodical, safety-first clinical workflow designed to deliver predictable, natural aesthetic outcomes.
          </p>
        </div>

        {/* Timeline Desktop vs Mobile */}
        <div className="relative">
          {/* Timeline Center Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-100 dark:bg-neutral-800 -translate-x-1/2 hidden lg:block" />
          
          {/* Timeline Left Line (Mobile) */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-100 dark:bg-neutral-850 -translate-x-1/2 lg:hidden" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-20 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.title} className="grid grid-cols-1 lg:grid-cols-2 items-center relative">
                  {/* Circle Pin */}
                  <div className="absolute left-8 lg:left-1/2 top-1.5 lg:top-1/2 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-[var(--color-accent)] flex items-center justify-center -translate-x-1/2 lg:-translate-y-1/2 z-10 shadow-sm">
                    <span className="text-[10px] font-bold text-[var(--color-accent)]">
                      {index + 1}
                    </span>
                  </div>

                  {/* Left Content Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7 }}
                    className={`pl-16 lg:pl-0 ${
                      isEven ? 'lg:pr-16 lg:text-right lg:col-start-1' : 'lg:pl-16 lg:text-left lg:col-start-2'
                    }`}
                  >
                    <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'} items-start`}>
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Text */}
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      
                      <p className={`text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
