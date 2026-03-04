import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FavoriteItem } from '../types';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorited: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('diffin_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('diffin_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.productId === item.productId);
      return exists ? prev.filter(f => f.productId !== item.productId) : [...prev, item];
    });
  };

  const isFavorited = (productId: string) => favorites.some(f => f.productId === productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
