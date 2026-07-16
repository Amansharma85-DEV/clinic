import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CalendarCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import type { ServiceItem } from '../context/CMSContext';

export const Services: React.FC = () => {
  const { state } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Extract unique categories (if categories exist)
  const categories = ['All', ...Array.from(new Set(state.services.map(s => s.category || 'Skin')))];

  const filteredServices = activeCategory === 'All'
    ? state.services
    : state.services.filter(s => (s.category || 'Skin') === activeCategory);

  const handleBookService = (serviceName: string) => {
    setSelectedService(null);
    const target = document.querySelector('#booking');
    if (target) {
      // Find treatment select option and set it
      const selectElement = document.getElementById('treatment-select') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = serviceName;
        // Trigger synthetic change event so React form state updates
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
      
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
    <section id="services" className="py-24 bg-neutral-50 dark:bg-neutral-900/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Advanced Clinical & Aesthetic Treatments
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Tailored medical-grade solutions designed to rejuvenate skin texture, stimulate hair regrowth, and slow down physiological aging.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-350 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 border border-neutral-200/50 dark:border-neutral-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-750 shadow-sm hover:shadow-lg hover:border-[var(--color-accent)]/20 transition-all flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-150 relative">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Glassmorphic Category Tag */}
                  {service.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-white/20 dark:border-neutral-800/40 rounded-full text-[10px] font-bold tracking-wide uppercase text-neutral-800 dark:text-neutral-200">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Action Link */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer w-fit mt-auto"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Detail Overlay */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-neutral-950/40 dark:bg-neutral-950/70 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white dark:bg-neutral-900 rounded-[32px] overflow-hidden max-w-lg w-full shadow-2xl border border-neutral-100 dark:border-neutral-800 z-10 text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-sm border border-neutral-200/40 dark:border-neutral-700/40 flex items-center justify-center text-neutral-850 dark:text-neutral-150 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner Image */}
                <div className="aspect-video w-full overflow-hidden relative bg-neutral-150">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedService.category && (
                    <span className="absolute bottom-4 left-4 px-3.5 py-1 bg-[var(--color-accent)] text-white rounded-full text-3xs font-bold tracking-wide uppercase shadow-md">
                      {selectedService.category}
                    </span>
                  )}
                </div>

                {/* Modal Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    {selectedService.title}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-[var(--color-accent)] mb-4" />
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    {selectedService.description}
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleBookService(selectedService.title)}
                      className="flex-grow flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-3.5 rounded-full font-semibold transition-all shadow-md shadow-[var(--color-accent)]/20"
                    >
                      <CalendarCheck className="w-5 h-5" />
                      <span>Book Treatment</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-3.5 rounded-full font-semibold transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
