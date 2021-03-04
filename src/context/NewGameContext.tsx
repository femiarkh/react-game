import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  newGame: boolean;
};

const NewGameContext = React.createContext({ newGame: false,
  changeNewGame: (values: boolean) => {} });

export const NewGameProvider = ({ children, newGame }: Props) => {
  const [currentNewGame, setCurrentNewGame] = useState(
    newGame || false
  );

  const changeNewGame = (values: boolean) => {
    setCurrentNewGame(values);
  };

  return (
    <NewGameContext.Provider
      value={{ newGame: currentNewGame, changeNewGame }}
    >
      {children}
    </NewGameContext.Provider>
  );
};

export const NewGameConsumer = NewGameContext.Consumer;

export default NewGameContext;
