import { useContext } from 'react';
import GameSizeContext from '../context/GameSizeContext';

const useGameSize = () => {
  const context = useContext(GameSizeContext);

  return context;
};

export { useGameSize };
