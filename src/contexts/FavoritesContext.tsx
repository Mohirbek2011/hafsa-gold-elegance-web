
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (product: FavoriteItem) => {
    setFavorites(prevFavorites => {
      const existingItem = prevFavorites.find(item => item.id === product.id);
      if (existingItem) {
        return prevFavorites;
      } else {
        toast.success("Товар добавлен в избранное");
        return [...prevFavorites, product];
      }
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
    toast("Товар удален из избранного");
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast("Список избранного очищен");
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      clearFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
