import React from 'react';
import { GameBoard } from './GameBoard';
import { ButtonsContainer } from './ButtonsContainer';
import { ScoreContainer } from './ScoreContainer';

const GameContainer = () => (
  <div className="game-container">
    <div className="game-container__game-field">
      <ButtonsContainer />
      <GameBoard />
    </div>
    <ScoreContainer />
  </div>
);

export { GameContainer };
