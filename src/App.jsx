import { useState } from 'react';
import './App.css';

import {
  createDeck,
  createPlayers,
  dealCards,
  shuffleDeck,
} from '../utils/helpers.js';

function App() {
  // state
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);

  const handleStart = (e) => {
    e.preventDefault();
    const newDeck = createDeck();
    const shuffledDeck = shuffleDeck([...newDeck]);
    const newPlayers = createPlayers(2);
    const dealtDeck = dealCards([...shuffledDeck], newPlayers);
    setDeck(dealtDeck);
    setPlayers(newPlayers);
    setIsGameStarted(true);
  };

  return (
    <>
      <h1>BlackJack</h1>
      {!isGameStarted ? (
        <form>
          <label>
            Choose how many players
            <select name="players" id="players">
              <option value="1">One Player</option>
              <option value="2">Two Players</option>
              <option value="3">Three Players</option>
              <option value="4">Four Players</option>
            </select>
          </label>
          <button onClick={handleStart}>Start</button>
        </form>
      ) : (
        players.map((player) => {
          return (
            <div key={player.id}>
              <h2>{player.name}</h2>
              <p>{player.hand[0].value}</p>
              <p>{player.hand[0].suit}</p>
              <p>{player.score}</p>
            </div>
          );
        })
      )}
    </>
  );
}

export default App;
