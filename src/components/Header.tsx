import React from 'react';
import { useNewGame } from '../hooks/useNewGame';

const Header = () => {
  const { changeNewGame } = useNewGame();

  return (
    <div className="header">
      <h1 className="header__game-title">This... Is... BALDA!!!</h1>
      <button type="button" onClick={() => changeNewGame(true)}>Новая игра</button>
    </div>
  );
};

export { Header };
