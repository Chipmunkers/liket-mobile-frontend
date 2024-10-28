import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * 이미지 배열
   */
  imgList: string[];

  /**
   * 선택된 이미지 순번, 0부터 시작
   *
   * @default 0
   */
  selectIdx?: number;
}>;
