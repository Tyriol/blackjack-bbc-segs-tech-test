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

// create a deck of 52 unshuffled cards
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

// TODO: Deal a hand
// A function that takes in the deck and the players array
// It should loop through the players array twice
// taking a card from the deck
// and placing it in the players hand
// untill they all have 2 cards
export const dealCards = (deck, players) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < players.length; j++) {
      let card = deck.pop();
      players[j].hand.push(card);
    }
  }
};

// TODO: Start game
export const startGame = (numPlayers) => {
  const deck = createDeck();
  shuffleDeck(deck);
  const players = createPlayers(numPlayers);
  dealCards(deck, players);
  return [deck, players];
};

// TODO: Calculate hand score
// set score to zero
// set isAce to false
// loop through hand
// if the card value is K, Q, or J increase score by 10
// if the card value is A increase score by 1
// set isAce to true
// for all other values increase by the face value
// at the end if the score is 11 or less and isAce is true then add 10 to the score.
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

// TODO: Function to deal a new card when a player chooses to "HIT"
// pop a card off the deck and give it to the player
// calculate the score
// check if it's higher then 21
export const hitMe = (deck, player) => {
  let isValidHand = true;
  let card = deck.pop();
  player.hand.push(card);
  calculateScore(player);
  if (player.score > 21) return !isValidHand;
};

// TODO: Function to handle a player choosing to "STAY"
// TODO: Function to evaluate score
// TODO: Function to start a game
