import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const NewsletterSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Validar email
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage(t('newsletter.error_empty'));
      return;
    }
    
    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMessage(t('newsletter.error_invalid'));
      return;
    }
    
    // Simular envío
    setStatus('loading');
    
    try {
      // En una aplicación real, aquí haríamos una petición al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular éxito
      setStatus('success');
      setEmail('');
    } catch (error) {
      // Simular error
      setStatus('error');
      setErrorMessage(t('newsletter.error_generic'));
    }
  };
  
  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeIcon className="h-16 w-16 mx-auto text-white/90 mb-6" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t('newsletter.description')}
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder={t('newsletter.placeholder')}
                    className="w-full px-4 py-3 rounded-lg text-secondary-900 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-white"
                    disabled={status === 'loading' || status === 'success'}
                  />
                  
                  {status === 'error' && (
                    <div className="absolute -bottom-6 left-0 text-xs text-red-200 flex items-center">
                      <XCircleIcon className="h-4 w-4 mr-1" />
                      {errorMessage}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    status === 'success'
                      ? 'bg-green-500 text-white cursor-default'
                      : status === 'loading'
                        ? 'bg-primary-700 text-white/70 cursor-wait'
                        : 'bg-white text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('newsletter.subscribing')}
                    </span>
                  ) : status === 'success' ? (
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      {t('newsletter.success')}
                    </span>
                  ) : (
                    t('newsletter.subscribe')
                  )}
                </button>
              </div>
            </form>
            
            <p className="mt-4 text-sm text-white/60">
              {t('newsletter.privacy_notice')}
            </p>
            
            {/* Beneficios */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('newsletter.benefit1_title')}
                </h3>
                <p className="text-white/70">
                  {t('newsletter.benefit1_description')}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('newsletter.benefit2_title')}
                </h3>
                <p className="text-white/70">
                  {t('newsletter.benefit2_description')}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('newsletter.benefit3_title')}
                </h3>
                <p className="text-white/70">
                  {t('newsletter.benefit3_description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
