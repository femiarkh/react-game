import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/style.scss';
import { GameSizeProvider } from './context/GameSizeContext';
import { ArrayProvider } from './context/ArrayContext';
import { MessageProvider } from './context/MessageContext';
import { PlayersDataProvider } from './context/PlayersDataContext';

const players = [
  {
    id: 0,
    name: 'Игрок1',
    words:[''],
    score: 0,
    isMoving: true
  },
  {
    id: 1,
    name: 'Игрок2',
    words:[''],
    score: 0,
    isMoving: false
  },
];

ReactDOM.render(
  <React.StrictMode>
    <GameSizeProvider gameSize={5}>
      <ArrayProvider array={['']}>
        <MessageProvider message={`Ваш ход, ${players[0].name}.`}>
          <PlayersDataProvider playersData={players}>
            <App />
          </PlayersDataProvider>
        </MessageProvider>
      </ArrayProvider>
    </GameSizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
