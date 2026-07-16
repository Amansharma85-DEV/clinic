import React, { useState, useRef, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const BeforeAfter: React.FC = () => {
  const { state } = useCMS();
  const [activeCategory, setActiveCategory] = useState('Acne');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Categories list
  const categories = Array.from(new Set(state.beforeAfter.map(item => item.category)));

  // Selected item
  const currentItem = state.beforeAfter.find(item => item.category === activeCategory) || state.beforeAfter[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };


  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-24 bg-neutral-50 dark:bg-neutral-900/40 select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Before & After Gallery
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Real patient clinical transformations. Slide the divider to inspect the dermal regeneration and pigment clearance.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSliderPosition(50); // reset position
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[var(--color-accent)] text-white shadow-md'
                  : 'bg-white dark:bg-neutral-850 text-neutral-600 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Comparison Slider Container */}
        {currentItem ? (
          <div className="max-w-2xl mx-auto relative flex flex-col items-center">
            {/* The Slider Screen */}
            <div
              ref={containerRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
              onTouchMove={(e) => isDragging.current && handleMove(e.touches[0].clientX)}
              className="w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl relative cursor-ew-resize border border-white/20 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-800 touch-none"
            >
              {/* BEFORE IMAGE (Full Background) */}
              <img
                src={currentItem.beforeImage}
                alt="Before treatment"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              <span className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/50 text-white text-3xs uppercase font-bold rounded-full tracking-wide pointer-events-none">
                Before
              </span>

              {/* AFTER IMAGE (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.afterImage}
                  alt="After treatment"
                  className="absolute inset-0 w-full h-full object-cover max-w-none select-none pointer-events-none"
                  style={{
                    width: containerRef.current?.getBoundingClientRect().width || '600px',
                    height: containerRef.current?.getBoundingClientRect().height || '450px'
                  }}
                />
                <span className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-[var(--color-accent)] text-white text-3xs uppercase font-bold rounded-full tracking-wide pointer-events-none">
                  After
                </span>
              </div>

              {/* Slider Bar Divider Line */}
              <div
                className="absolute inset-y-0 z-35 w-0.5 bg-white shadow-xl cursor-ew-resize slider-handle pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex items-center justify-center">
                  <Layers className="w-4 h-4 text-[var(--color-accent)] transform rotate-90" />
                </div>
              </div>
            </div>
            
            <p className="text-3xs text-neutral-400 mt-4 flex items-center gap-1.5">
              <span>Drag the center button to compare</span>
            </p>
          </div>
        ) : (
          <div className="text-neutral-500 py-12 text-center text-sm">No before/after images uploaded.</div>
        )}
      </div>
    </section>
  );
};
