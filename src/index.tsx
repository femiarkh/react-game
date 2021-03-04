import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/style.scss';
import { GameSizeProvider } from './context/GameSizeContext';
import { ArrayProvider } from './context/ArrayContext';
import { MessageProvider } from './context/MessageContext';
import { PlayersDataProvider } from './context/PlayersDataContext';
import { NewGameProvider } from './context/NewGameContext';
import { AudioSettingsProvider } from './context/AudioSettingsContext';
import { INITIAL_PLAYERS } from './const/INITIAL_PLAYERS';

const defaultPlayers = INITIAL_PLAYERS.map((player) =>
  JSON.parse(JSON.stringify(player))
);

const defaultAudioSettings = {
  musicOn: false,
  musicVolume: 1.0,
  soundOn: false,
  soundVolume: 1.0,
};

ReactDOM.render(
  <React.StrictMode>
    <GameSizeProvider gameSize={5}>
      <ArrayProvider array={['']}>
        <MessageProvider message="">
          <PlayersDataProvider playersData={defaultPlayers}>
            <NewGameProvider newGame={true}>
              <AudioSettingsProvider audioSettings={defaultAudioSettings}>
                <App />
              </AudioSettingsProvider>
            </NewGameProvider>
          </PlayersDataProvider>
        </MessageProvider>
      </ArrayProvider>
    </GameSizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
