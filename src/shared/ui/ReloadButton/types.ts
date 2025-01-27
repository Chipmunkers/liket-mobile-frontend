import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 클릭 이벤트
     *
     * @default "아무 일도 일어나지 않음"
     */
    onClick?: () => void;

    /**
     * 버튼 텍스트 className
     *
     * @default ""
     */
    textClassName?: string;

    /**
     * 햅틱 피드백 끄기
     *
     * @default false
     */
    disableHaptic?: boolean;
  }>,
  string
>;
