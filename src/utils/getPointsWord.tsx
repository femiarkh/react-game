export function getPointsWord(length: number) {
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
