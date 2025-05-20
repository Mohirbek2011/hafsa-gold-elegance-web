
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

// Sample product data - in a real app this would come from an API
const allProducts = [
  {
    id: 'elegant-gold-ring-1',
    name: 'Elegant Gold Ring',
    price: 1200,
    imageSrc: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=1480&auto=format&fit=crop',
    category: 'Rings',
    isNew: true,
  },
  {
    id: 'diamond-gold-necklace-1',
    name: 'Diamond Gold Necklace',
    price: 2400,
    imageSrc: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1470&auto=format&fit=crop',
    category: 'Necklaces',
  },
  {
    id: 'pearl-drop-earrings-1',
    name: 'Pearl Drop Earrings',
    price: 950,
    imageSrc: 'https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?q=80&w=1470&auto=format&fit=crop',
    category: 'Earrings',
    isNew: true,
  },
  {
    id: 'twisted-gold-bracelet-1',
    name: 'Twisted Gold Bracelet',
    price: 1850,
    imageSrc: 'https://images.unsplash.com/photo-1601121141223-1758eac6b53b?q=80&w=1470&auto=format&fit=crop',
    category: 'Bracelets',
  },
  {
    id: 'sapphire-gold-ring-1',
    name: 'Sapphire Gold Ring',
    price: 1800,
    imageSrc: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop',
    category: 'Rings',
  },
  {
    id: 'elegant-chain-necklace-1',
    name: 'Elegant Chain Necklace',
    price: 2100,
    imageSrc: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop',
    category: 'Necklaces',
  },
  {
    id: 'gold-hoop-earrings-1',
    name: 'Gold Hoop Earrings',
    price: 850,
    imageSrc: 'https://images.unsplash.com/photo-1631982690223-8aa5d2f5de7c?q=80&w=1632&auto=format&fit=crop',
    category: 'Earrings',
  },
  {
    id: 'diamond-gold-bracelet-1',
    name: 'Diamond Gold Bracelet',
    price: 2250,
    imageSrc: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1470&auto=format&fit=crop',
    category: 'Bracelets',
  },
];

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on selected category and price range
  const filteredProducts = allProducts.filter(
    (product) => 
      (selectedCategory === "All" || product.category === selectedCategory) && 
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
          <h1 className="text-3xl md:text-4xl font-serif font-medium">Our Collection</h1>
          <p className="text-gray-600 mt-2">
            Discover our range of exquisite gold jewelry pieces
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4 space-y-8">
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
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
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
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
              <h3 className="font-medium mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
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
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
