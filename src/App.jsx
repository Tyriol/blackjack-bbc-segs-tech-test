import { useState } from 'react';
import Player from './components/Player/Player.jsx';

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
  const [deck, setDeck] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameWinner, setGameWinner] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    const newDeck = createDeck();
    const shuffledDeck = shuffleDeck([...newDeck]);
    const newPlayers = createPlayers(numPlayers);
    const dealtDeck = dealCards([...shuffledDeck], newPlayers);
    for (let i = 0; i < newPlayers.length; i++) {
      calculateScore(newPlayers[i]);
    }
    setDeck(dealtDeck);
    setPlayers(newPlayers);
    setIsGameStarted(true);
  };

  const handleHit = () => {
    const updatedPlayers = [...players];
    const card = deck.pop();
    updatedPlayers[currentPlayerIndex].hand.push(card);
    calculateScore(updatedPlayers[currentPlayerIndex]);

    if (updatedPlayers[currentPlayerIndex].score > 21) {
      handleNextPlayer();
    }

    setPlayers(updatedPlayers);
    setDeck([...deck]);
  };

  const handleStay = () => {
    handleNextPlayer();
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(-1);
      let winner = -1;
      let winningScore = 0;
      for (let i = 0; i < players.length; i++) {
        if (players[i].score > winningScore && players[i].score < 22) {
          winningScore = players[i].score;
          winner = i;
        }
      }
      setGameWinner(players[winner].name);
    }
  };

  const handlePlayAgain = () => {
    setGameWinner('');
    setDeck([]);
    setNumPlayers(1);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setIsGameStarted(false);
  };

  return (
    <>
      <h1>BlackJack</h1>
      {!isGameStarted ? (
        <form className="player-select">
          <label>
            Choose how many players
            <select
              name="players"
              id="players"
              onChange={(e) => setNumPlayers(e.target.value)}
            >
              <option value="1">One Player</option>
              <option value="2">Two Players</option>
              <option value="3">Three Players</option>
              <option value="4">Four Players</option>
            </select>
          </label>
          <button onClick={handleStart}>Start</button>
        </form>
      ) : (
        <>
          <div className="players">
            {players.map((player, index) => {
              return (
                <Player
                  key={player.id}
                  player={player}
                  isActive={index === currentPlayerIndex}
                  onHit={handleHit}
                  onStay={handleStay}
                />
              );
            })}
          </div>
          {gameWinner && (
            <div className="game-over">
              <p>{gameWinner} is the winner!</p>
              <button onClick={handlePlayAgain}>Play Again</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
