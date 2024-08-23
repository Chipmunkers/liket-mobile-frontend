import { CardSizeType, ColorTokensType, IconType } from "../../types";

export type Props = {
  hidden: boolean;
  enabled: boolean;
  selectedIndex: number;
  onChangeTab: (index: number) => void;
  onClickText: () => void;
  onClickChangeSize: (size: CardSizeType) => void;
  onClickSticker: (sticker: IconType) => void;
  onClickColor: (color: ColorTokensType) => void;
};
