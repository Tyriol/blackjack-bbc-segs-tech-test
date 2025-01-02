import { createDeck, shuffleDeck } from '../src/script.js';

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
