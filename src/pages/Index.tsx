
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialsSection from '@/components/TestimonialsSection';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
