import React, { useState, useEffect, useRef } from 'react';
import { Letter } from './Letter';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { useMessage } from '../hooks/useMessage';
import { usePlayersData } from '../hooks/usePlayersData';
import { useNewGame } from '../hooks/useNewGame';
import { GAME_SIZES } from '../const/GAME_SIZES';
import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';
import { PASSES_BEFORE_FINISH } from '../const/PASSES_BEFORE_FINISH';
import { INITIAL_PLAYERS } from '../const/INITIAL_PLAYERS';
import { getPointsWord } from '../utils/getPointsWord';
import { getWinners } from '../utils/getWinners';
import { createInitialArray } from '../utils/createInitialArray';

function getShownWord(indexes:number[], array:{ value:string; id:string; }[]) {
  return indexes.map((index) => array[index].value).join('').toLowerCase();
}

type Props = {
  passCount: number;
  setPassCount: React.Dispatch<React.SetStateAction<number>>;
  showWord: boolean;
  setShowWord: React.Dispatch<React.SetStateAction<boolean>>;
  checkButtonClicked: boolean;
  setCheckButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  wrongShow: boolean;
  setWrongShow: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameBoard = ( { passCount, setPassCount,
  showWord, setShowWord,
  checkButtonClicked, setCheckButtonClicked,
  wrongShow, setWrongShow,
  setGameOver }: Props ) => {
  const { array, changeArray } = useArray();
  const { gameSize } = useGameSize();
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();
  const { newGame, changeNewGame } = useNewGame();
  const initialUsedIndexes = new Array(gameSize)
    .fill((array.length - gameSize) / 2)
    .map((item, index) => item + index);
  const initialWord = getShownWord(initialUsedIndexes, array);
  const [usedIndexes, setUsedIndexes] = useState(initialUsedIndexes);
  const [usedWords, setUsedWords] = useState([initialWord]);
  const [chosenIndex, setChosenIndex] = useState(-1);
  const [shownIndexes, setShownIndexes] = useState([-1]);

  const movingIndex = playersData.findIndex((player) => player.isMoving);

  useEffect(() => {
    if (newGame) {
      const newPlayers = INITIAL_PLAYERS
        .map((player) => JSON.parse(JSON.stringify(player)));
      changeArray(createInitialArray(gameSize));
      changePlayersData(newPlayers);
      setUsedIndexes(initialUsedIndexes);
      setShownIndexes([-1]);
      setChosenIndex(-1);
      changeMessage(`Ваш ход, ${newPlayers[0].name}`);
      changeNewGame(false);
    }
  }, [changeArray, changeMessage, changeNewGame,
    gameSize, initialUsedIndexes, movingIndex, newGame,
    playersData, changePlayersData]);

  useEffect(() => {
    if (showWord && boardRef.current) {
      Array.from(boardRef.current.children).forEach((input) => {
        input.classList.add('letter--show');
      });
    }
  }, [showWord]);

  useEffect(() => {
    if (checkButtonClicked && shownIndexes[0] !== -1) {
      const enterPress = new KeyboardEvent('keydown', { key: 'Enter' });
      window.dispatchEvent(enterPress);
      setCheckButtonClicked(false);
    }
  });

  useEffect(() => {
    function handleEnterPress(evt: KeyboardEvent) {
      if (showWord && evt.key === 'Enter' && shownIndexes[0] !== -1) {
        const resultWord = getShownWord(shownIndexes, array);
        const wordIsLegit = RUSSIAN_NOUNS.includes(resultWord);
        const wordIsUsed = usedWords.includes(resultWord);
        const chosenIsAtEnd = shownIndexes.includes(chosenIndex);
        if (wordIsLegit && !wordIsUsed && chosenIsAtEnd) {
          setUsedIndexes(usedIndexes.concat([chosenIndex]));
          setUsedWords(usedWords.concat([resultWord]));
          const newPlayersData = Array.from(playersData);
          if (newPlayersData[movingIndex].words[0] === '') {
            newPlayersData[movingIndex].words = [resultWord];
          } else {
            newPlayersData[movingIndex].words = newPlayersData[movingIndex]
              .words.concat([resultWord]);
          }
          newPlayersData[movingIndex].score += resultWord.length;
          newPlayersData[movingIndex].isMoving = false;
          if (array.length - usedIndexes.length !== 1) {
            const newMovingIndex = newPlayersData[movingIndex + 1] ?
              movingIndex + 1 : 0;
            newPlayersData[newMovingIndex].isMoving = true;
            changeMessage(`Отлично, ${playersData[movingIndex].name} – ${resultWord.length} ${getPointsWord(resultWord.length)} за слово «${resultWord}»! ${playersData[newMovingIndex].name}, теперь ваш ход.`);
          }
          changePlayersData(newPlayersData);
          setPassCount(0);
        } else {
          if (!chosenIsAtEnd) {
            changeMessage('Слово должно содержать добавленную букву. Давайте заново.');
          } else if (wordIsUsed) {
            changeMessage(`Извините, слово «${resultWord}» уже использовалось. Давайте заново.`);
          } else {
            changeMessage(`Извините, слова «${resultWord}» не нашлось в моём словаре. Давайте заново.`);
          }
          array[chosenIndex].value = '';
        }
        setShowWord(false);
        setChosenIndex(-1);
        setShownIndexes([-1]);
        if (boardRef.current) {
          Array.from(boardRef.current.children).forEach((input) => {
            input.classList.remove('letter--highlighted');
            input.classList.remove('letter--show');
          });
        }
      }
    }

    window.addEventListener('keydown', handleEnterPress);
    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [showWord, array, shownIndexes, changeMessage,
    usedIndexes, usedWords, chosenIndex, changePlayersData,
    movingIndex, playersData, setPassCount, setShowWord]);

  useEffect(() => {
    if (wrongShow) {
      array[chosenIndex].value = '';
      setChosenIndex(-1);
      setShowWord(false);
      setWrongShow(false);
      setShownIndexes([-1]);

      if (boardRef.current) {
        Array.from(boardRef.current.children).forEach((input) => {
          input.classList.remove('letter--highlighted');
          input.classList.remove('letter--show');
        });
      }

    }
  }, [wrongShow, array, chosenIndex, setShowWord, setWrongShow]);

  useEffect(() => {
    if (usedIndexes.length === array.length ||
      passCount === playersData.length * PASSES_BEFORE_FINISH) {
      let winMessage;
      const winners = getWinners(playersData);
      if (winners.length === 0) {
        winMessage = 'Победила дружба!';
      } else {
        winMessage = `С победой, ${winners.join(', ')}!`;
      }
      changeMessage(`Игра окончена. ${winMessage}`);
      setGameOver(true);
    }
  }, [usedIndexes.length, array.length,
    changeMessage, playersData, passCount, setGameOver]);

  const letters = array
    .map((item, index) => <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      disabled={usedIndexes.includes(index) && !showWord ||
        passCount === playersData.length * PASSES_BEFORE_FINISH ||
        showWord && item.value === ''}
      setChosenIndex={setChosenIndex}
      showWord={showWord}
      setShowWord={setShowWord}
      setWrongShow={setWrongShow}
      shownIndexes={shownIndexes}
      setShownIndexes={setShownIndexes}
    />);

  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`game-board game-board-${GAME_SIZES[gameSize]}`} ref={boardRef}>
      { letters }
    </div>
  );
};

export { GameBoard };
