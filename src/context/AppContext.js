import React, { createContext, useContext, useState } from 'react';

import { defaultAppointment } from '../data/appointment';
import { messages } from '../data/messages';

const defaultSettings = {
  notifications: true,
  promoEmails: false,
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [readMessageIds, setReadMessageIds] = useState([]);
  const [appointment, setAppointment] = useState(defaultAppointment);
  const [settings, setSettings] = useState(defaultSettings);

  function addToCart(product, quantity) {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      changeQuantity(product.id, existing.quantity + quantity);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  }

  function changeQuantity(productId, quantity) {
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

  function removeFromCart(productId) {
    setCart(cart.filter(item => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleLike(postId) {
    if (likedPostIds.includes(postId)) {
      setLikedPostIds(likedPostIds.filter(id => id !== postId));
    } else {
      setLikedPostIds([...likedPostIds, postId]);
    }
  }

  function markRead(messageId) {
    if (!readMessageIds.includes(messageId)) {
      setReadMessageIds([...readMessageIds, messageId]);
    }
  }

  function markAllRead() {
    setReadMessageIds(messages.map(item => item.id));
  }

  function toggleSetting(key) {
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

  const value = {
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
