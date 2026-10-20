import React from 'react';
import { Pressable, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { AppProvider, useApp } from '../src/context/AppContext';
import { products } from '../src/data/products';

function TestButtons() {
  const { setAppointment, addToCart, toggleLike } = useApp();
  return (
    <>
      <Pressable onPress={() => setAppointment(null)}>
        <Text>test-cancel-appointment</Text>
      </Pressable>
      <Pressable onPress={() => addToCart(products[0], 1)}>
        <Text>test-add-to-cart</Text>
      </Pressable>
      <Pressable onPress={() => toggleLike('d1')}>
        <Text>test-like-post</Text>
      </Pressable>
    </>
  );
}

export function createNavigation() {
  return {
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  };
}

export function withApp(element: React.ReactElement) {
  return (
    <AppProvider>
      <TestButtons />
      {element}
    </AppProvider>
  );
}

export function renderWithApp(element: React.ReactElement) {
  return render(withApp(element));
}
