import { CardSizeType, ColorTokensType } from "./Card";
import { Sticker } from "./Icon";

export default interface WriteTabProps {
  hidden: boolean;
  enabled: boolean;
  selectedIndex: number;
  onChangeTab: (index: number) => void;
  onClickText: () => void;
  onClickChangeSize: (size: CardSizeType) => void;
  onClickSticker: (sticker: Sticker) => void;
  onClickColor: (color: ColorTokensType) => void;
}
