import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import CartScreen from '../src/screens/CartScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderCart() {
  const navigation = createNavigation();
  const route = { key: 'Cart', name: 'Cart' };
  await renderWithApp(<CartScreen navigation={navigation} route={route} />);
  return navigation;
}

test('shows an empty message', async () => {
  const navigation = await renderCart();
  expect(screen.getByText('Your cart is empty')).toBeTruthy();
  await fireEvent.press(screen.getByText('Go to Mall'));
  expect(navigation.navigate).toHaveBeenCalledWith('Tabs', { screen: 'Mall' });
});

test('changing quantity updates the total', async () => {
  await renderCart();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  expect(
    screen.getByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeTruthy();
  expect(screen.getByText('Total: RM 100.00')).toBeTruthy();
  await fireEvent.press(screen.getByLabelText('Increase quantity'));
  expect(screen.getByText('Total: RM 200.00')).toBeTruthy();
});

test('decreasing to zero removes the item', async () => {
  await renderCart();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  await fireEvent.press(screen.getByLabelText('Decrease quantity'));
  expect(screen.getByText('Your cart is empty')).toBeTruthy();
});

test('remove deletes the item', async () => {
  await renderCart();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  await fireEvent.press(screen.getByText('Remove'));
  expect(screen.getByText('Your cart is empty')).toBeTruthy();
});

test('checkout places the order and empties the cart', async () => {
  await renderCart();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  await fireEvent.press(screen.getByText('Checkout'));
  expect(screen.getByText('Order placed! Thank you.')).toBeTruthy();
  expect(
    screen.queryByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeNull();
});

test('footer padding follows the safe area bottom inset', async () => {
  await renderCart();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  const footer = screen.getByTestId('cart-footer');
  expect(footer.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ paddingBottom: 16 })]),
  );
});
