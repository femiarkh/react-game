import React, { useState } from 'react';
import { Letter } from './Letter';
import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';

const GAME_SIZE = 3;

function getRandomWord(size: number):string {
  const word = RUSSIAN_NOUNS[Math.floor(Math.random() * RUSSIAN_NOUNS.length)];
  if (word.length !== size) {
    return getRandomWord(size);
  }
  return word.toUpperCase();
}
const emptyArray = new Array(GAME_SIZE).fill('');
const initialArray = emptyArray
  .concat(getRandomWord(GAME_SIZE).split(''))
  .concat(emptyArray)
  .map((item, index) => ({ value: item, id: index.toString() }) );

console.log(initialArray);

const GameBoard = () => {
  const [array, setArray] = useState(initialArray);

  const letters = initialArray
    .map((item) => <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      array={array}
      setArray={setArray}
    />);

  return (
    <div className="game-board">
      { letters }
    </div>
  );
};

export { GameBoard };
