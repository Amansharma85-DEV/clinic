import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    // Simulate validation
    setTimeout(() => {
      // Default passcode: admin
      if (password === 'admin') {
        onLoginSuccess();
      } else {
        setError('Incorrect administrator passcode. Please try again.');
        setIsLoggingIn(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 dark:bg-neutral-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-[32px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800 shadow-2xl p-8 sm:p-10 text-left"
      >
        {/* Branding header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white mb-4 shadow-lg shadow-[var(--color-accent)]/20 animate-pulse-slow">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
            Clinic Administrator Sign-In
          </h3>
          <p className="text-3xs text-neutral-450 dark:text-neutral-500 uppercase tracking-widest font-bold">
            Aura Clinic CMS Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-2xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
              Admin Password / Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode (use 'admin')"
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200/60 dark:border-neutral-700/60 focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/20 outline-none text-sm dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/50 dark:border-rose-900/30 flex items-start gap-2.5 text-rose-600 dark:text-rose-450 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="py-3.5 border border-neutral-200 dark:border-neutral-750 text-neutral-600 dark:text-neutral-350 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className="py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
