import React, { useState } from 'react';
import { Letter } from './Letter';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { GAME_SIZES } from '../const/GAME_SIZES';

const GameBoard = () => {
  const { array } = useArray();
  const { gameSize } = useGameSize();
  const initialUsedIndexes = new Array(gameSize)
    .fill((array.length - gameSize) / 2)
    .map((item, index) => item + index);
  const [usedIndexes, setUsedIndexes] = useState(initialUsedIndexes);

  const letters = array
    .map((item, index) => <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      disabled={usedIndexes.includes(index)}
      usedIndexes={usedIndexes}
      setUsedIndexes={setUsedIndexes}
    />);

  return (
    <div className={`game-board game-board-${GAME_SIZES[gameSize]}`}>
      { letters }
    </div>
  );
};

export { GameBoard };
