import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { ButtonsContainer } from './ButtonsContainer';
import { ScoreContainer } from './ScoreContainer';
import { useNewGame } from '../hooks/useNewGame';
import { usePlayersData } from '../hooks/usePlayersData';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { createInitialArray } from '../utils/createInitialArray';

const GameContainer = ({ goFullScreen }: { goFullScreen: () => void }) => {
  const [passCount, setPassCount] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [checkButtonClicked, setCheckButtonClicked] = useState(false);
  const [wrongShow, setWrongShow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { newGame } = useNewGame();
  const { playersData } = usePlayersData();
  const { changeArray } = useArray();
  const { gameSize } = useGameSize();

  useEffect(() => {
    if (newGame) {
      setPassCount(0);
      setShowWord(false);
      setCheckButtonClicked(false);
      setWrongShow(false);
      setGameOver(false);
      playersData.forEach((player) => {
        const thePlayer = player;
        thePlayer.isWinner = false;
      });
      changeArray(createInitialArray(gameSize));
    }
  }, [newGame]);

  if (newGame) {
    return null;
  }

  return (
    <div className="game-container">
      <div className="game-container__game-field">
        <ButtonsContainer
          passCount={passCount}
          setPassCount={setPassCount}
          showWord={showWord}
          setCheckButtonClicked={setCheckButtonClicked}
          setWrongShow={setWrongShow}
          gameOver={gameOver}
          goFullScreen={goFullScreen}
        />

        <GameBoard
          passCount={passCount}
          setPassCount={setPassCount}
          showWord={showWord}
          setShowWord={setShowWord}
          checkButtonClicked={checkButtonClicked}
          setCheckButtonClicked={setCheckButtonClicked}
          wrongShow={wrongShow}
          setWrongShow={setWrongShow}
          setGameOver={setGameOver}
        />
      </div>
      <ScoreContainer />
    </div>
  );
};

export { GameContainer };
