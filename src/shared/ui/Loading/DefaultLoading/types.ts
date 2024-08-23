import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * 로딩 Dot 색상
   *
   * @default skyblue-01
   */
  color?: "white" | "skyblue-01" | "grey-01";

  /**
   * 로딩 Dot 크기
   *
   * @default 12px
   */
  dotSize?: string;

  /**
   * 가운데 정렬 여부. 가운데 정렬일 경우 absolute와 가운데 정렬이 들어감
   *
   * @default true
   */
  center?: boolean;
}>;
