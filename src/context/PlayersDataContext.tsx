import React, { useState } from 'react';
import { INITIAL_PLAYERS } from '../const/INITIAL_PLAYERS';

type PlayerData = {
  id: number;
  name: string;
  words: string[];
  score: number;
  isMoving: boolean;
  isWinner: false;
};

type Props = {
  children: React.ReactNode;
  playersData: PlayerData[];
};

const defaultPlayers = INITIAL_PLAYERS.map((player) =>
  JSON.parse(JSON.stringify(player))
);

const PlayersDataContext = React.createContext({
  playersData: defaultPlayers,
  changePlayersData: (values: PlayerData[]) => {},
});

export const PlayersDataProvider = ({ children, playersData }: Props) => {
  const [currentPlayersData, setCurrentPlayersData] = useState(playersData);

  const changePlayersData = (values: PlayerData[]) => {
    setCurrentPlayersData(values);
  };

  return (
    <PlayersDataContext.Provider
      value={{ playersData: currentPlayersData, changePlayersData }}
    >
      {children}
    </PlayersDataContext.Provider>
  );
};

export const PlayersDataConsumer = PlayersDataContext.Consumer;

export default PlayersDataContext;
