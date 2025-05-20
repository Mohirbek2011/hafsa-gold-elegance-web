
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-300">
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-transparent bg-clip-text gold-gradient">HAFSA GOLD</h3>
            <p className="text-gray-600 mb-6">
              Exquisite jewelry crafted with passion and precision, celebrating the beauty of gold since 1997.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gold-dark transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-dark transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gold-dark transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/catalog/rings" className="text-gray-600 hover:text-gold transition-colors">Rings</Link></li>
              <li><Link to="/catalog/necklaces" className="text-gray-600 hover:text-gold transition-colors">Necklaces</Link></li>
              <li><Link to="/catalog/earrings" className="text-gray-600 hover:text-gold transition-colors">Earrings</Link></li>
              <li><Link to="/catalog/bracelets" className="text-gray-600 hover:text-gold transition-colors">Bracelets</Link></li>
              <li><Link to="/catalog/exclusive" className="text-gray-600 hover:text-gold transition-colors">Exclusive Pieces</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">About</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/about/craftsmanship" className="text-gray-600 hover:text-gold transition-colors">Craftsmanship</Link></li>
              <li><Link to="/about/sustainability" className="text-gray-600 hover:text-gold transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">Contact</h4>
            <address className="not-italic">
              <div className="flex items-center mb-3">
                <Mail size={16} className="mr-2 text-gold" />
                <a href="mailto:info@hafsagold.com" className="text-gray-600 hover:text-gold transition-colors">info@hafsagold.com</a>
              </div>
              <div className="flex items-center mb-3">
                <Phone size={16} className="mr-2 text-gold" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-gold transition-colors">+123 456 7890</a>
              </div>
              <p className="text-gray-600 mt-4">
                123 Gold Avenue<br />
                Luxury District, City<br />
                Country, 12345
              </p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Hafsa Gold. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Shipping</a>
            <a href="#" className="hover:text-gold transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
