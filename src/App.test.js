import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Finding Falcone title', () => {
  const { getByText } = render(<App />);
  const titleText = getByText('Finding Falcone');
  expect(titleText).toBeInTheDocument();

  test.todo(
    'when planet is selected, option should be disabled in all other cards'
  );

  test.todo('renders all the planet options on load');
});
