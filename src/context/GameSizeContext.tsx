import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  gameSize: number;
};

const DEFAULT_GAME_SIZE = 5;

const GameSizeContext = React.createContext({ gameSize: DEFAULT_GAME_SIZE,
  changeGameSize: (values: number) => {} });

export const GameSizeProvider = ({ children, gameSize }: Props) => {
  const [currentGameSize, setCurrentGameSize] = useState(
    gameSize || DEFAULT_GAME_SIZE
  );

  const changeGameSize = (values: number) => {
    setCurrentGameSize(values);
  };

  return (
    <GameSizeContext.Provider
      value={{ gameSize: currentGameSize, changeGameSize }}
    >
      {children}
    </GameSizeContext.Provider>
  );
};

export const GameSizeConsumer = GameSizeContext.Consumer;

export default GameSizeContext;
