import React from 'react';
import { useNewGame } from '../hooks/useNewGame';

const Header = () => {
  const { changeNewGame } = useNewGame();

  return (
    <div className="header">
      <h1 className="header__game-title">This... Is... BALDA!!!</h1>
      <div className="header__buttons">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('balda-save');
            changeNewGame(true);
          }}
        >
          Новая игра
        </button>
        <button type="button">Рекорды</button>
      </div>
    </div>
  );
};

export { Header };
