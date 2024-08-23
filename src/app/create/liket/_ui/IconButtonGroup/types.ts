import { IconType } from "../../types";

export type Props = {
  icons: IconType[];
  iconSize: number;
  iconGap?: number;
  onClickIcon: (e: IconType) => void;
};
