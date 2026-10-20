import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderHome() {
  const navigation = createNavigation();
  const route = { key: 'Home', name: 'Home' };
  await renderWithApp(
    <HomeScreen navigation={navigation as any} route={route as any} />,
  );
  return navigation;
}

test('shows the main sections', async () => {
  await renderHome();
  expect(screen.getByText('NEXT APPOINTMENT')).toBeTruthy();
  expect(screen.getByText('NEW SERVICES')).toBeTruthy();
  expect(screen.getByText('LOCATION')).toBeTruthy();
  expect(screen.getByText('Sunway Pyramid')).toBeTruthy();
  expect(screen.getByText('The Gardens Mall')).toBeTruthy();
});

test('View All opens the mall with services', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getByText('View All'));
  expect(navigation.navigate).toHaveBeenCalledWith('Mall', {
    type: 'service',
    categoryId: undefined,
  });
});

test('Shop button opens the mall with shop items', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getByLabelText('Shop'));
  expect(navigation.navigate).toHaveBeenCalledWith('Mall', {
    type: 'shop',
    categoryId: undefined,
  });
});

test('Posts button opens discover', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getByLabelText('Posts'));
  expect(navigation.navigate).toHaveBeenCalledWith('Discover');
});

test('category circle opens the mall filtered by category', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getAllByLabelText('Seedlings')[0]);
  expect(navigation.navigate).toHaveBeenCalledWith('Mall', {
    type: undefined,
    categoryId: 'c2',
  });
});

test('appointment arrow opens appointment detail', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getByLabelText('Open appointment'));
  expect(navigation.navigate).toHaveBeenCalledWith('AppointmentDetail');
});

test('shows a message when there is no appointment', async () => {
  const navigation = await renderHome();
  await fireEvent.press(screen.getByText('test-cancel-appointment'));
  expect(screen.getByText('No upcoming appointment')).toBeTruthy();
  await fireEvent.press(screen.getByText('Book a service'));
  expect(navigation.navigate).toHaveBeenCalledWith('Mall', {
    type: 'service',
    categoryId: undefined,
  });
});
