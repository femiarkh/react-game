import React from 'react';
import { usePlayersData } from '../hooks/usePlayersData';
import { useMessage } from '../hooks/useMessage';

type Props = {
  passCount: number;
  setPassCount: React.Dispatch<React.SetStateAction<number>>;
  showWord: boolean;
  setCheckButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongShow: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
};

const ButtonsContainer = ({ passCount, setPassCount,
  showWord, setCheckButtonClicked,
  setWrongShow, gameOver }: Props) => {
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();

  function handlePassClick() {
    if (showWord) {
      setWrongShow(true);
    }
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

    setPassCount((passes) => passes + 1);
  }

  function handleCheckClick() {
    setCheckButtonClicked(true);
  }

  return (
    <div className="buttons-container">
      <button
        type="button"
        onClick={handleCheckClick}
        disabled={!showWord || gameOver}
      >
        Проверить
      </button>
      <button
        type="button"
        onClick={handlePassClick}
        disabled={gameOver}
      >
        Пропустить
      </button>
    </div>
  );
};

export { ButtonsContainer };

