const suits = ["spades", "hearts", "clubs", "diamonds"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// create a deck of cards using the suits and values above
// define a function
// define an empty array tp store the deck
// use a for loop to loop through the suits
// for every suit loop through the values
// push a object that contains the value and suit to the deck array
// return the deck

export const getDeck = () => {
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { value: values[j], suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
};
