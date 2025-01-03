const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const values = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export const createDeck = () => {
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { value: values[j], suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = 0; i < 1000; i++) {
    let loc1 = Math.floor(Math.random() * deck.length);
    let loc2 = Math.floor(Math.random() * deck.length);
    let temp = deck[loc1];

    deck[loc1] = deck[loc2];
    deck[loc2] = temp;
  }
  return deck;
};

// TODO: Create a player to store hand
// Write test
export const createPlayers = (numPlayers) => {
  const players = [];
  for (let i = 1; i <= numPlayers; i++) {
    const hand = [];
    const player = { name: `Player ${i}`, id: i, score: 0, hand: hand };
    players.push(player);
  }
  return players;
};
// TODO: Deal a card
// TODO: Deal a hand
// TODO: Assign weights to cards
// TODO: Calculate hand score
// TODO:
// TODO:
// TODO:
// TODO:
