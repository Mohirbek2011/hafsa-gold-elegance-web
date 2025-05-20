
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useProducts } from '@/contexts/ProductContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Catalog: React.FC = () => {
  const { products } = useProducts();
  const { t } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
  const categoriesTranslated = {
    "All": t('all'),
    "Rings": t('rings'),
    "Necklaces": t('necklaces'),
    "Earrings": t('earrings'),
    "Bracelets": t('bracelets')
  };

  // Соответствие между категориями на английском и на других языках
  const categoryMapping: Record<string, string> = {
    'Кольца': 'Rings',
    'Серьги': 'Earrings',
    'Ожерелья': 'Necklaces',
    'Браслеты': 'Bracelets',
    'Rings': 'Rings',
    'Earrings': 'Earrings',
    'Necklaces': 'Necklaces',
    'Bracelets': 'Bracelets',
  };

  // Filter products based on selected category and price range
  const filteredProducts = products.filter(
    (product) => 
      (selectedCategory === "All" || categoryMapping[product.category] === selectedCategory) && 
      (product.price >= priceRange[0] && product.price <= priceRange[1])
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    // Default sorting (featured)
    return 0;
  });

  return (
    <Layout>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium">{t('catalog')}</h1>
          <p className="text-gray-600 mt-2">
            {t('featured')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4 space-y-8">
            <div>
              <h3 className="font-medium mb-4">{t('categories')}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label 
                    key={category} 
                    className="flex items-center cursor-pointer"
                  >
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2 accent-gold"
                    />
                    <span className={selectedCategory === category ? "text-gold" : "text-gray-700"}>
                      {categoriesTranslated[category as keyof typeof categoriesTranslated]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">{t('priceRange')}</h3>
              <Slider 
                defaultValue={[0, 3000]} 
                max={3000} 
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">{t('sortBy')}</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="featured">{t('featured_sort')}</option>
                <option value="price-asc">{t('price_asc')}</option>
                <option value="price-desc">{t('price_desc')}</option>
              </select>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Товары не найдены.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
