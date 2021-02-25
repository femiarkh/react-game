export function checkInputLegibility(input: string) {
  return input.trim().match(/^[А-Яа-яЁ]$/);
}
