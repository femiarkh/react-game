import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/style.scss';
import { GameSizeProvider } from './context/GameSizeContext';
import { ArrayProvider } from './context/ArrayContext';
import { MessageProvider } from './context/MessageContext';

ReactDOM.render(
  <React.StrictMode>
    <GameSizeProvider gameSize={5}>
      <ArrayProvider array={['']}>
        <MessageProvider message='Ваш ход'>
          <App />
        </MessageProvider>
      </ArrayProvider>
    </GameSizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
