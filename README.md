# BlackJack!

You know the game, also called 21's, the aim is to acquire a hand that totals 21, or at least is higher than the other players without going bust (a score greater than 21).

Players are dealt an initial hand of 2 cards and then are offered the choice to `hit` (get given a new card), or `stay` (keep their current hand and move on to the next player or calculate the game result).

Face cards are worth 10 points each, an ace can be worth either 1 or 11 points and all other cards are worth their card value.

## Getting Started

Clone the code from github:

```
git clone https://github.com/Tyriol/blackjack-bbc-segs-tech-test.git
```

Install the required dependencies by running the following in your terminal:

```
npm i
```

Start the dev server by running this in your terminal:

```
npm run dev
```

You can run the test suite using:

```
npm test
```

You can also find the game hosted online [here](https://blackjack.saffagonerogue.me)

## Tech Stack and Development Tools

- JavaScript
- React (Vite)
- Jest

## Challenges

I encountered a few challenges while building this:

1. First off, I wrote the game functionality using vanilla js (the utility functions you'll find in `helpers.js`), I wrote the corresponding tests first and then the functions themselves, trying to go the TDD approach. This went well. Then I decided I wanted to build a front end for the game, and as the BBC uses React, I went the React route rather than vanilla js.
   The issue I ran into was that I had not written the functions to be immutable (i built the deck, and then I used that deck when I dealt cards etc) and React prefers state to be immutable, so I had to rewrite my functions and test to be immutable.

2. Another side effect of going the React route was that I had to move some of the onClick functions like `handleHit` and `handleStart` from the `helpers.js` file and have them in the React app instead, which made testing more difficult

3. The final and most challenging challenge was that I wanted to have decent testing, and I've never tested React before. I first went the Jest route with React Testing Library, but there was a lot of convoluted config required and I still was getting error after error while trying to test. It occurred to me that I was using Vite, and Vitest exists, so I researched React testing using Vite + Vitest and while this still took a while and many videos watched, I ended up with some decent testing of my React elements.

### Todo:

- Add more testing, specifically for React
- Add ability to hide the second card dealt and score
  - For all players other than player 1 at the start
  - but keep them visible after they've played
- Add logic for 5 card trick (charlie) where if a player manages to draw 5 cards while remaining under 21 they win automatically
- Improve game for mobile view (at the moment it's setup for desktop)
