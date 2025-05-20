
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'ru' | 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'ru': {
    'home': 'Главная',
    'catalog': 'Каталог',
    'about': 'О нас',
    'contact': 'Контакты',
    'cart': 'Корзина',
    'favorites': 'Избранное',
    'search': 'Поиск',
    'addToCart': 'В корзину',
    'removeFromCart': 'Удалить',
    'checkout': 'Оформить заказ',
    'totalPrice': 'Итого',
    'emptyCart': 'Ваша корзина пуста',
    'continueShopping': 'Продолжить покупки',
    'clearCart': 'Очистить корзину',
    'orderDetails': 'Детали заказа',
    'yourName': 'Ваше имя',
    'email': 'Email',
    'phone': 'Телефон',
    'address': 'Адрес доставки',
    'submitOrder': 'Оформить заказ',
    'orderSuccess': 'Заказ успешно оформлен!',
    'featured': 'Рекомендуемые товары',
    'viewAll': 'Смотреть все',
    'new': 'Новинка',
    'categories': 'Категории',
    'priceRange': 'Диапазон цен',
    'sortBy': 'Сортировать по',
    'featured_sort': 'Рекомендуемые',
    'price_asc': 'Цена: по возрастанию',
    'price_desc': 'Цена: по убыванию',
    'all': 'Все',
    'rings': 'Кольца',
    'necklaces': 'Ожерелья',
    'earrings': 'Серьги',
    'bracelets': 'Браслеты',
    'addToFav': 'Добавить в избранное',
    'removeFromFav': 'Удалить из избранного',
    'emptyFav': 'Ваш список избранного пуст',
    'favItems': 'Избранные товары',
  },
  'uz': {
    'home': 'Асосий',
    'catalog': 'Каталог',
    'about': 'Биз ҳақимизда',
    'contact': 'Алоқа',
    'cart': 'Сават',
    'favorites': 'Севимли',
    'search': 'Қидирув',
    'addToCart': 'Саватга',
    'removeFromCart': 'Ўчириш',
    'checkout': 'Буюртма бериш',
    'totalPrice': 'Жами',
    'emptyCart': 'Сизнинг саватингиз бўш',
    'continueShopping': 'Харидни давом эттириш',
    'clearCart': 'Саватни тозалаш',
    'orderDetails': 'Буюртма тафсилотлари',
    'yourName': 'Исмингиз',
    'email': 'Email',
    'phone': 'Телефон',
    'address': 'Етказиб бериш манзили',
    'submitOrder': 'Буюртма бериш',
    'orderSuccess': 'Буюртма муваффақиятли расмийлаштирилди!',
    'featured': 'Тавсия этилган маҳсулотлар',
    'viewAll': 'Ҳаммасини кўриш',
    'new': 'Янги',
    'categories': 'Категориялар',
    'priceRange': 'Нарх диапазони',
    'sortBy': 'Сортировка',
    'featured_sort': 'Тавсия этилган',
    'price_asc': 'Нарх: ўсиш бўйича',
    'price_desc': 'Нарх: камайиш бўйича',
    'all': 'Барча',
    'rings': 'Узуклар',
    'necklaces': 'Марваридлар',
    'earrings': 'Сирғалар',
    'bracelets': 'Билагузуклар',
    'addToFav': 'Севимлиларга қўшиш',
    'removeFromFav': 'Севимлилардан ўчириш',
    'emptyFav': 'Сизнинг севимли рўйхатингиз бўш',
    'favItems': 'Севимли маҳсулотлар',
  },
  'en': {
    'home': 'Home',
    'catalog': 'Catalog',
    'about': 'About Us',
    'contact': 'Contact',
    'cart': 'Cart',
    'favorites': 'Favorites',
    'search': 'Search',
    'addToCart': 'Add to Cart',
    'removeFromCart': 'Remove',
    'checkout': 'Checkout',
    'totalPrice': 'Total',
    'emptyCart': 'Your cart is empty',
    'continueShopping': 'Continue Shopping',
    'clearCart': 'Clear Cart',
    'orderDetails': 'Order Details',
    'yourName': 'Your Name',
    'email': 'Email',
    'phone': 'Phone',
    'address': 'Delivery Address',
    'submitOrder': 'Place Order',
    'orderSuccess': 'Order successfully placed!',
    'featured': 'Featured Products',
    'viewAll': 'View All',
    'new': 'New',
    'categories': 'Categories',
    'priceRange': 'Price Range',
    'sortBy': 'Sort By',
    'featured_sort': 'Featured',
    'price_asc': 'Price: Low to High',
    'price_desc': 'Price: High to Low',
    'all': 'All',
    'rings': 'Rings',
    'necklaces': 'Necklaces',
    'earrings': 'Earrings',
    'bracelets': 'Bracelets',
    'addToFav': 'Add to Favorites',
    'removeFromFav': 'Remove from Favorites',
    'emptyFav': 'Your favorites list is empty',
    'favItems': 'Favorite Items',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
