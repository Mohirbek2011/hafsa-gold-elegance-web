
import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 'rings',
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop',
  },
];

const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4">Our Collections</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Browse through our carefully curated collections of fine jewelry, each piece crafted with exceptional attention to detail.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.id}
              to={`/catalog/${collection.id}`}
              className="group relative overflow-hidden rounded-lg hover-lift"
            >
              <div className="aspect-square">
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-serif font-medium text-white">{collection.name}</h3>
                <p className="text-white/80 text-sm mt-2 group-hover:underline decoration-gold underline-offset-4">
                  View Collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
