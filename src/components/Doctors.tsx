import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Award, Briefcase } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Doctors: React.FC = () => {
  const { state } = useCMS();

  const handleBookDoctor = (docName: string) => {
    const target = document.querySelector('#booking');
    if (target) {
      // Find message input and write "Consultation with [doctor name]"
      const messageInput = document.getElementById('booking-message') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.value = `I would like to schedule a consultation with ${docName}.`;
        // Trigger synthetic change event so React form state updates
        const event = new Event('input', { bubbles: true });
        messageInput.dispatchEvent(event);
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
    <section id="doctors" className="py-24 bg-neutral-50 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 inline-block">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Meet Our Certified Dermatologists
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            A medical group dedicated to providing rigorous diagnostic evaluations and customized aesthetic restoration procedures.
          </p>
        </div>

        {/* Doctors Layout */}
        <div className="flex flex-wrap justify-center gap-8">
          {state.doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full md:max-w-xl bg-white dark:bg-neutral-800 rounded-[32px] border border-neutral-100 dark:border-neutral-750 shadow-sm hover:shadow-lg transition-all overflow-hidden grid grid-cols-1 sm:grid-cols-12"
            >
              {/* Left Portrait Image */}
              <div className="sm:col-span-5 h-64 sm:h-auto relative bg-neutral-150">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Right Content details */}
              <div className="sm:col-span-7 p-8 text-left flex flex-col justify-between">
                <div>
                  {/* Name & Qualification */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--color-accent)] mb-4 leading-relaxed">
                    {doctor.qualification}
                  </p>

                  <div className="h-px bg-neutral-100 dark:bg-neutral-700/80 mb-4" />

                  {/* Specific details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5 text-xs">
                      <Briefcase className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Specialization: </span>
                        <span className="text-neutral-500 dark:text-neutral-400">{doctor.specialization}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs">
                      <Award className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Experience: </span>
                        <span className="text-neutral-500 dark:text-neutral-400">{doctor.experience}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs">
                      <Globe className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Languages: </span>
                        <span className="text-neutral-500 dark:text-neutral-400">{doctor.languages}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Trigger */}
                <button
                  onClick={() => handleBookDoctor(doctor.name)}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
