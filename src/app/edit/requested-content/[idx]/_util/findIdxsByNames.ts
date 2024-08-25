export const findIdxsByNames = (
  list: ReadonlyArray<{ idx: number; name: string }>,
  names: string[]
): number[] => {
  const results: number[] = [];

  names.map((name) => {
    const findOne = list.find((item) => item.name === name);

    if (!findOne) return;

    results.push(findOne.idx);
  });

  return results;
};
