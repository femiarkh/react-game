import React from 'react';
import { usePlayersData } from '../hooks/usePlayersData';
import { useMessage } from '../hooks/useMessage';

const ButtonsContainer = () => {
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();
  function handlePassClick() {
    const movingIndex = playersData.findIndex((player) => player.isMoving);
    const newPlayersData = Array.from(playersData);
    newPlayersData[movingIndex].isMoving = false;
    const newMovingIndex = newPlayersData[movingIndex + 1] ?
      movingIndex + 1 : 0;
    newPlayersData[newMovingIndex].isMoving = true;
    changeMessage(`${newPlayersData[movingIndex].name} пропускает ход. Ваш ход, ${newPlayersData[newMovingIndex].name}!`);
    changePlayersData(newPlayersData);
  }
  return (
    <div className="buttons-container">
      <button type="button" onClick={handlePassClick}>Пропустить</button>
    </div>
  );
};

export { ButtonsContainer };

