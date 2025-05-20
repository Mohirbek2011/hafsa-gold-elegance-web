
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'ru' | 'uz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Общие
    'featured': 'Избранные товары',
    'new': 'Новинка',
    'viewAll': 'Посмотреть все товары',
    'noProductsYet': 'На данный момент товары не загружены. Администратор скоро добавит новые товары.',
    'addToCart': 'Добавить в корзину',
    'addToFav': 'Добавить в избранное',
    'removeFromFav': 'Удалить из избранного',
    'clearCart': 'Очистить корзину',
    'continueShopping': 'Продолжить покупки',
    'submitOrder': 'Оформить заказ',
    'orderSuccess': 'Ваш заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.',
    'orderDetails': 'Детали заказа',

    // Категории
    'catalog': 'Каталог',
    'categories': 'Категории',
    'all': 'Все',
    'rings': 'Кольца',
    'necklaces': 'Ожерелья',
    'earrings': 'Серьги',
    'bracelets': 'Браслеты',

    // Корзина и товары
    'cart': 'Корзина',
    'emptyCart': 'Ваша корзина пуста',
    'totalPrice': 'Итоговая сумма',
    'quantity': 'Количество',

    // Избранное
    'favItems': 'Избранные товары',
    'emptyFav': 'У вас нет избранных товаров',

    // Фильтры
    'priceRange': 'Диапазон цен',
    'sortBy': 'Сортировать по',
    'featured_sort': 'Популярные',
    'price_asc': 'Цена (по возрастанию)',
    'price_desc': 'Цена (по убыванию)',

    // Контактная информация
    'yourName': 'Ваше имя',
    'email': 'Email',
    'phone': 'Номер телефона',
    'address': 'Адрес доставки',
    'message': 'Сообщение',
    'sendMessage': 'Отправить сообщение'
  },
  uz: {
    // Общие
    'featured': 'Tanlangan mahsulotlar',
    'new': 'Yangi',
    'viewAll': 'Barcha mahsulotlarni ko\'rish',
    'noProductsYet': 'Hozircha mahsulotlar yuklanmagan. Administrator tez orada yangi mahsulotlar qo\'shadi.',
    'addToCart': 'Savatga qo\'shish',
    'addToFav': 'Sevimlilar qo\'shish',
    'removeFromFav': 'Sevimlilardan olib tashlash',
    'clearCart': 'Savatni tozalash',
    'continueShopping': 'Xaridni davom ettirish',
    'submitOrder': 'Buyurtma berish',
    'orderSuccess': 'Buyurtmangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.',
    'orderDetails': 'Buyurtma tafsilotlari',

    // Категории
    'catalog': 'Katalog',
    'categories': 'Kategoriyalar',
    'all': 'Barchasi',
    'rings': 'Uzuklar',
    'necklaces': 'Marjonlar',
    'earrings': 'Sirg\'alar',
    'bracelets': 'Bilaguzuklar',

    // Корзина и товары
    'cart': 'Savat',
    'emptyCart': 'Savatingiz bo\'sh',
    'totalPrice': 'Jami summa',
    'quantity': 'Miqdori',

    // Избранное
    'favItems': 'Sevimli mahsulotlar',
    'emptyFav': 'Sevimli mahsulotlaringiz yo\'q',

    // Фильтры
    'priceRange': 'Narx oralig\'i',
    'sortBy': 'Saralash turi',
    'featured_sort': 'Mashhur',
    'price_asc': 'Narx (o\'sish bo\'yicha)',
    'price_desc': 'Narx (kamayish bo\'yicha)',

    // Контактная информация
    'yourName': 'Ismingiz',
    'email': 'Email',
    'phone': 'Telefon raqami',
    'address': 'Yetkazib berish manzili',
    'message': 'Xabar',
    'sendMessage': 'Xabar yuborish'
  },
  en: {
    // Общие
    'featured': 'Featured Products',
    'new': 'New',
    'viewAll': 'View All Products',
    'noProductsYet': 'No products are uploaded yet. The administrator will add new products soon.',
    'addToCart': 'Add to Cart',
    'addToFav': 'Add to Favorites',
    'removeFromFav': 'Remove from Favorites',
    'clearCart': 'Clear Cart',
    'continueShopping': 'Continue Shopping',
    'submitOrder': 'Submit Order',
    'orderSuccess': 'Your order has been successfully sent! We will contact you shortly.',
    'orderDetails': 'Order Details',

    // Категории
    'catalog': 'Catalog',
    'categories': 'Categories',
    'all': 'All',
    'rings': 'Rings',
    'necklaces': 'Necklaces',
    'earrings': 'Earrings',
    'bracelets': 'Bracelets',

    // Корзина и товары
    'cart': 'Cart',
    'emptyCart': 'Your cart is empty',
    'totalPrice': 'Total Price',
    'quantity': 'Quantity',

    // Избранное
    'favItems': 'Favorite Items',
    'emptyFav': 'You have no favorite items',

    // Фильтры
    'priceRange': 'Price Range',
    'sortBy': 'Sort By',
    'featured_sort': 'Featured',
    'price_asc': 'Price (Low to High)',
    'price_desc': 'Price (High to Low)',

    // Контактная информация
    'yourName': 'Your Name',
    'email': 'Email',
    'phone': 'Phone Number',
    'address': 'Delivery Address',
    'message': 'Message',
    'sendMessage': 'Send Message'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
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
