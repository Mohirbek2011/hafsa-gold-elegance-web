
import React from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6">About Hafsa Gold</h1>
          <p className="text-lg text-gray-600 mb-12">
            A tradition of excellence in gold jewelry since 1997
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1589365252845-092198ba5334?q=80&w=1374&auto=format&fit=crop" 
                alt="Jewelry workshop" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-serif mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 1997 by master goldsmith Hafsa Rahman, our journey began with a small workshop and a big dream: to create gold jewelry that celebrates both tradition and innovation.
              </p>
              <p className="text-gray-700">
                Today, Hafsa Gold has grown into a prestigious jewelry house known for exceptional craftsmanship and timeless designs. Each piece we create carries forward our founder's legacy of excellence and passion.
              </p>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-white">C</span>
                </div>
                <h3 className="font-medium text-xl mb-3">Craftsmanship</h3>
                <p className="text-gray-600">
                  We honor age-old techniques while embracing modern innovation to create jewelry of exceptional quality.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-white">Q</span>
                </div>
                <h3 className="font-medium text-xl mb-3">Quality</h3>
                <p className="text-gray-600">
                  We use only the finest materials and uphold the highest standards in everything we create.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif text-white">I</span>
                </div>
                <h3 className="font-medium text-xl mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with complete transparency and ethical sourcing practices throughout our supply chain.
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-6">Our Craftsmanship Process</h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="font-medium text-xl mb-2">Design</h3>
                  <p className="text-gray-600">
                    Our designs begin with hand sketches, where creativity flows freely before being refined into detailed technical drawings.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <img 
                    src="https://images.unsplash.com/photo-1616321749757-c58d3182b4fd?q=80&w=1374&auto=format&fit=crop" 
                    alt="Jewelry design process" 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-1/3">
                  <h3 className="font-medium text-xl mb-2">Creation</h3>
                  <p className="text-gray-600">
                    Our master craftspeople transform raw gold into exquisite pieces using techniques passed down through generations.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <img 
                    src="https://images.unsplash.com/photo-1600701342723-ece93581398b?q=80&w=1374&auto=format&fit=crop" 
                    alt="Jewelry making process" 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="font-medium text-xl mb-2">Finishing</h3>
                  <p className="text-gray-600">
                    Each piece undergoes meticulous polishing and quality control to ensure it meets our exacting standards.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <img 
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop" 
                    alt="Jewelry finishing process" 
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-serif mb-4">Visit Our Showroom</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              We invite you to experience Hafsa Gold in person. Visit our showroom to explore our collections and speak with our knowledgeable team.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
