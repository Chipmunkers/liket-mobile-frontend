import IconButtonGroup from "../../../../_ui/IconButtonGroup";
import { Props } from "./types";

const StickerEdit = ({ onClickSticker }: Props) => {
  return (
    <div className="h-[80px]">
      <IconButtonGroup
        iconSize={48}
        onClickIcon={onClickSticker}
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
