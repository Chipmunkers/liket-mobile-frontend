import { IconType } from "./Icon";

export type IconButtonGroupProps = {
  icons: IconType[];
  iconSize: number;
  iconGap?: number;
  onClickIcon: (e: IconType) => void;
};
