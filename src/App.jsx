import { useState } from 'react';
import './App.css';

import {
  calculateScore,
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
    console.log(e);
    const newDeck = createDeck();
    const shuffledDeck = shuffleDeck([...newDeck]);
    const newPlayers = createPlayers(4);
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
        <div className="players">
          {players.map((player) => {
            calculateScore(player);
            return (
              <div className="player" key={player.id}>
                <h2>{player.name}</h2>
                <div className="player-cards">
                  {player.hand.map((card) => {
                    return (
                      <div className="card">
                        <p>{card.value}</p>
                        <p>{card.suit}</p>
                      </div>
                    );
                  })}
                </div>
                <p>Score: {player.score}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
