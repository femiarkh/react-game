import React, { useState } from 'react';
import { GameBoard } from './GameBoard';
import { ButtonsContainer } from './ButtonsContainer';
import { ScoreContainer } from './ScoreContainer';

const GameContainer = () => {
  const [passCount, setPassCount] = useState(0);
  return (
    <div className="game-container">
      <div className="game-container__game-field">
        <ButtonsContainer passCount={passCount} setPassCount={setPassCount} />
        <GameBoard passCount={passCount} setPassCount={setPassCount} />
      </div>
      <ScoreContainer />
    </div>
  );
};

export { GameContainer };
