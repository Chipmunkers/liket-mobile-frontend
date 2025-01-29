export const AGES = [
  {
    idx: 1,
    name: "전체",
  },
  {
    idx: 2,
    name: "아이들",
  },
  {
    idx: 3,
    name: "10대",
  },
  {
    idx: 4,
    name: "20대",
  },
  {
    idx: 5,
    name: "30대",
  },
  {
    idx: 6,
    name: "40-50대",
  },
] as const;

export type AgeName = (typeof AGES)[number]["name"];
