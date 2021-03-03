import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { ButtonsContainer } from './ButtonsContainer';
import { ScoreContainer } from './ScoreContainer';
import { useNewGame } from '../hooks/useNewGame';

const GameContainer = ({ goFullScreen }: { goFullScreen: () => void }) => {
  const [passCount, setPassCount] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [checkButtonClicked, setCheckButtonClicked] = useState(false);
  const [wrongShow, setWrongShow] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { newGame } = useNewGame();

  useEffect(() => {
    if (newGame) {
      setPassCount(0);
      setShowWord(false);
      setCheckButtonClicked(false);
      setWrongShow(false);
      setGameOver(false);
    }
  }, [
    setPassCount,
    setShowWord,
    setCheckButtonClicked,
    setWrongShow,
    setGameOver,
    newGame,
  ]);

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
