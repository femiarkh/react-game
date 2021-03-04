export function checkInputPossibility(index: number, array: {
  value: string;
  id: string;
}[], size: number) {
  if (array[index - size] && array[index - size].value !== ''
  || array[index + size] && array[index + size].value !== ''
  || array[index + 1] && (array[index + 1].value !== '' && (index + 1) % size !== 0)
  || array[index - 1] && (array[index - 1].value !== '' && index % size !== 0)) return true;
  return false;
}
