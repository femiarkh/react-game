import React from 'react';
import { PlayerScore } from './PlayerScore';

const ScoreContainer = () => (
  <div className="score-container">
    <PlayerScore />
    <PlayerScore />
  </div>
);

export { ScoreContainer };
