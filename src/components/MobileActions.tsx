import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const MobileActions: React.FC = () => {
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

  // Format WhatsApp Link
  const whatsappUrl = `https://wa.me/${state.clinicInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi,%20I'd%20like%20to%20inquire%20about%20your%20treatments%20at%20${encodeURIComponent(state.clinicInfo.name)}.`;
  const callUrl = `tel:${state.clinicInfo.callNumber}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 px-4 pb-4 pt-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border-t border-neutral-200/40 shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={callUrl}
          className="flex flex-col items-center justify-center gap-1 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 py-2.5 px-2 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 transition-all font-medium text-xs shadow-sm active:scale-95"
        >
          <Phone className="w-5 h-5 text-[var(--color-accent)] fill-[var(--color-accent)]/10" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 py-2.5 px-2 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 transition-all font-medium text-xs shadow-sm active:scale-95"
        >
          <MessageCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
          <span>WhatsApp</span>
        </a>

        {/* Book Button */}
        <a
          href="#booking"
          onClick={handleBookClick}
          className="flex flex-col items-center justify-center gap-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-2.5 px-2 rounded-2xl transition-all font-medium text-xs shadow-md shadow-[var(--color-accent)]/15 active:scale-95"
        >
          <Calendar className="w-5 h-5 text-white" />
          <span>Book Now</span>
        </a>
      </div>
    </div>
  );
};
