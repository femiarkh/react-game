import { useContext } from 'react';
import PlayersDataContext from '../context/PlayersDataContext';

const usePlayersData = () => {
  const context = useContext(PlayersDataContext);

  return context;
};

export { usePlayersData };
