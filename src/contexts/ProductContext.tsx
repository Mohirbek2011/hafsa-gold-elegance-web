
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

// Пустой массив товаров для начала
const initialProducts: Product[] = [];

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
