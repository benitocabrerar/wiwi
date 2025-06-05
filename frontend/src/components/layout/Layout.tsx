import React, { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { UIProvider } from '@/context/UIContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'TiendaOnline - Tu Tienda de Comercio Electrónico', 
  description = 'Encuentra los mejores productos con los mejores precios en nuestra tienda online.'
}) => {
  const { t } = useTranslation('common');
  
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">
            <Head>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Header />
            
            <div className="flex-grow">
              {children}
            </div>
            
            <Footer />
          </div>
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default Layout;
