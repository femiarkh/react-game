import React, { useState } from 'react';

type PlayerData = {
  id: number;
  name: string;
  words: string[];
  score: number;
  isMoving: boolean;
};

type Props = {
  children: React.ReactNode;
  playersData: PlayerData[];
};

const DEFAULT_PLAYERS_DATA = [{ id: 0, name: 'Игрок1', words:[''], score: 0, isMoving: true }, { id: 1, name: 'Игрок2', words:[''], score: 0, isMoving: false }];

const PlayersDataContext = React.createContext({
  playersData: DEFAULT_PLAYERS_DATA,
  changePlayersData: (values: PlayerData[]) => {} });

export const PlayersDataProvider = ({ children, playersData }: Props) => {
  const [currentPlayersData, setCurrentPlayersData] = useState(
    playersData || DEFAULT_PLAYERS_DATA
  );

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
