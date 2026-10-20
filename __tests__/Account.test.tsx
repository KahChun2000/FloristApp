import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import AccountScreen from '../src/screens/AccountScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderAccount() {
  const navigation = createNavigation();
  const route = { key: 'Account', name: 'Account' };
  await renderWithApp(
    <AccountScreen navigation={navigation as any} route={route as any} />,
  );
  return navigation;
}

test('shows the user and menu rows', async () => {
  await renderAccount();
  expect(screen.getByText('Jane Doe')).toBeTruthy();
  expect(screen.getByText('My Cart (0)')).toBeTruthy();
  expect(screen.getByText('Liked Posts (0)')).toBeTruthy();
});

test('counts update from app state', async () => {
  await renderAccount();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  await fireEvent.press(screen.getByText('test-like-post'));
  expect(screen.getByText('My Cart (1)')).toBeTruthy();
  expect(screen.getByText('Liked Posts (1)')).toBeTruthy();
});

test('menu rows navigate', async () => {
  const navigation = await renderAccount();
  await fireEvent.press(screen.getByText('My Cart (0)'));
  expect(navigation.navigate).toHaveBeenCalledWith('Cart');
  await fireEvent.press(screen.getByText('My Appointment'));
  expect(navigation.navigate).toHaveBeenCalledWith('AppointmentDetail');
  await fireEvent.press(screen.getByText('Liked Posts (0)'));
  expect(navigation.navigate).toHaveBeenCalledWith('LikedPosts');
});

test('settings switches can be toggled', async () => {
  await renderAccount();
  const toggle = screen.getByLabelText('Notifications');
  expect(toggle.props.value).toBe(true);
  await fireEvent(toggle, 'valueChange', false);
  expect(screen.getByLabelText('Notifications').props.value).toBe(false);
});

test('log out resets data and shows a message', async () => {
  await renderAccount();
  await fireEvent.press(screen.getByText('test-add-to-cart'));
  await fireEvent.press(screen.getByText('Log Out'));
  expect(
    screen.getByText('You have been logged out. Data reset.'),
  ).toBeTruthy();
  expect(screen.getByText('My Cart (0)')).toBeTruthy();
});

test('logged out message clears after the next action', async () => {
  await renderAccount();
  await fireEvent.press(screen.getByText('Log Out'));
  expect(
    screen.getByText('You have been logged out. Data reset.'),
  ).toBeTruthy();
  await fireEvent(screen.getByLabelText('Notifications'), 'valueChange', false);
  expect(
    screen.queryByText('You have been logged out. Data reset.'),
  ).toBeNull();
});

test('logged out message clears when opening a menu row', async () => {
  await renderAccount();
  await fireEvent.press(screen.getByText('Log Out'));
  await fireEvent.press(screen.getByText('My Appointment'));
  expect(
    screen.queryByText('You have been logged out. Data reset.'),
  ).toBeNull();
});
