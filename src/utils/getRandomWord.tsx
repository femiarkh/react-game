import { RUSSIAN_NOUNS } from '../const/RUSSIAN_NOUNS';

export function getRandomWord(size: number):string {
  const word = RUSSIAN_NOUNS[Math.floor(Math.random() * RUSSIAN_NOUNS.length)];
  if (word.length !== size) {
    return getRandomWord(size);
  }
  return word.toUpperCase();
}
