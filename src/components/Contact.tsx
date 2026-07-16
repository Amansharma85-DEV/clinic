import React from 'react';
import { MapPin, Phone, Clock, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Contact: React.FC = () => {
  const { state } = useCMS();

  const whatsappUrl = `https://wa.me/${state.clinicInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi`;
  const callUrl = `tel:${state.clinicInfo.callNumber}`;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Contact & Directions
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Reach out via call, message, or drop by our premium clinical location for a detailed dermatological assessment.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info cards (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            {/* Info Items List */}
            <div className="space-y-6">
              {/* Address */}
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Our Location</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {state.clinicInfo.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Working Hours</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                    {state.clinicInfo.workingHours}
                  </p>
                </div>
              </div>

              {/* Call/Email */}
              <div className="p-6 bg-neutral-50 dark:bg-neutral-900/60 rounded-3xl border border-neutral-100 dark:border-neutral-800/80 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">Hotlines & Email</h4>
                  <a href={callUrl} className="text-xs text-neutral-500 hover:text-[var(--color-accent)] dark:text-neutral-400 block transition-colors">
                    Phone: {state.clinicInfo.phone}
                  </a>
                  <a href={`mailto:${state.clinicInfo.email}`} className="text-xs text-neutral-500 hover:text-[var(--color-accent)] dark:text-neutral-400 block transition-colors">
                    Email: {state.clinicInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Row */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <a
                href={callUrl}
                className="flex items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-neutral-850 dark:text-neutral-100 transition-all text-center"
              >
                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Call Hotline</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-center shadow-lg shadow-emerald-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map Section (Right) */}
          <div className="lg:col-span-7 h-80 lg:h-auto min-h-[350px] rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800 shadow-md bg-neutral-100 dark:bg-neutral-900">
            {state.clinicInfo.googleMapsLink ? (
              <iframe
                title="Clinic Location Map"
                src={state.clinicInfo.googleMapsLink}
                className="w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-180 opacity-90 hover:grayscale-0 dark:hover:invert-0 dark:hover:hue-rotate-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-450">No map embed source provided.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
