import { getDeck } from "../src/script.js";

test("deck contains 52 cards", () => {
  const deck = getDeck();
  expect(deck.length).toStrictEqual(52);
});
