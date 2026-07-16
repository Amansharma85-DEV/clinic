import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Testimonials: React.FC = () => {
  const { state } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (state.testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % state.testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [state.testimonials.length]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + state.testimonials.length) % state.testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % state.testimonials.length);
  };

  if (state.testimonials.length === 0) return null;

  const current = state.testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden relative">
      <div className="absolute top-10 right-10 w-72 h-72 bg-neutral-50 dark:bg-neutral-900 rounded-full filter blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            What Our Patients Say
          </h2>
          <div className="h-0.5 w-12 bg-[var(--color-accent)] mx-auto mt-4" />
        </div>

        {/* Testimonial Box */}
        <div className="relative min-h-[300px] flex items-center justify-center px-4 sm:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Giant Quote Icon */}
              <Quote className="w-12 h-12 text-[var(--color-accent)]/15 mb-6" />

              {/* Star Ratings */}
              <div className="flex justify-center gap-1 text-amber-400 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed italic max-w-2xl mb-8">
                "{current.review}"
              </blockquote>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50">
                  <img
                    src={current.imageUrl}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-left">
                  <cite className="not-italic font-bold text-sm text-neutral-900 dark:text-white block">
                    {current.name}
                  </cite>
                  <span className="text-3xs text-neutral-450 dark:text-neutral-500 font-medium">
                    {current.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Nav Arrows */}
        {state.testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200/40 dark:border-neutral-700/40 flex items-center justify-center text-neutral-700 dark:text-neutral-350 cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Pagination Bullets */}
            <div className="flex items-center gap-2">
              {state.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-6 bg-[var(--color-accent)]' : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200/40 dark:border-neutral-700/40 flex items-center justify-center text-neutral-700 dark:text-neutral-350 cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
