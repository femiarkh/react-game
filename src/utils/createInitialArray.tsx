import { getRandomWord } from './getRandomWord';

export function createInitialArray(size: number) {
  const freeCellsNumber = (size ** 2 - size) / 2;
  const emptyArray = new Array(freeCellsNumber).fill('');
  return emptyArray
    .concat(getRandomWord(size).split(''))
    .concat(emptyArray)
    .map((item, index) => ({ value: item, id: index.toString() }) );
}
