import { classNames } from "@/utils/helpers";
import { useState } from "react";

const CARD_SIZE = {
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
  SMALL: "SMALL",
} as const;

export type CardSizeType = keyof typeof CARD_SIZE;

interface SizeEditProps {
  onClickChangeSize: (size: CardSizeType) => void;
}
/**
 * @deprecated
 */
const SizeEdit = ({ onClickChangeSize }: SizeEditProps) => {
  const [selectedSize, setSelectedSize] = useState<CardSizeType>(
    CARD_SIZE.LARGE
  );

  return (
    <div className={"flex justify-around items-center w-[100%] h-[80px]"}>
      <button
        aria-label="large 사이즈로 바꾸기"
        className={classNames(
          "w-[36px] h-[56px] rounded-[1px] border-solid border-[1px]",
          selectedSize === CARD_SIZE.LARGE
            ? "border-skyblue-01 bg-skyblue-01"
            : "border-grey-01 bg-grey-01"
        )}
        onClick={() => {
          setSelectedSize(CARD_SIZE.LARGE);
          onClickChangeSize(CARD_SIZE.LARGE);
        }}
      />
      <button
        aria-label="medium 사이즈로 바꾸기"
        className={classNames(
          "relative",
          "w-[36px] h-[56px] rounded-[1px] border-solid border-[1px]",
          selectedSize === CARD_SIZE.MEDIUM
            ? "border-skyblue-01"
            : "border-grey-01"
        )}
        onClick={() => {
          setSelectedSize(CARD_SIZE.MEDIUM);
          onClickChangeSize(CARD_SIZE.MEDIUM);
        }}
      >
        <div
          className={classNames(
            "absolute top-[2px] left-[2px] w-[30px] h-[50px] rounded-[1px]",
            selectedSize === CARD_SIZE.MEDIUM ? "bg-skyblue-01" : "bg-grey-01"
          )}
        />
      </button>
      <button
        aria-label="small 사이즈로 바꾸기"
        className={classNames(
          "relative",
          "w-[36px] h-[56px] rounded-[1px] border-solid border-[1px]",
          selectedSize === CARD_SIZE.SMALL
            ? "border-skyblue-01"
            : "border-grey-01"
        )}
        onClick={() => {
          setSelectedSize(CARD_SIZE.SMALL);
          onClickChangeSize(CARD_SIZE.SMALL);
        }}
      >
        <div
          className={classNames(
            "absolute top-[2px] left-[2px] w-[30px] h-[40px] rounded-[1px] ",
            selectedSize === CARD_SIZE.SMALL ? "bg-skyblue-01" : "bg-grey-01"
          )}
        />
      </button>
    </div>
  );
};

export default SizeEdit;
