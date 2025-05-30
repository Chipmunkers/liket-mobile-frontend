import { Sticker } from "./types/Icon";
import IconButtonGroup from "./IconButtonGroup";

export type Props = {
  onClickSticker: (sticker: Sticker) => void;
};

const StickerEdit = ({ onClickSticker }: Props) => {
  return (
    <div className="h-[80px]">
      <IconButtonGroup
        iconSize={48}
        onClickIcon={(sticker) => onClickSticker(sticker as Sticker)}
        icons={[
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
        ]}
      />
    </div>
  );
};

export default StickerEdit;
