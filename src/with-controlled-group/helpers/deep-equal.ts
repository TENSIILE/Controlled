/**@internal */
export const deepEqual = <T extends { [key in keyof T]: unknown }>(x: T, y: T): boolean => {
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);

    if (xKeys.length === yKeys.length) {
      return xKeys.reduce((isEqual, key) => {
        return isEqual && deepEqual(x[key as keyof T], y[key as keyof T]);
      }, true);
    }
  }

  if (Array.isArray(x) && Array.isArray(y)) {
    const predicate = (value: unknown) => String(value);

    return x.map(predicate).toString() === y.map(predicate).toString();
  }

  return x === y;
};
