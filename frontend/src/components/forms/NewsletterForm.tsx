import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

const NewsletterForm: React.FC = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error(t('newsletter.errors.emptyEmail'));
      return;
    }

    try {
      setLoading(true);
      // Simulación de envío a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success(t('newsletter.success'));
      setEmail('');
    } catch (error) {
      toast.error(t('newsletter.errors.generic'));
      console.error('Newsletter subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.placeholder')}
          className="input w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary-500"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t('newsletter.loading')}
          </span>
        ) : (
          t('newsletter.subscribe')
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
