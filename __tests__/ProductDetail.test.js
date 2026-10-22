import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import ProductDetailScreen from '../src/screens/ProductDetailScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderProduct(productId) {
  const navigation = createNavigation();
  const route = {
    key: 'ProductDetail',
    name: 'ProductDetail',
    params: { productId },
  };
  await renderWithApp(
    <ProductDetailScreen navigation={navigation} route={route} />,
  );
  return navigation;
}

test('shows the sale price and old price', async () => {
  await renderProduct('p2');
  expect(screen.getByText('Monstera Deliciosa Medium Size Plant')).toBeTruthy();
  expect(screen.getByText('RM 50.00')).toBeTruthy();
  expect(screen.getByText('RM 100.00')).toBeTruthy();
});

test('adding to cart twice updates the cart count', async () => {
  await renderProduct('p1');
  expect(screen.getByText('Cart (0)')).toBeTruthy();
  await fireEvent.press(screen.getByText('Add to Cart'));
  await fireEvent.press(screen.getByText('Add to Cart'));
  expect(screen.getByText('Cart (2)')).toBeTruthy();
  expect(screen.getByText('Added to cart')).toBeTruthy();
});

test('quantity stepper changes how many are added', async () => {
  await renderProduct('p1');
  await fireEvent.press(screen.getByLabelText('Increase quantity'));
  await fireEvent.press(screen.getByLabelText('Increase quantity'));
  await fireEvent.press(screen.getByLabelText('Decrease quantity'));
  expect(screen.getByText('2')).toBeTruthy();
  await fireEvent.press(screen.getByText('Add to Cart'));
  expect(screen.getByText('Cart (2)')).toBeTruthy();
});

test('quantity never goes below 1', async () => {
  await renderProduct('p1');
  await fireEvent.press(screen.getByLabelText('Decrease quantity'));
  expect(screen.getByText('1')).toBeTruthy();
});

test('cart button opens the cart', async () => {
  const navigation = await renderProduct('p1');
  await fireEvent.press(screen.getByText('Cart (0)'));
  expect(navigation.navigate).toHaveBeenCalledWith('Cart');
});

test('a service can be booked after picking a time slot', async () => {
  const navigation = await renderProduct('s1');
  expect(screen.queryByText('Add to Cart')).toBeNull();
  await fireEvent.press(screen.getByText('Book Now'));
  expect(screen.queryByText(/Booked for/)).toBeNull();
  await fireEvent.press(screen.getByText('17 Oct 2020 · 2:30 PM'));
  await fireEvent.press(screen.getByText('Book Now'));
  expect(screen.getByText('Booked for 17 Oct 2020 at 2:30 PM')).toBeTruthy();
  await fireEvent.press(screen.getByText('View appointment'));
  expect(navigation.navigate).toHaveBeenCalledWith('AppointmentDetail');
});
