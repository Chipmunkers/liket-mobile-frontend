import { Icons, STICKERS } from "../consts/icon";

export type Sticker = (typeof STICKERS)[number];

export type IconName = (typeof Icons)[number];

export type IconType =
  | IconName
  | { name: IconName; isDisabled?: boolean; isActive?: boolean };
