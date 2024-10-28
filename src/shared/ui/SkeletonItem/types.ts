import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * border radius 값
   *
   * @default 4px
   */
  rounded?: string;

  /**
   * 가로 길이
   */
  width: string;

  /**
   * 세로 길이
   */
  height: string;

  /**
   * 배경색
   *
   * @default colors["grey"]["01"]
   */
  backgroundColor?: string;
}>;
