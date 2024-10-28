import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 그림자 여부
     *
     * @default true
     */
    shadow?: boolean;

    /**
     * 간격. 버튼이 하나라면 의미 없음
     *
     * @default 0
     */
    gap?: string;

    /**
     * safe area를 고려하여 padding-bottom을 줄지 여부
     *
     * @default true
     */
    paddingBottomForSafeArea?: boolean;
  }>
>;
