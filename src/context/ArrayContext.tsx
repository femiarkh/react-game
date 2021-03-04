import React, { useState } from 'react';
import { useGameSize } from '../hooks/useGameSize';
import { createInitialArray } from '../utils/createInitialArray';

type Props = {
  children: React.ReactNode;
  array: string[];
};

const ArrayContext = React.createContext({ array: [{ value: '', id: '' }], changeArray: (values: { value: string; id: string; }[]) => {} });


export const ArrayProvider = ({ children, array }: Props) => {
  const { gameSize } = useGameSize();
  const initialArray = createInitialArray(gameSize);

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
