export const Icons = [
  "꽃",
  "리본",
  "리본끈1",
  "리본끈2",
  "무지개",
  "반짝이",
  "별1",
  "별2",
  "선글라스",
  "스마일",
  "음표1",
  "음표2",
  "클로버",
  "하트",
  "back",
  "like",
  "menu",
  "save",
  "search",
  "create",
] as const;

export type IconName = (typeof Icons)[number];
