import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const FAQ: React.FC = () => {
  const { state } = useCMS();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-neutral-50 dark:bg-neutral-900/40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Everything you need to know about our skin, hair, and laser therapies. Speak with our experts if your query isn't listed.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {state.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-750 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 flex justify-between items-center text-left gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-750/30 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                    <span className="font-semibold text-sm sm:text-base text-neutral-850 dark:text-neutral-100">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus className="w-4 h-4 text-[var(--color-accent)]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-50 dark:border-neutral-700/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
