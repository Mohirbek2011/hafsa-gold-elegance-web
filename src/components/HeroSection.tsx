
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601121141461-c7b8833e021b?q=80&w=1470&auto=format&fit=crop')" }}
      ></div>
      
      <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in">
          Timeless Elegance
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Discover our exquisite collection of handcrafted gold jewelry, made with passion and precision since 1997.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button asChild className="bg-gold hover:bg-gold-dark text-black">
            <Link to="/catalog">Explore Collection</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
