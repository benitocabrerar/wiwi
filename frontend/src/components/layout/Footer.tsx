import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { useUI } from '@/context/UIContext';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const { isDarkMode } = useUI();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-100 dark:bg-secondary-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Logo e información */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-40 h-10">
                <Image
                  src={isDarkMode ? "/images/logo-light.svg" : "/images/logo-dark.svg"}
                  alt="TiendaOnline"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              {t('footer.description')}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" />
                <span className="text-secondary-600 dark:text-secondary-400">
                  {t('footer.address')}
                </span>
              </div>
              
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <a 
                  href="tel:+593987654321" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  +593 98 765 4321
                </a>
              </div>
              
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <a 
                  href="mailto:info@tiendaonline.com" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@tiendaonline.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              {t('footer.quick_links')}
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.products')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.categories')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/deals" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.deals')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Información */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              {t('footer.information')}
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.terms_of_service')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping-policy" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.shipping_policy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/return-policy" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.return_policy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 4: Newsletter y redes sociales */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              {t('footer.stay_connected')}
            </h3>
            
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              {t('footer.social_description')}
            </p>
            
            {/* Redes sociales */}
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary-200 dark:bg-secondary-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 text-secondary-700 dark:text-secondary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary-200 dark:bg-secondary-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 text-secondary-700 dark:text-secondary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary-200 dark:bg-secondary-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 text-secondary-700 dark:text-secondary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary-200 dark:bg-secondary-700 hover:bg-primary-100 dark:hover:bg-primary-900 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 text-secondary-700 dark:text-secondary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Métodos de pago */}
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
              {t('footer.payment_methods')}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-white p-1 rounded shadow-sm">
                <Image src="/images/payment/visa.svg" alt="Visa" width={40} height={25} />
              </div>
              <div className="bg-white p-1 rounded shadow-sm">
                <Image src="/images/payment/mastercard.svg" alt="Mastercard" width={40} height={25} />
              </div>
              <div className="bg-white p-1 rounded shadow-sm">
                <Image src="/images/payment/amex.svg" alt="American Express" width={40} height={25} />
              </div>
              <div className="bg-white p-1 rounded shadow-sm">
                <Image src="/images/payment/paypal.svg" alt="PayPal" width={40} height={25} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-secondary-200 dark:border-secondary-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} TiendaOnline. {t('footer.all_rights_reserved')}
            </p>
            
            <div className="flex space-x-4 text-sm">
              <Link 
                href="/sitemap" 
                className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t('footer.sitemap')}
              </Link>
              
              <a 
                href="https://github.com/tiendaonline" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
              >
                {t('footer.developer')}
                <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
