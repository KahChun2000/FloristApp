import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/products';
import { Appointment, defaultAppointment } from '../data/appointment';
import { messages } from '../data/messages';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Settings = {
  notifications: boolean;
  promoEmails: boolean;
};

const defaultSettings: Settings = {
  notifications: true,
  promoEmails: false,
};

type AppState = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity: number) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  likedPostIds: string[];
  toggleLike: (postId: string) => void;
  readMessageIds: string[];
  unreadCount: number;
  markRead: (messageId: string) => void;
  markAllRead: () => void;
  appointment: Appointment | null;
  setAppointment: (appointment: Appointment | null) => void;
  settings: Settings;
  toggleSetting: (key: keyof Settings) => void;
  resetAll: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [readMessageIds, setReadMessageIds] = useState<string[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(
    defaultAppointment,
  );
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  function addToCart(product: Product, quantity: number) {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      changeQuantity(product.id, existing.quantity + quantity);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  }

  function changeQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId: string) {
    setCart(cart.filter(item => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleLike(postId: string) {
    if (likedPostIds.includes(postId)) {
      setLikedPostIds(likedPostIds.filter(id => id !== postId));
    } else {
      setLikedPostIds([...likedPostIds, postId]);
    }
  }

  function markRead(messageId: string) {
    if (!readMessageIds.includes(messageId)) {
      setReadMessageIds([...readMessageIds, messageId]);
    }
  }

  function markAllRead() {
    setReadMessageIds(messages.map(item => item.id));
  }

  function toggleSetting(key: keyof Settings) {
    setSettings({ ...settings, [key]: !settings[key] });
  }

  function resetAll() {
    setCart([]);
    setLikedPostIds([]);
    setReadMessageIds([]);
    setAppointment(defaultAppointment);
    setSettings(defaultSettings);
  }

  let cartCount = 0;
  cart.forEach(item => {
    cartCount = cartCount + item.quantity;
  });

  const unreadCount = messages.filter(
    item => !readMessageIds.includes(item.id),
  ).length;

  const value: AppState = {
    cart,
    cartCount,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    likedPostIds,
    toggleLike,
    readMessageIds,
    unreadCount,
    markRead,
    markAllRead,
    appointment,
    setAppointment,
    settings,
    toggleSetting,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return value;
}
