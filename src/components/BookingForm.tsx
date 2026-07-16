import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Mail, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const BookingForm: React.FC = () => {
  const { state, addLead } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    preferredDate: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.treatment || !formData.preferredDate) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        treatment: formData.treatment,
        preferredDate: formData.preferredDate,
        message: formData.message
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear form
      setFormData({
        name: '',
        phone: '',
        email: '',
        treatment: '',
        preferredDate: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="booking" className="py-24 bg-white dark:bg-neutral-950 overflow-hidden relative">
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Info Column */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
              Reservations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
              Schedule Your Premium Treatment
            </h2>
            <div className="h-0.5 w-16 bg-[var(--color-accent)] mb-6" />
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Submit your preferred date and selected clinical concern. Our patient coordinator will reach out to you within 2 business hours via phone or message to lock in your calendar slot.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-350 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Instant Callback</h4>
                  <p className="text-2xs text-neutral-450 dark:text-neutral-500">Fast contact mapping within 2 hours.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-350 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Certified Safety</h4>
                  <p className="text-2xs text-neutral-450 dark:text-neutral-500">Fully sanitized premium clinical suites.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card Column */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-[32px] border border-neutral-100 dark:border-neutral-800 p-8 sm:p-10 shadow-lg relative">
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white text-left mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                <span>Appointment Form</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="booking-name" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      id="booking-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white"
                    />
                  </div>
                </div>

                {/* Contact grid (Phone / Email) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="booking-phone" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="booking-email" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Treatment / Date grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="treatment-select" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Selected Concern *</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <select
                        id="treatment-select"
                        name="treatment"
                        required
                        value={formData.treatment}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-neutral-800 dark:text-white appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Treatment</option>
                        {state.services.map(s => (
                          <option key={s.id} value={s.title} className="text-neutral-800 dark:text-neutral-100">
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 font-bold">
                        ▾
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="booking-date" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Preferred Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        id="booking-date"
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="booking-message" className="text-2xs font-bold text-neutral-500 uppercase tracking-wider">Personal Message / Note</label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your skin type, condition history, or preferred contact time..."
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white resize-none"
                  />
                </div>

                {/* Submit Trigger */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-4 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-md shadow-[var(--color-accent)]/15 hover:shadow-[var(--color-accent)]/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              </form>

              {/* Success Modal Drawer */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 dark:bg-neutral-900/95 rounded-[32px] p-8 flex flex-col items-center justify-center text-center z-25"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    
                    <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                      Booking Submitted!
                    </h4>
                    
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-8 leading-relaxed">
                      Thank you. We have saved your reservation. Our clinical receptionist will contact you on your mobile number within 2 business hours.
                    </p>
                    
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-neutral-950 text-white dark:bg-neutral-850 hover:opacity-90 transition-all font-semibold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
