
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-6">{t('emptyFav')}</h1>
          <p className="text-gray-600 mb-8">{t('continueShopping')}</p>
          <Button onClick={() => navigate('/catalog')} className="bg-gold hover:bg-gold-dark text-black">
            {t('catalog')}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-8">{t('favItems')}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="outline" 
            onClick={clearFavorites}
            className="text-red-500 border-red-500 hover:bg-red-50"
          >
            {t('clearCart')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
