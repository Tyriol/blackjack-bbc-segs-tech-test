import { createDeck, shuffleDeck, createPlayers } from '../src/script.js';

describe('A valid new deck of cards is created and shuffled', () => {
  test('The deck contains 52 cards', () => {
    const deck = createDeck();
    expect(deck.length).toStrictEqual(52);
  });

  test('The deck contains 13 of each suit', () => {
    const deck = createDeck();
    const suitCount = deck.reduce((acc, card) => {
      acc[card.suit] = (acc[card.suit] || 0) + 1;
      return acc;
    }, {});
    expect(Object.values(suitCount)).toStrictEqual([13, 13, 13, 13]);
  });

  test('The deck contains no duplicate cards', () => {
    const deck = createDeck();
    const cardSet = new Set(deck.map((card) => `${card.value}-${card.suit}`));
    expect(cardSet.size).toStrictEqual(deck.length);
  });

  test('The deck is shuffled', () => {
    const originalDeck = createDeck();
    const shuffledDeck = shuffleDeck([...originalDeck]);

    // Check that the shuffled deck is not in the same order as the original deck
    const isSameOrder = originalDeck.every(
      (card, index) => card === shuffledDeck[index]
    );
    expect(isSameOrder).toBe(false);

    // Check that the shuffled deck contains the same cards as the original deck
    const originalDeckSet = new Set(
      originalDeck.map((card) => `${card.value}-${card.suit}`)
    );
    const shuffledDeckSet = new Set(
      shuffledDeck.map((card) => `${card.value}-${card.suit}`)
    );
    expect(originalDeckSet).toStrictEqual(shuffledDeckSet);
  });
});

describe('Players are created to play the game', () => {
  test('Player 1 is created with a name, id, score and a hand', () => {
    const players = createPlayers(1);
    expect(players).toBe([{ Name: 'Player 1', id: 1, score: 0, hand: [] }]);
  });
  test('Player 2 exists if 2 players are created', () => {
    const players = createPlayers(2);
    const player2 = players[1];
    expect(player2).toBe({ Name: 'Player 2', id: 2, score: 0, hand: [] });
  });
  test('The players array contains 4 objects if 4 players selected', () => {
    const players = createPlayers(4);
    expect(players.length).toStrictEqual(4);
  });
});
