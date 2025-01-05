import {
  createDeck,
  shuffleDeck,
  createPlayers,
  dealCards,
} from '../src/script.js';

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
    const deck = createDeck();
    const shuffledDeck = shuffleDeck([...deck]);

    // Check that the shuffled deck is not in the same order as the original deck
    const isSameOrder = deck.every(
      (card, index) => card === shuffledDeck[index]
    );
    expect(isSameOrder).toBe(false);

    // Check that the shuffled deck contains the same cards as the original deck
    const originalDeckSet = new Set(
      deck.map((card) => `${card.value}-${card.suit}`)
    );
    const shuffledDeckSet = new Set(
      shuffledDeck.map((card) => `${card.value}-${card.suit}`)
    );
    expect(originalDeckSet).toStrictEqual(shuffledDeckSet);
  });
});

describe('Players are created to play the game', () => {
  test('Players are initialised with a Name and id', () => {
    const numPlayers = 3;
    const players = createPlayers(numPlayers);
    for (let i = 0; i < numPlayers; i++) {
      expect(players[i].name).toBe(`Player ${i + 1}`);
      expect(players[i].id).toBe(i + 1);
    }
  });
  test('Players are initialised with a zero score and empty hand', () => {
    const numPlayers = 3;
    const players = createPlayers(numPlayers);
    for (let i = 0; i < numPlayers; i++) {
      expect(players[i].score).toBe(0);
      expect(players[i].hand).toEqual([]);
    }
  });
  test('The players array is created with the correct number of players', () => {
    const numPlayers = 2;
    const players = createPlayers(numPlayers);
    expect(players.length).toEqual(numPlayers);
  });
});

describe('Players are dealt an opening hand', () => {
  test('Players all have 2 cards after the initial deal', () => {
    const deck = createDeck();
    shuffleDeck(deck);
    const numPlayers = 3;
    const players = createPlayers(numPlayers);
    dealCards(deck, players);
    for (let i = 0; i < numPlayers; i++) {
      expect(players[i].hand.length).toBe(2);
    }
  });
  test('The deck size should be reduced relative according to the number of players', () => {
    const deck = createDeck();
    shuffleDeck(deck);
    const numPlayers = 5;
    const players = createPlayers(numPlayers);
    dealCards(deck, players);
    expect(deck.length).toEqual(52 - numPlayers * 2);
  });
});
