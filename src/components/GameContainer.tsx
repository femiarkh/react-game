import React, { useState } from 'react';
import { GameBoard } from './GameBoard';
import { ButtonsContainer } from './ButtonsContainer';
import { ScoreContainer } from './ScoreContainer';

const GameContainer = () => {
  const [passCount, setPassCount] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [checkButtonClicked, setCheckButtonClicked] = useState(false);
  const [wrongShow, setWrongShow] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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
