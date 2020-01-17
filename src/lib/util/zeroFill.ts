export function zerofill(input: number, size: number = 2) {
  let toReturn = String(input);
  while (toReturn.length < size) {
    toReturn = "0" + toReturn;
  }
  return toReturn;
}
