import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import MallScreen from '../src/screens/MallScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderMall(params?: object) {
  const navigation = createNavigation();
  const route = { key: 'Mall', name: 'Mall', params };
  await renderWithApp(
    <MallScreen navigation={navigation as any} route={route as any} />,
  );
  return navigation;
}

test('shows products in a grid', async () => {
  await renderMall();
  expect(
    screen.getByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeTruthy();
});

test('search with no match shows an empty message', async () => {
  await renderMall();
  await fireEvent.changeText(
    screen.getByPlaceholderText('Search Salon'),
    'zzz',
  );
  expect(screen.getByText('No items found')).toBeTruthy();
});

test('Services pill hides shop items', async () => {
  await renderMall();
  await fireEvent.press(screen.getByText('Services'));
  expect(
    screen.queryByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeNull();
  expect(screen.getByText('Indoor Plant Health Check at Home')).toBeTruthy();
});

test('type param preselects services', async () => {
  await renderMall({ type: 'service' });
  expect(
    screen.queryByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeNull();
});

test('category param shows a chip that can be cleared', async () => {
  await renderMall({ categoryId: 'c2' });
  expect(
    screen.queryByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeNull();
  await fireEvent.press(screen.getByText('Seedlings ✕'));
  expect(screen.queryByText('Seedlings ✕')).toBeNull();
  expect(
    screen.getByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeTruthy();
});

test('filter sheet can show sale items only', async () => {
  await renderMall();
  await fireEvent.press(screen.getByLabelText('Filter'));
  await fireEvent(screen.getByLabelText('On sale only'), 'valueChange', true);
  await fireEvent.press(screen.getByText('Apply'));
  expect(
    screen.queryByText('Pilea Peperomioides in White Ceramic Pot'),
  ).toBeNull();
  expect(screen.getByText('Monstera Deliciosa Medium Size Plant')).toBeTruthy();
});

test('pressing a product opens its detail', async () => {
  const navigation = await renderMall();
  await fireEvent.press(
    screen.getByText('Pilea Peperomioides in White Ceramic Pot'),
  );
  expect(navigation.navigate).toHaveBeenCalledWith('ProductDetail', {
    productId: 'p1',
  });
});

test('back button goes back', async () => {
  const navigation = await renderMall();
  await fireEvent.press(screen.getByLabelText('Back'));
  expect(navigation.goBack).toHaveBeenCalled();
});
