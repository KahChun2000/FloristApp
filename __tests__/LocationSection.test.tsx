import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LocationSection from '../src/components/LocationSection';

test('long addresses can shrink instead of overflowing', async () => {
  await render(<LocationSection />);
  const address = screen.getByLabelText('Open Sunway Pyramid address');
  expect(address.props.style).toEqual(
    expect.objectContaining({ flexShrink: 1 }),
  );
});
