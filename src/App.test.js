import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Finding Falcone title', () => {
  const { getByText } = render(<App />);
  const titleText = getByText('Finding Falcone');
  expect(titleText).toBeInTheDocument();
});
