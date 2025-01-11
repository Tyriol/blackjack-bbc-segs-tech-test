const Player = ({ player, onHit, onStay, isActive }) => {
  return (
    <div className={`player ${isActive ? 'active' : ''}`}>
      <h2>{player.name}</h2>
      <div className="player-cards">
        {player.hand.map((card, index) => (
          <div className="card" key={index}>
            <p>{card.value}</p>
            <p>{card.suit}</p>
          </div>
        ))}
      </div>
      <p>Score: {player.score}</p>
      {player.score > 21 && <p>You Lose!</p>}
      {isActive && (
        <div className="player-actions">
          <button onClick={onHit}>Hit</button>
          <button onClick={onStay}>Stay</button>
        </div>
      )}
    </div>
  );
};

export default Player;
