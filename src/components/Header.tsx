
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <header className="w-full bg-white border-b border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                <Link to="/" className="text-lg font-medium hover:text-gold transition-colors">{t('home')}</Link>
                <Link to="/catalog" className="text-lg font-medium hover:text-gold transition-colors">{t('catalog')}</Link>
                <Link to="/about" className="text-lg font-medium hover:text-gold transition-colors">{t('about')}</Link>
                <Link to="/contact" className="text-lg font-medium hover:text-gold transition-colors">{t('contact')}</Link>
                <Link to="/favorites" className="text-lg font-medium hover:text-gold transition-colors">{t('favorites')}</Link>
                <div className="mt-4">
                  <LanguageSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text gold-gradient tracking-wider">
                HAFSA GOLD
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">{t('home')}</Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-gold transition-colors">{t('catalog')}</Link>
            <Link to="/about" className="text-sm font-medium hover:text-gold transition-colors">{t('about')}</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-gold transition-colors">{t('contact')}</Link>
            <Link to="/favorites" className="text-sm font-medium hover:text-gold transition-colors">{t('favorites')}</Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('search')}</span>
            </Button>
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
                <span className="sr-only">{t('favorites')}</span>
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-xs text-black rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">{t('cart')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
