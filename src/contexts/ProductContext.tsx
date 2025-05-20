
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AdminProduct } from '@/pages/admin/AdminPanel';

export interface Product extends Omit<AdminProduct, 'id'> {
  id: string;
  isNew?: boolean;
}

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

// Начальные товары для каталога
const initialProducts: Product[] = [
  {
    id: 'elegant-gold-ring-1',
    name: 'Элегантное золотое кольцо',
    price: 1200,
    imageSrc: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?q=80&w=1480&auto=format&fit=crop',
    category: 'Кольца',
    weight: 5.2,
    purity: '585',
    size: '16.5',
    isNew: true,
  },
  {
    id: 'diamond-gold-necklace-1',
    name: 'Золотое ожерелье с бриллиантами',
    price: 2400,
    imageSrc: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1470&auto=format&fit=crop',
    category: 'Ожерелья',
    weight: 12.5,
    purity: '750',
    size: '',
  },
  {
    id: 'pearl-drop-earrings-1',
    name: 'Жемчужные серьги',
    price: 950,
    imageSrc: 'https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?q=80&w=1470&auto=format&fit=crop',
    category: 'Серьги',
    weight: 3.8,
    purity: '585',
    size: '',
    isNew: true,
  },
  {
    id: 'twisted-gold-bracelet-1',
    name: 'Плетеный золотой браслет',
    price: 1850,
    imageSrc: 'https://images.unsplash.com/photo-1601121141223-1758eac6b53b?q=80&w=1470&auto=format&fit=crop',
    category: 'Браслеты',
    weight: 8.9,
    purity: '750',
    size: '19',
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === product.id ? product : p)
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
