import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './style/style.scss';
import { GameSizeProvider } from './context/GameSizeContext';
import { ArrayProvider } from './context/ArrayContext';

ReactDOM.render(
  <React.StrictMode>
    <GameSizeProvider gameSize={5}>
      <ArrayProvider array={['']}>
        <App />
      </ArrayProvider>
    </GameSizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
