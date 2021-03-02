import React from 'react';
import { PlayerScore } from './PlayerScore';
import { usePlayersData } from '../hooks/usePlayersData';

const ScoreContainer = () => {
  const { playersData } = usePlayersData();

  const scoreBoard = playersData.map((player) => (
    <PlayerScore
      key={player.id}
      playerName={player.name}
      words={player.words}
      score={player.score}
      isMoving={player.isMoving}
    />
  ));


  return (
    <div className="score-container">
      {scoreBoard}
    </div>
  );
};

export { ScoreContainer };
