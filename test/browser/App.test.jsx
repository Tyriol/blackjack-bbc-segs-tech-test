import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../../src/App';

test('renders title', () => {
  render(<App />);
  expect(screen.getByText('BlackJack')).toBeInTheDocument();
});
