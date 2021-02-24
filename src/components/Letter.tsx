import React, { useRef } from 'react';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { useMessage } from '../hooks/useMessage';
import { checkInputPossibility } from '../utils/checkInputPossibility';
import { checkInputLegibility } from '../utils/checkInputLegibility';

type Props = {
  value: string;
  index: number;
  disabled: boolean;
  setChosenIndex: React.Dispatch<React.SetStateAction<number>>;
  showWord: boolean;
  setShowWord: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongShow: React.Dispatch<React.SetStateAction<boolean>>;
  shownIndexes: number[];
  setShownIndexes: React.Dispatch<React.SetStateAction<number[]>>;
};

const Letter = ({
  value, index, disabled, showWord,
  setChosenIndex, setShowWord, setWrongShow,
  shownIndexes, setShownIndexes }: Props) => {
  const { array, changeArray } = useArray();
  const { gameSize } = useGameSize();
  const { changeMessage } = useMessage();

  function handleBlur(evt: React.ChangeEvent<HTMLInputElement>) {
    if (checkInputPossibility(index, array, gameSize)
     && checkInputLegibility(evt.target.value)) {
      changeMessage('Чудненько! Теперь выберите слово.');
      setChosenIndex(index);
      setShowWord(true);
      return;
    }
    if (!checkInputLegibility(evt.target.value)) {
      if (evt.target.value !== '') {
        changeMessage('Неверный ввод: допустима лишь 1 русская буква.');
      }
    } else {
      changeMessage('Извините, сюда вводить нельзя.');
    }
    const newArray = Array.from(array);
    newArray[index].value = '';
    changeArray(newArray);
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const newArray = Array.from(array);
    newArray[index].value = evt.target.value.toUpperCase();
    changeArray(newArray);
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement> ) {
    if (evt.key === 'Enter' && inputRef.current) {
      inputRef.current.blur();
    }
  }

  function handleMouseDown(evt: React.MouseEvent<HTMLInputElement,
  MouseEvent>) {
    if (showWord) {
      evt.preventDefault();
    }
  }

  function handleClick(evt: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    if (showWord && inputRef.current) {
      const input = inputRef.current;
      if (input.value === '') {
        changeMessage('Выбор слова был прерван. Давайте заново.');
        setWrongShow(true);
      } else if (shownIndexes[0] === -1) {
        input.classList.add('letter--highlighted');
        setShownIndexes([index]);
      } else {
        const lastIndex = shownIndexes[shownIndexes.length - 1];
        const indexDiff = Math.abs(index - lastIndex);
        if (indexDiff !== 1 && indexDiff !== gameSize) {
          changeMessage('Буквы должны идти по порядку. Давайте заново.');
          setWrongShow(true);
        } else {
          input.classList.add('letter--highlighted');
          setShownIndexes(shownIndexes.concat([index]));
        }
      }
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return <input className="letter" type="text" data-id={index} onChange={handleChange} value={value} onBlur={handleBlur} onKeyDown={handleKeyDown} disabled={disabled} ref={inputRef} onMouseDown={handleMouseDown} onClick={handleClick} />;
};

export { Letter };
