import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 그림자 여부
     *
     * @default false
     */
    shadow?: boolean;

    /**
     * 간격
     */
    gap?: string;
  }>
>;
