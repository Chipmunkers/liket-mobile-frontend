import { SharedUiProps } from "@/shared/types/react";

/**
 * RoundDeleteButton Props 타입
 *
 * @author jochongs
 */
export type Props = SharedUiProps<{
  /**
   * 버튼 클릭 이벤트
   *
   * @default 아무일도 일어나지 않음
   */
  onClick?: () => void;
}>;
