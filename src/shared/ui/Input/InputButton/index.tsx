import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";
import { variantToStyle } from "@/shared/style/variant";

export const InputButton = ({
  text = "",
  placeholder,
  subButtonText,
  onClick,
  className = "",
}: Props) => {
  return (
    <div className={classNames("w-[100%] relative", className)}>
      <button
        type="button"
        className={classNames(
          "w-[100%] text-left box-border pl-[8px] pr-[8px] pt-[16px] pb-[15px] text-body3 border-b-[1px] border-b-grey-01",
          text ? "text-button4" : "text-button4 text-grey-02"
        )}
        onClick={onClick}
      >
        {text || placeholder}
      </button>
      {subButtonText && (
        <button
          className={classNames(
            "absolute px-[8px] text-button4 rounded-[12px] h-[24px]  bottom-0 right-0 mb-[12px]",
            variantToStyle["ghost"]
          )}
          onClick={onClick}
          type="button"
        >
          {subButtonText}
        </button>
      )}
    </div>
  );
};

export default InputButton;
