const findIdxByName = (
  list: ReadonlyArray<{ idx: number; name: string }>,
  name: string
): number | undefined => list.find((item) => item.name === name)?.idx;
