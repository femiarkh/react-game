import { useContext } from 'react';
import NewGameContext from '../context/NewGameContext';

const useNewGame = () => {
  const context = useContext(NewGameContext);

  return context;
};

export { useNewGame };
