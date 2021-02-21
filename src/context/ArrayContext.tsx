import React, { useState } from 'react';
import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';
import { useGameSize } from '../hooks/useGameSize';

type Props = {
  children: React.ReactNode;
  array: string[];
};

const ArrayContext = React.createContext({ array: [{ value: '', id: '' }], changeArray: (values: { value: string; id: string; }[]) => {} });

function getRandomWord(size: number):string {
  const word = RUSSIAN_NOUNS[Math.floor(Math.random() * RUSSIAN_NOUNS.length)];
  if (word.length !== size) {
    return getRandomWord(size);
  }
  return word.toUpperCase();
}

export const ArrayProvider = ({ children, array }: Props) => {
  const { gameSize } = useGameSize();
  const freeCellsNumber = (gameSize ** 2 - gameSize) / 2;
  const emptyArray = new Array(freeCellsNumber).fill('');
  const initialArray = emptyArray
    .concat(getRandomWord(gameSize).split(''))
    .concat(emptyArray)
    .map((item, index) => ({ value: item, id: index.toString() }) );

  const [currentArray, setCurrentArray] = useState(initialArray);

  const changeArray = (values: { value: string; id: string; }[]) => {
    setCurrentArray(values);
  };

  return (
    <ArrayContext.Provider
      value={{ array: currentArray, changeArray }}
    >
      {children}
    </ArrayContext.Provider>
  );
};

export const ArrayeConsumer = ArrayContext.Consumer;

export default ArrayContext;
