
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

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
                <Link to="/" className="text-lg font-medium hover:text-gold transition-colors">Главная</Link>
                <Link to="/catalog" className="text-lg font-medium hover:text-gold transition-colors">Каталог</Link>
                <Link to="/about" className="text-lg font-medium hover:text-gold transition-colors">О нас</Link>
                <Link to="/contact" className="text-lg font-medium hover:text-gold transition-colors">Контакты</Link>
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
            <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">Главная</Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-gold transition-colors">Каталог</Link>
            <Link to="/about" className="text-sm font-medium hover:text-gold transition-colors">О нас</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-gold transition-colors">Контакты</Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Поиск</span>
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-xs text-black rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Корзина</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
