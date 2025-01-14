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

### Todo:

- Add more testing, specifically for React
- Add ability to hide the second card dealt and score
  - For all players other than player 1 at the start
  - but keep them visible after they've played
- Add logic for 5 card trick (charlie) where if a player manages to draw 5 cards while remaining under 21 they win automatically
- Improve game for mobile view (at the moment it's setup for desktop)
