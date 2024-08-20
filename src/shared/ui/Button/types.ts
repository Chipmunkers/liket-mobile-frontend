import { MouseEvent } from "react";
import { SharedUiProps, StrictPropsWithChildren } from "../../types/react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 버튼 타입. submit일 경우 form을 제출 시킴
     *
     * @default button
     */
    type?: "button" | "submit";

    /**
     * 활성화 여부. 활성화되어있지 않다면 클릭할 수 없음
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * 버튼 유형. 각 유형 별로 색상이 달라짐
     *
     * @default primary
     */
    variant?: ButtonVariant;

    /**
     * 전체 넓이 여부
     *
     * @deprecated
     * @default false
     */
    fullWidth?: boolean;

    /**
     * 버튼 클릭 이벤트
     */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  }>
>;
