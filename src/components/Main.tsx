import React from 'react';
import { Message } from './Message';
import { GameContainer } from './GameContainer';
import { NewGameForm } from './NewGameForm';
import { Records } from './Records';

const Main = () => (
  <div className="main">
    <Message />
    <GameContainer />
    <NewGameForm />
    <Records />
  </div>
);

export { Main };
