import { SharedUiProps } from "@/shared/types/react";
import { MouseEvent, ReactNode } from "react";

export type Props = SharedUiProps<{
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
