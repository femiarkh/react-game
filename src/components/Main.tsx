import React from 'react';
import { Message } from './Message';
import { GameContainer } from './GameContainer';
import { NewGameForm } from './NewGameForm';

const Main = () => (
  <div className="main">
    <Message />
    <GameContainer />
    <NewGameForm />
  </div>
);

export { Main };
