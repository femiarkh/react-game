import React, { useRef } from 'react';
import { useArray } from '../hooks/useArray';
import { useGameSize } from '../hooks/useGameSize';
import { useMessage } from '../hooks/useMessage';

type Props = {
  value: string;
  index: number;
  disabled: boolean;
  usedIndexes: number[];
  setUsedIndexes: React.Dispatch<React.SetStateAction<number[]>>;
};

function isInputPossible(index: number, array: {
  value: string;
  id: string;
}[], size: number) {
  if (array[index - size] && array[index - size].value !== ''
  || array[index + size] && array[index + size].value !== ''
  || array[index + 1] && (array[index + 1].value !== '' && (index + 1) % size !== 0)
  || array[index - 1] && (array[index - 1].value !== '' && index % size !== 0)) return true;
  return false;
}

function isInputLegit(input: string) {
  return input.trim().match(/^[А-Яа-я]$/);
}

const Letter = ({
  value, index, disabled, usedIndexes, setUsedIndexes }: Props) => {
  const { array, changeArray } = useArray();
  const { gameSize } = useGameSize();
  const { changeMessage } = useMessage();

  function handleBlur(evt: React.ChangeEvent<HTMLInputElement>) {
    if (isInputPossible(index, array, gameSize)
     && isInputLegit(evt.target.value)) {
      changeMessage('Чудненько! Теперь выберите слово.');
      setUsedIndexes(usedIndexes.concat([index]));
      return;
    }
    if (!isInputLegit(evt.target.value)) {
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

  const inputRef = useRef<HTMLInputElement>(null);

  return <input className="letter" type="text" onChange={handleChange} value={value} onBlur={handleBlur} onKeyDown={handleKeyDown} disabled={disabled} ref={inputRef} />;
};

export { Letter };
