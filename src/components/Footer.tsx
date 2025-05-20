
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
              Изысканные ювелирные изделия, созданные со страстью и точностью, подчеркивающие красоту золота с 1997 года.
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
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">Коллекции</h4>
            <ul className="space-y-3">
              <li><Link to="/catalog/rings" className="text-gray-600 hover:text-gold transition-colors">Кольца</Link></li>
              <li><Link to="/catalog/necklaces" className="text-gray-600 hover:text-gold transition-colors">Ожерелья</Link></li>
              <li><Link to="/catalog/earrings" className="text-gray-600 hover:text-gold transition-colors">Серьги</Link></li>
              <li><Link to="/catalog/bracelets" className="text-gray-600 hover:text-gold transition-colors">Браслеты</Link></li>
              <li><Link to="/catalog/exclusive" className="text-gray-600 hover:text-gold transition-colors">Эксклюзивные изделия</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">О нас</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-gold transition-colors">Наша история</Link></li>
              <li><Link to="/about/craftsmanship" className="text-gray-600 hover:text-gold transition-colors">Мастерство</Link></li>
              <li><Link to="/about/sustainability" className="text-gray-600 hover:text-gold transition-colors">Устойчивое развитие</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gold transition-colors">Связаться с нами</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-semibold tracking-wider mb-6">Контакты</h4>
            <address className="not-italic">
              <div className="flex items-center mb-3">
                <Mail size={16} className="mr-2 text-gold" />
                <a href="mailto:info@hafsagold.com" className="text-gray-600 hover:text-gold transition-colors">info@hafsagold.com</a>
              </div>
              <div className="flex items-center mb-3">
                <Phone size={16} className="mr-2 text-gold" />
                <a href="tel:+998979449999" className="text-gray-600 hover:text-gold transition-colors">+998 97 944 9999</a>
              </div>
              <p className="text-gray-600 mt-4">
                Узбекистан, г. Ташкент<br />
                Чорсу Голд дўкони<br />
                Ориентир - Тохир Зухра мажмуаси
              </p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Hafsa Gold. Все права защищены.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gold transition-colors">Условия обслуживания</a>
            <a href="#" className="hover:text-gold transition-colors">Доставка</a>
            <a href="#" className="hover:text-gold transition-colors">Возврат</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
