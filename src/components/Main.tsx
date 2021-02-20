import React from 'react';
import { Message } from './Message';
import { GameContainer } from './GameContainer';

const Main = () => (
  <div className="main">
    <Message />
    <GameContainer />
  </div>
);

export { Main };
