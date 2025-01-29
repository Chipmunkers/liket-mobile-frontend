import { Icons, STICKERS } from "../consts/icon";

export const IconToStickerNumberMap = {
  꽃: 1,
  리본: 2,
  리본끈1: 3,
  리본끈2: 4,
  무지개: 5,
  반짝이: 6,
  별1: 7,
  별2: 8,
  선글라스: 9,
  스마일: 10,
  음표1: 11,
  음표2: 12,
  클로버: 13,
  하트: 14,
};

export type Sticker = (typeof STICKERS)[number];

export type IconName = (typeof Icons)[number];

export type IconType =
  | IconName
  | { name: IconName; isDisabled?: boolean; isActive?: boolean };
