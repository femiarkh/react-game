import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Letter } from './Letter';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { useMessage } from '../hooks/useMessage';
import { usePlayersData } from '../hooks/usePlayersData';
import { GAME_SIZES } from '../const/GAME_SIZES';
import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';
import { PASSES_BEFORE_FINISH } from '../const/PASSES_BEFORE_FINISH';
import { getPointsWord } from '../utils/getPointsWord';
import { getWinners } from '../utils/getWinners';
import { END_LINK, FAILURE_LINK, SUCCESS_LINK } from '../const/AUDIO_LINKS';
import { useAudioSettings } from '../hooks/useAudioSettings';

function getShownWord(
  indexes: number[],
  array: { value: string; id: string }[]
) {
  return indexes
    .map((index) => array[index].value)
    .join('')
    .toLowerCase();
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

const GameBoard = ({
  passCount,
  setPassCount,
  showWord,
  setShowWord,
  checkButtonClicked,
  setCheckButtonClicked,
  wrongShow,
  setWrongShow,
  setGameOver,
}: Props) => {
  const { array } = useArray();
  const { gameSize } = useGameSize();
  const { changeMessage } = useMessage();
  const { playersData, changePlayersData } = usePlayersData();
  const { audioSettings } = useAudioSettings();
  const initialUsedIndexes = new Array(gameSize)
    .fill((array.length - gameSize) / 2)
    .map((item, index) => item + index);
  const initialWord = getShownWord(initialUsedIndexes, array);
  const [usedIndexes, setUsedIndexes] = useState(initialUsedIndexes);
  const [usedWords, setUsedWords] = useState([initialWord]);
  const [chosenIndex, setChosenIndex] = useState(-1);
  const [shownIndexes, setShownIndexes] = useState([-1]);

  const movingIndex = playersData.findIndex((player) => player.isMoving);

  const playSound = useCallback(
    (soundLink: string) => {
      if (audioSettings.soundOn && audioRef.current) {
        audioRef.current.src = soundLink;
        audioRef.current.volume = audioSettings.soundVolume;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    },
    [audioSettings.soundOn, audioSettings.soundVolume]
  );

  useEffect(() => {
    const savedGame = localStorage.getItem('balda-save');
    if (savedGame) {
      const parsedSavedData = JSON.parse(savedGame);
      const parsedSavedArray: { value: string; id: string }[] =
        parsedSavedData.array;
      const savedUsedIndexes: number[] = [];
      parsedSavedArray.forEach((item, index) => {
        if (item.value.trim() !== '') {
          savedUsedIndexes.push(index);
        }
      });
      setUsedIndexes(savedUsedIndexes);
      setUsedWords(parsedSavedData.usedWords);
    } else {
      setUsedIndexes(initialUsedIndexes);
    }
    setShownIndexes([-1]);
    setChosenIndex(-1);
  }, []);

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
        const chosenIsIncluded = shownIndexes.includes(chosenIndex);
        if (wordIsLegit && !wordIsUsed && chosenIsIncluded) {
          if (boardRef.current) {
            Array.from(boardRef.current.children)
              .filter((letter, index) => shownIndexes.includes(index))
              .forEach((letter) => {
                letter.classList.add('letter--success');
              });
          }
          setUsedIndexes(usedIndexes.concat([chosenIndex]));
          const updatedUsedWords = usedWords.concat([resultWord]);
          setUsedWords(updatedUsedWords);
          const newPlayersData = Array.from(playersData);
          if (newPlayersData[movingIndex].words[0] === '') {
            newPlayersData[movingIndex].words = [resultWord];
          } else {
            newPlayersData[movingIndex].words = newPlayersData[
              movingIndex
            ].words.concat([resultWord]);
          }
          newPlayersData[movingIndex].score += resultWord.length;
          newPlayersData[movingIndex].isMoving = false;
          if (array.length - usedIndexes.length !== 1) {
            const newMovingIndex = newPlayersData[movingIndex + 1]
              ? movingIndex + 1
              : 0;
            newPlayersData[newMovingIndex].isMoving = true;
            changeMessage(
              `Отлично, ${playersData[movingIndex].name} – ${
                resultWord.length
              } ${getPointsWord(resultWord.length)} за слово «${resultWord}»! ${
                playersData[newMovingIndex].name
              }, теперь ваш ход.`
            );
          }
          changePlayersData(newPlayersData);
          localStorage.setItem(
            'balda-save',
            JSON.stringify({ playersData, array, usedWords: updatedUsedWords })
          );
          setPassCount(0);
          if (array.length - usedIndexes.length !== 1) {
            playSound(SUCCESS_LINK);
          }
        } else {
          if (boardRef.current) {
            Array.from(boardRef.current.children)
              .filter((letter, index) => shownIndexes.includes(index))
              .forEach((letter) => {
                letter.classList.add('letter--failure');
              });
          }
          if (!chosenIsIncluded) {
            changeMessage(
              'Слово должно содержать добавленную букву. Давайте заново.'
            );
          } else if (wordIsUsed) {
            changeMessage(
              `Извините, слово «${resultWord}» уже использовалось. Давайте заново.`
            );
          } else {
            changeMessage(
              `Извините, слова «${resultWord}» не нашлось в моём словаре. Давайте заново.`
            );
          }
          array[chosenIndex].value = '';
          playSound(FAILURE_LINK);
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
  }, [
    showWord,
    array,
    shownIndexes,
    changeMessage,
    usedIndexes,
    usedWords,
    chosenIndex,
    changePlayersData,
    movingIndex,
    playersData,
    setPassCount,
    setShowWord,
    playSound,
  ]);

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

  const storeRecords = useCallback(
    (
      winners: {
        id: number;
        name: string;
        words: string[];
        score: number;
        isMoving: boolean;
      }[]
    ) => {
      const storedRecords = localStorage.getItem('balda-records');
      if (storedRecords) {
        const parsedRecords: [string, number][] = JSON.parse(storedRecords);
        winners.forEach((winner) => {
          const sameRecord = parsedRecords.find(
            (item) => item[0] === winner.name && item[1] === winner.score
          );
          if (!sameRecord) {
            parsedRecords.push([winner.name, winner.score]);
          }
        });
        parsedRecords.sort((a, b) => b[1] - a[1]);
        if (parsedRecords.length > 10) {
          parsedRecords.splice(10);
        }
        localStorage.setItem('balda-records', JSON.stringify(parsedRecords));
      } else {
        const newRecords: [string, number][] = [];
        winners.forEach((winner) => {
          newRecords.push([winner.name, winner.score]);
        });
        localStorage.setItem('balda-records', JSON.stringify(newRecords));
      }
    },
    []
  );

  useEffect(() => {
    if (
      usedIndexes.length === array.length ||
      passCount === playersData.length * PASSES_BEFORE_FINISH
    ) {
      let winMessage;
      const winners = getWinners(playersData);
      const winnersID = winners.map((winner) => winner.id);
      playersData.forEach((player) => {
        if (winnersID.includes(player.id)) {
          const thePlayer = player;
          thePlayer.isWinner = true;
        }
      });
      if (winners.length === 0) {
        winMessage = 'Победила дружба!';
      } else {
        const winnersNames = winners.reduce(
          (result: string[], winner) => [...result, winner.name],
          []
        );
        winMessage = `С победой, ${winnersNames.join(', ')}!`;
        storeRecords(winners);
      }
      changeMessage(`Игра окончена. ${winMessage}`);
      setGameOver(true);
      localStorage.removeItem('balda-save');
      playSound(END_LINK);
    }
  }, [
    usedIndexes.length,
    array.length,
    changeMessage,
    playersData,
    passCount,
    setGameOver,
    storeRecords,
    playSound,
  ]);

  const letters = array.map((item, index) => (
    <Letter
      key={item.id}
      index={+item.id}
      value={item.value}
      disabled={
        (usedIndexes.includes(index) && !showWord) ||
        passCount === playersData.length * PASSES_BEFORE_FINISH ||
        (showWord && item.value === '')
      }
      setChosenIndex={setChosenIndex}
      showWord={showWord}
      setShowWord={setShowWord}
      setWrongShow={setWrongShow}
      shownIndexes={shownIndexes}
      setShownIndexes={setShownIndexes}
      playSound={playSound}
    />
  ));

  const boardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div
      className={`game-board game-board-${GAME_SIZES[gameSize]}`}
      ref={boardRef}
    >
      {letters}
      <audio ref={audioRef}>
        <track kind="captions" />
      </audio>
    </div>
  );
};

export { GameBoard };
