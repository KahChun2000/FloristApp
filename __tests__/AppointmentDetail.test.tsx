import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import AppointmentDetailScreen from '../src/screens/AppointmentDetailScreen';
import { createNavigation, renderWithApp } from '../testing/renderWithApp';

async function renderAppointment() {
  const navigation = createNavigation();
  const route = { key: 'AppointmentDetail', name: 'AppointmentDetail' };
  await renderWithApp(
    <AppointmentDetailScreen
      navigation={navigation as any}
      route={route as any}
    />,
  );
  return navigation;
}

test('shows the appointment details', async () => {
  await renderAppointment();
  expect(screen.getByText('Indoor Plant Health Check at Home')).toBeTruthy();
  expect(screen.getByText('14 Oct 2020')).toBeTruthy();
  expect(screen.getByText('12:30 PM')).toBeTruthy();
});

test('reschedule changes the time', async () => {
  await renderAppointment();
  await fireEvent.press(screen.getByText('Reschedule'));
  await fireEvent.press(screen.getByText('17 Oct 2020 · 2:30 PM'));
  expect(screen.getByText('17 Oct 2020')).toBeTruthy();
  expect(screen.getByText('2:30 PM')).toBeTruthy();
  expect(screen.queryByText('16 Oct 2020 · 10:00 AM')).toBeNull();
});

test('saying No keeps the appointment', async () => {
  await renderAppointment();
  await fireEvent.press(screen.getByText('Cancel Appointment'));
  expect(screen.getByText('Are you sure?')).toBeTruthy();
  await fireEvent.press(screen.getByText('No'));
  expect(screen.getByText('14 Oct 2020')).toBeTruthy();
});

test('cancelling shows the empty state', async () => {
  const navigation = await renderAppointment();
  await fireEvent.press(screen.getByText('Cancel Appointment'));
  await fireEvent.press(screen.getByText('Yes'));
  expect(screen.getByText('No upcoming appointment')).toBeTruthy();
  await fireEvent.press(screen.getByText('Book a service'));
  expect(navigation.navigate).toHaveBeenCalledWith('Tabs', {
    screen: 'Mall',
    params: { type: 'service' },
  });
});
