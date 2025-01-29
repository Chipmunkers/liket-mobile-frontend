import { classNames } from "@/shared/helpers/classNames";
import { ButtonBase } from "@mui/material";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";
import { SharedUiProps } from "../type/react";
import { ReactNode, MouseEvent } from "react";

type Props = SharedUiProps<{
  /**
   * 오른쪽에 표현할 아이콘
   */
  Icon: ReactNode;

  /**
   * 메인 텍스트
   */
  text: string;

  /**
   * Placeholder
   *
   * @default ""
   */
  placeholder?: string;

  /**
   * 클릭 이벤트
   */
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;

  /**
   * 클릭이 가능한지 여부
   *
   * @default false
   */
  readonly?: boolean;

  /**
   * 햅틱 피드백 끄기
   *
   * @default false
   */
  disableHaptic?: boolean;
}>;

const SelectButtonMedium = ({
  Icon,
  text,
  placeholder = "",
  className,
  onClick,
  readonly = false,
  disableHaptic = false,
}: Props) => {
  return (
    <ButtonBase
      type="button"
      onClick={(e) => {
        if (readonly) return;

        if (!disableHaptic) hapticFeedback({ feedback: "select" });

        onClick && onClick(e);
      }}
      className={classNames(
        "flex justify-between items-center border-solid border-[1px] border-grey-02 rounded-[20px] h-[40px] px-[16px] w-[171px] text-body3",
        !text ? "text-button4 text-grey-02" : "text-body3",
        readonly ? "cursor-default" : "cursor-pointer",
        className || ""
      )}
    >
      {text || placeholder}
      {Icon}
    </ButtonBase>
  );
};

export default SelectButtonMedium;
