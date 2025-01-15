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

export const createPlayers = (numPlayers) => {
  const players = [];
  for (let i = 1; i <= numPlayers; i++) {
    const hand = [];
    const player = { name: `Player ${i}`, id: i, score: 0, hand: hand };
    players.push(player);
  }
  return players;
};

export const dealCards = (deck, players) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < players.length; j++) {
      let card = deck.pop();
      players[j].hand.push(card);
    }
  }
  return deck;
};

export const calculateScore = (player) => {
  player.score = 0;
  let isAce = false;
  for (let i = 0; i < player.hand.length; i++) {
    if (
      player.hand[i].value === 'K' ||
      player.hand[i].value === 'Q' ||
      player.hand[i].value === 'J'
    ) {
      player.score += 10;
    } else if (player.hand[i].value === 'A') {
      player.score += 1;
      isAce = true;
    } else {
      player.score += Number(player.hand[i].value);
    }
  }
  if (player.score <= 11 && isAce) {
    player.score += 10;
  }
};
