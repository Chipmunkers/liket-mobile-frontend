import { SharedUiProps } from "@/shared/types/react";
import { ReactNode } from "react";

export type Props = SharedUiProps<{
  withBorder?: boolean;
  /**
   * 아이콘
   */
  Icon: ReactNode;

  /**
   * 내용
   */
  text: string;

  placeholder: string;
  onClick: () => void;

  /**
   * 리플 이펙트 여부
   *
   * @default true
   */
  rippleEffect?: boolean;
}>;
