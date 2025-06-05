import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialSection from '@/components/home/TestimonialSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const HomePage: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <Head>
        <title>{t('home.meta_title')}</title>
        <meta name="description" content={t('home.meta_description')} />
        <meta property="og:title" content={t('home.meta_title')} />
        <meta property="og:description" content={t('home.meta_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <TestimonialSection />
        <NewsletterSection />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
};

export default HomePage;
