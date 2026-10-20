import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { AppProvider, useApp } from '../src/context/AppContext';
import { products } from '../src/data/products';

function renderApp() {
  return renderHook(() => useApp(), {
    wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
  });
}

test('adding the same product twice increments quantity', async () => {
  const { result } = await renderApp();
  await act(() => result.current.addToCart(products[0], 1));
  await act(() => result.current.addToCart(products[0], 2));
  expect(result.current.cart.length).toBe(1);
  expect(result.current.cart[0].quantity).toBe(3);
});

test('changing quantity to 0 removes the item', async () => {
  const { result } = await renderApp();
  await act(() => result.current.addToCart(products[0], 1));
  await act(() => result.current.changeQuantity(products[0].id, 0));
  expect(result.current.cart).toEqual([]);
});

test('cartCount adds up all quantities', async () => {
  const { result } = await renderApp();
  await act(() => result.current.addToCart(products[0], 2));
  await act(() => result.current.addToCart(products[1], 3));
  expect(result.current.cartCount).toBe(5);
});

test('removeFromCart and clearCart empty the cart', async () => {
  const { result } = await renderApp();
  await act(() => result.current.addToCart(products[0], 1));
  await act(() => result.current.addToCart(products[1], 1));
  await act(() => result.current.removeFromCart(products[0].id));
  expect(result.current.cart.length).toBe(1);
  await act(() => result.current.clearCart());
  expect(result.current.cart).toEqual([]);
});

test('toggleLike adds then removes a post', async () => {
  const { result } = await renderApp();
  await act(() => result.current.toggleLike('d1'));
  expect(result.current.likedPostIds).toEqual(['d1']);
  await act(() => result.current.toggleLike('d1'));
  expect(result.current.likedPostIds).toEqual([]);
});

test('markRead lowers the unread count', async () => {
  const { result } = await renderApp();
  expect(result.current.unreadCount).toBe(6);
  await act(() => result.current.markRead('i1'));
  await act(() => result.current.markRead('i1'));
  expect(result.current.unreadCount).toBe(5);
});

test('markAllRead sets unread count to 0', async () => {
  const { result } = await renderApp();
  await act(() => result.current.markAllRead());
  expect(result.current.unreadCount).toBe(0);
});

test('setAppointment(null) clears the appointment', async () => {
  const { result } = await renderApp();
  expect(result.current.appointment).not.toBeNull();
  await act(() => result.current.setAppointment(null));
  expect(result.current.appointment).toBeNull();
});

test('toggleSetting flips a setting', async () => {
  const { result } = await renderApp();
  expect(result.current.settings.notifications).toBe(true);
  await act(() => result.current.toggleSetting('notifications'));
  expect(result.current.settings.notifications).toBe(false);
});

test('resetAll restores the defaults', async () => {
  const { result } = await renderApp();
  await act(() => result.current.addToCart(products[0], 1));
  await act(() => result.current.toggleLike('d1'));
  await act(() => result.current.markAllRead());
  await act(() => result.current.setAppointment(null));
  await act(() => result.current.resetAll());
  expect(result.current.cart).toEqual([]);
  expect(result.current.likedPostIds).toEqual([]);
  expect(result.current.unreadCount).toBe(6);
  expect(result.current.appointment).not.toBeNull();
});
