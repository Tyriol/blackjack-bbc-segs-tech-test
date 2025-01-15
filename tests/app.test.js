import { render, screen } from '@testing-library/react';
import App from '../src/App';
import Player from '../src/components/Player/Player';
import '../src/App.css';

describe('test the landing page', () => {
  test('The Title is present on page load', () => {
    render(<App />);
    expect(screen.getByText('BlackJack')).toBeInTheDocument();
  });
});
