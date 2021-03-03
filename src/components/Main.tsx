import React, { useRef } from 'react';
import { Message } from './Message';
import { GameContainer } from './GameContainer';
import { NewGameForm } from './NewGameForm';

const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const goFullScreen = () => {
    if (mainRef.current) {
      mainRef.current.requestFullscreen();
    }
  };
  return (
    <div ref={mainRef} className="main">
      <Message />
      <GameContainer goFullScreen={goFullScreen} />
      <NewGameForm />
    </div>
  );
};

export { Main };
