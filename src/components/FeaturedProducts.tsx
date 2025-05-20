
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const { t } = useLanguage();
  
  // Показываем до 4 продуктов на главной странице
  const featuredProducts = products.slice(0, 4);

  // Если нет продуктов, показываем сообщение
  if (featuredProducts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4">{t('featured')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            {t('noProductsYet')}
          </p>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-gold hover:bg-gold-dark text-black">
              <Link to="/catalog">{t('viewAll')}</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4">{t('featured')}</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {t('viewAll')}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-gold hover:bg-gold-dark text-black">
            <Link to="/catalog">{t('viewAll')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
