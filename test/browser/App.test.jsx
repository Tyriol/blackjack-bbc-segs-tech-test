import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../src/App';

it('renders title', () => {
  render(<App />);
  expect(screen.getByText('BlackJack')).toBeInTheDocument();
});

it('has an option to select players', () => {
  render(<App />);
  expect(
    screen.getByRole('combobox', { name: 'Choose how many players:' })
  ).toBeInTheDocument();
});

it('updates number of players when select value changes', async () => {
  render(<App />);
  const select = screen.getByRole('combobox');
  await userEvent.selectOptions(select, '2');
  expect(select.value).toBe('2');
});

describe('different numbers of players are present', () => {
  it('shows player component after game starts', async () => {
    render(<App />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '1');
    const startButton = screen.getByRole('button', { name: 'Start' });
    await userEvent.click(startButton);
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });
  it('shows 3 players if 3 players are chosen', async () => {
    render(<App />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '3');
    const startButton = screen.getByRole('button', { name: 'Start' });
    await userEvent.click(startButton);
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Player 3')).toBeInTheDocument();
  });
});

describe('behavior of choosing to hit and to stay', () => {
  it('deals a new card when a player chooses to hit', async () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: 'Start' });
    await userEvent.click(startButton);

    let playerOneCards = screen.getAllByTestId('player-1-card');
    expect(playerOneCards.length).toBe(2);

    const hitButton = screen.getByRole('button', { name: 'Hit' });
    await userEvent.click(hitButton);

    playerOneCards = screen.getAllByTestId('player-1-card');
    expect(playerOneCards.length).toBe(3);
  });

  it('does not deal a new card when a player chooses to stay', async () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: 'Start' });
    await userEvent.click(startButton);

    let playerOneCards = screen.getAllByTestId('player-1-card');
    expect(playerOneCards.length).toBe(2);

    const stayButton = screen.getByRole('button', { name: 'Stay' });
    await userEvent.click(stayButton);

    playerOneCards = screen.getAllByTestId('player-1-card');
    expect(playerOneCards.length).toBe(2);
  });
});

it('shows game over and winner when game ends', async () => {
  render(<App />);
  const startButton = screen.getByRole('button', { name: 'Start' });
  await userEvent.click(startButton);

  // When there is only one player, hitting stay immediatly will end the game
  const stayButton = screen.getByRole('button', { name: 'Stay' });
  await userEvent.click(stayButton);

  expect(screen.getByText('Player 1 is the winner!')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Play Again' })
  ).toBeInTheDocument();
});

it('resets game state when play again is clicked', async () => {
  render(<App />);
  const startButton = screen.getByRole('button', { name: 'Start' });
  await userEvent.click(startButton);

  const stayButton = screen.getByRole('button', { name: 'Stay' });
  await userEvent.click(stayButton);

  const playAgainButton = screen.getByRole('button', { name: 'Play Again' });
  await userEvent.click(playAgainButton);

  expect(screen.queryByTestId('game-over')).not.toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});
