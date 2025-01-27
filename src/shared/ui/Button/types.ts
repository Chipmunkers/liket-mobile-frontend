import { CSSProperties, MouseEvent } from "react";
import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";
import { Variant } from "@/shared/style/variant";

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
    variant?: Variant;

    /**
     * 전체 넓이 여부.
     * Deprecated됨. 대신 className에 flex-1을 주는 것으로 사용
     *
     * @deprecated
     * @default false
     */
    fullWidth?: boolean;

    /**
     * 버튼 클릭 이벤트
     */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

    /**
     * 버튼 태그에 주어질 css style
     * 웬만하면 className을 사용하기를 권장
     *
     * @default {}
     */
    style?: CSSProperties;

    /**
     * 햅틱 피드백 끄기
     *
     * @default false
     */
    disableHaptic?: boolean;
  }>
>;
