import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * Input에 뜨는 기본적인 내용
   */
  placeholder?: string;
  subButtonText?: string;
  text?: string;
  onClick?: () => void;
}>;
