import React from 'react';
import { GameBoard } from './GameBoard';
import { ScoreContainer } from './ScoreContainer';

const GameContainer = () => (
  <div className="game-container">
    <GameBoard />
    <ScoreContainer />
  </div>
);

export { GameContainer };
