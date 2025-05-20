
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample product data
const products = [
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
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4">Featured Pieces</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover our most coveted gold jewelry pieces, each one a testament to exceptional craftsmanship and timeless beauty.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-gold hover:bg-gold-dark text-black">
            <Link to="/catalog">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
