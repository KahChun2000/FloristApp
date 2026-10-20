import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import InboxScreen from '../src/screens/InboxScreen';
import MessageDetailScreen from '../src/screens/MessageDetailScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderScreen(Screen: any, params?: object) {
  const navigation = createNavigation();
  const route = { key: 'test', name: 'test', params };
  await renderWithApp(
    <Screen navigation={navigation as any} route={route as any} />,
  );
  return navigation;
}

test('shows the unread count', async () => {
  await renderScreen(InboxScreen);
  expect(screen.getByText('6 unread')).toBeTruthy();
});

test('opening a message marks it read', async () => {
  const navigation = await renderScreen(InboxScreen);
  await fireEvent.press(screen.getByText('Appointment confirmed'));
  expect(screen.getByText('5 unread')).toBeTruthy();
  expect(navigation.navigate).toHaveBeenCalledWith('MessageDetail', {
    messageId: 'i1',
  });
});

test('mark all as read sets unread to 0', async () => {
  await renderScreen(InboxScreen);
  await fireEvent.press(screen.getByText('Mark all as read'));
  expect(screen.getByText('0 unread')).toBeTruthy();
});

test('message detail shows the full message', async () => {
  await renderScreen(MessageDetailScreen, { messageId: 'i2' });
  expect(screen.getByText('50% off selected flowers')).toBeTruthy();
  expect(screen.getByText(/Selected flowers are 50% off/)).toBeTruthy();
});
