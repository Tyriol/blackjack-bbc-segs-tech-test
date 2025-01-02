import { createDeck } from "../src/script.js";

describe("A valid new deck of cards is created", () => {
  test("The deck contains 52 cards", () => {
    const deck = createDeck();
    expect(deck.length).toStrictEqual(52);
  });
  test("The deck contains 13 of each suit", () => {
    const deck = createDeck();
    const suitCount = deck.reduce((acc, card) => {
      acc[card.suit] = (acc[card.suit] || 0) + 1;
      return acc;
    }, {});
    expect(Object.values(suitCount)).toStrictEqual([13, 13, 13, 13]);
  });
  test("The deck contains no duplicate cards", () => {
    const deck = createDeck();
    const cardSet = new Set(deck.map((card) => `${card.value}-${card.suit}`));
    expect(cardSet.size).toStrictEqual(deck.length);
  });
});
