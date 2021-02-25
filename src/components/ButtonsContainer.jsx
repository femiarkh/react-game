import React from 'react';
import { usePlayersData } from '../hooks/usePlayersData';
import { useMessage } from '../hooks/useMessage';
import { PASSES_BEFORE_FINISH } from '../const/PASSES_BEFORE_FINISH';

const ButtonsContainer = ({ passCount, setPassCount }) => {
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();
  function handlePassClick() {
    const movingIndex = playersData.findIndex((player) => player.isMoving);
    const newPlayersData = Array.from(playersData);
    newPlayersData[movingIndex].isMoving = false;
    if (passCount !== playersData.length * 3 - 1) {
      const newMovingIndex = newPlayersData[movingIndex + 1] ?
        movingIndex + 1 : 0;
      newPlayersData[newMovingIndex].isMoving = true;
      changeMessage(`${newPlayersData[movingIndex].name} пропускает ход. Ваш ход, ${newPlayersData[newMovingIndex].name}!`);
    }
    changePlayersData(newPlayersData);

    setPassCount(passCount + 1);
  }
  return (
    <div className="buttons-container">
      <button type="button" onClick={handlePassClick} disabled={passCount === playersData.length * PASSES_BEFORE_FINISH}>Пропустить</button>
    </div>
  );
};

export { ButtonsContainer };

