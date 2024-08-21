export const findIdxsByNames = (
  list: ReadonlyArray<{ idx: number; name: string }>,
  names: string[]
): (number | undefined)[] =>
  names.map((name) => list.find((item) => item.name === name)?.idx);
