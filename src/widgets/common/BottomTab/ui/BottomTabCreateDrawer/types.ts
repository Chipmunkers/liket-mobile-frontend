import { WidgetUiProps, SetState } from "@/shared/types/react";

export type Props = WidgetUiProps<{
  /**
   * 열려있는지 여부
   */
  isOpen: boolean;

  /**
   * isOpen 상태를 바꿔주는 함수
   * 
   */
  setIsOpen: SetState<boolean>;
}>;
