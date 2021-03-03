import React, { useState } from 'react';
import { useNewGame } from '../hooks/useNewGame';
import { Records } from './Records';

const Header = () => {
  const { changeNewGame } = useNewGame();
  const [recordsVisible, setRecordsVisible] = useState(false);

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
        <button
          type="button"
          onClick={() => setRecordsVisible((visible) => !visible)}
        >
          Рекорды
        </button>
      </div>
      <Records visible={recordsVisible} setVisible={setRecordsVisible} />
    </div>
  );
};

export { Header };
