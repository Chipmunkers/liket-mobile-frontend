export const findLowestMissingNumber = (arr: number[]): number => {
  const numberSet = new Set<number>();

  arr.forEach((num) => {
    if (num >= 0 && num <= 9) {
      numberSet.add(num);
    }
  });

  for (let i = 0; i <= 9; i++) {
    if (!numberSet.has(i)) {
      return i;
    }
  }

  return 10;
};
