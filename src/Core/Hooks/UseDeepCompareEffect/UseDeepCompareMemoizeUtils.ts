export function shallowEqualArrays(
  arrA: any | unknown[],
  arrB: any | unknown[]
) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  const len: number = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (let i: number = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}
