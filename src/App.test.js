import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Finding Falcone title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Finding Falcone');
  expect(linkElement).toBeInTheDocument();
});
