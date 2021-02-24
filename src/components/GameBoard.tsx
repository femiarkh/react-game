import React, { useState, useEffect, useRef } from 'react';
import { Letter } from './Letter';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { useMessage } from '../hooks/useMessage';
import { GAME_SIZES } from '../const/GAME_SIZES';
import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';

function getShownWord(indexes:number[], array:{ value:string; id:string; }[]) {
  return indexes.map((index) => array[index].value).join('').toLowerCase();
}

function getPointsWord(length: number) {
  let word;
  switch (length) {
    case 1:
      word = 'очко';
      break;
    case 2:
      word = 'очка';
      break;
    case 3:
      word = 'очка';
      break;
    case 4:
      word = 'очка';
      break;
    default:
      word = 'очков';
  }
  return word;
}

const GameBoard = () => {
  const { array } = useArray();
  const { gameSize } = useGameSize();
  const { changeMessage } = useMessage();
  const initialUsedIndexes = new Array(gameSize)
    .fill((array.length - gameSize) / 2)
    .map((item, index) => item + index);
  const initialWord = getShownWord(initialUsedIndexes, array);
  const [usedIndexes, setUsedIndexes] = useState(initialUsedIndexes);
  const [usedWords, setUsedWords] = useState([initialWord]);
  const [chosenIndex, setChosenIndex] = useState(-1);
  const [showWord, setShowWord] = useState(false);
  const [wrongShow, setWrongShow] = useState(false);
  const [shownIndexes, setShownIndexes] = useState([-1]);

  useEffect(() => {
    if (showWord && boardRef.current) {
      console.log('show word mode is on');
      Array.from(boardRef.current.children).forEach((input) => {
        input.classList.add('letter--show');
      });
    }
  }, [showWord]);

  useEffect(() => {
    function handleEnterPress(evt: KeyboardEvent) {
      if (showWord && evt.key === 'Enter') {
        const resultWord = getShownWord(shownIndexes, array);
        const wordIsLegit = RUSSIAN_NOUNS.includes(resultWord);
        const wordIsUsed = usedWords.includes(resultWord);
        const chosenIsAtEnd = shownIndexes[0] === chosenIndex ||
          shownIndexes[shownIndexes.length - 1] === chosenIndex;
        if (wordIsLegit && !wordIsUsed && chosenIsAtEnd) {
          changeMessage(`Отлично! За слово «${resultWord}» вы получаете ${resultWord.length} ${getPointsWord(resultWord.length)}.`);
          setUsedIndexes(usedIndexes.concat([chosenIndex]));
          setUsedWords(usedWords.concat([resultWord]));
        } else {
          if (!chosenIsAtEnd) {
            changeMessage('Слово должно начинаться или заканчиваться на добавленную букву. Давайте заново.');
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
    usedIndexes, usedWords, chosenIndex]);

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

      console.log('show word mode is off');
    }
  }, [wrongShow, array, chosenIndex]);

  const letters = array
    .map((item, index) => <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      disabled={usedIndexes.includes(index) && !showWord}
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
