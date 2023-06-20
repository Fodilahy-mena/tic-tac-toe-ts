import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Tic tac toe main page', () => {
  render(<App />);
  const linkElement = screen.getByText('Tic tac toe');
  expect(linkElement).toBeInTheDocument();
});
