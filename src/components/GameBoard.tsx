import React from 'react';
import { Letter } from './Letter';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { GAME_SIZES } from '../const/GAME_SIZES';


const GameBoard = () => {
  const { array } = useArray();
  const { gameSize } = useGameSize();

  const letters = array
    .map((item) => <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      array={array}
    />);

  return (
    <div className={`game-board game-board-${GAME_SIZES[gameSize]}`}>
      { letters }
    </div>
  );
};

export { GameBoard };
