import { useState } from "react";
import { Props } from "./types";
import { ColorTokensType } from "../../../../types";
import { COLOR_TOKENS } from "../../../../_consts/color";
import { classNames } from "@/shared/helpers/classNames";

const TextEdit = ({ onClickColor }: Props) => {
  const [clickedColor, setClickedColor] = useState<ColorTokensType>("#000");

  return (
    <ul className="flex justify-around w-[100%] h-[40px]">
      {COLOR_TOKENS.map((color) => {
        return (
          <li key={color} className="flex justify-center items-center">
            <button
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                setClickedColor(color);
                onClickColor(color);
              }}
              className={classNames(
                `w-[24px] h-[24px] rounded-[50%] border-[2px] border-solid`,
                clickedColor === color ? "border-skyblue-01" : "border-grey-01s"
              )}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TextEdit;
