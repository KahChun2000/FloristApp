import React from 'react';
import { Pressable, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { AppProvider, useApp } from '../src/context/AppContext';

function CancelAppointmentButton() {
  const { setAppointment } = useApp();
  return (
    <Pressable onPress={() => setAppointment(null)}>
      <Text>test-cancel-appointment</Text>
    </Pressable>
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

export function renderWithApp(element: React.ReactElement) {
  return render(
    <AppProvider>
      <CancelAppointmentButton />
      {element}
    </AppProvider>,
  );
}
