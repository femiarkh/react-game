import React, { useState, useEffect } from 'react';
import { usePlayersData } from '../hooks/usePlayersData';
import { useMessage } from '../hooks/useMessage';
import { ReactComponent as Fullscreen } from '../assets/icons/fullscreen.svg';
import { ReactComponent as ExitFullscreen } from '../assets/icons/fullscreen_exit.svg';

type Props = {
  passCount: number;
  setPassCount: React.Dispatch<React.SetStateAction<number>>;
  showWord: boolean;
  setCheckButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongShow: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  goFullScreen: () => void;
};

const ButtonsContainer = ({
  passCount,
  setPassCount,
  showWord,
  setCheckButtonClicked,
  setWrongShow,
  gameOver,
  goFullScreen,
}: Props) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();

  useEffect(() => {
    function handleFullScreenChange() {
      if (document.fullscreenElement === null) {
        setFullScreen(false);
      } else {
        setFullScreen(true);
      }
    }

    document.onfullscreenchange = handleFullScreenChange;
    return () => {
      document.onfullscreenchange = null;
    };
  }, []);

  function handlePassClick() {
    if (showWord) {
      setWrongShow(true);
    }
    const movingIndex = playersData.findIndex((player) => player.isMoving);
    const newPlayersData = Array.from(playersData);
    newPlayersData[movingIndex].isMoving = false;
    if (passCount !== playersData.length * 3 - 1) {
      const newMovingIndex = newPlayersData[movingIndex + 1]
        ? movingIndex + 1
        : 0;
      newPlayersData[newMovingIndex].isMoving = true;
      changeMessage(
        `${newPlayersData[movingIndex].name} пропускает ход. Ваш ход, ${newPlayersData[newMovingIndex].name}!`
      );
    }
    changePlayersData(newPlayersData);

    setPassCount((passes) => passes + 1);
  }

  function handleCheckClick() {
    setCheckButtonClicked(true);
  }

  function handleFullScreen() {
    if (!fullScreen) {
      goFullScreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
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
      <button type="button" onClick={handlePassClick} disabled={gameOver}>
        Пропустить
      </button>
      <button
        className="fullscreen-button"
        type="button"
        onClick={handleFullScreen}
      >
        {fullScreen ? <ExitFullscreen /> : <Fullscreen />}
      </button>
    </div>
  );
};

export { ButtonsContainer };
