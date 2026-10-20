import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';

test('shows the five tabs', async () => {
  await render(<App />);
  expect(screen.getByText('HOME')).toBeTruthy();
  expect(screen.getByText('MALL')).toBeTruthy();
  expect(screen.getByText('DISCOVER')).toBeTruthy();
  expect(screen.getByText('INBOX')).toBeTruthy();
  expect(screen.getByText('ACCOUNT')).toBeTruthy();
});

test('shows the unread badge on the inbox tab', async () => {
  await render(<App />);
  expect(screen.getByText('6')).toBeTruthy();
});

test('pressing a tab switches screen', async () => {
  await render(<App />);
  await fireEvent.press(screen.getByText('INBOX'));
  expect(screen.getByText('Inbox')).toBeTruthy();
});
