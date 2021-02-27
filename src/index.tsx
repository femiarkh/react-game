import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/style.scss';
import { GameSizeProvider } from './context/GameSizeContext';
import { ArrayProvider } from './context/ArrayContext';
import { MessageProvider } from './context/MessageContext';
import { PlayersDataProvider } from './context/PlayersDataContext';
import { NewGameProvider } from './context/NewGameContext';
import { INITIAL_PLAYERS } from './const/INITIAL_PLAYERS';

const players = INITIAL_PLAYERS
  .map((player) => JSON.parse(JSON.stringify(player)));

ReactDOM.render(
  <React.StrictMode>
    <GameSizeProvider gameSize={3}>
      <ArrayProvider array={['']}>
        <MessageProvider message={`Ваш ход, ${players[0].name}.`}>
          <PlayersDataProvider playersData={players}>
            <NewGameProvider newGame={false}>
              <App />
            </NewGameProvider>
          </PlayersDataProvider>
        </MessageProvider>
      </ArrayProvider>
    </GameSizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
