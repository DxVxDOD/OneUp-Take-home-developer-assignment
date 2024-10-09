export function isNumber(num: unknown): num is number {
  return typeof num === "number" || num instanceof Number;
}

export function numberParser(num: unknown) {
  if (num === 0) {
    return num;
  }

  if (!num || !isNumber(num)) {
    throw Error(`${num} is not a number`);
  }

  return num;
}
