import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * Placeholder
   */
  placeholder: string;

  /**
   * 검색 이벤트
   */
  onSearch: (text: string) => void;
  replacePath?: string;

  /**
   * 지우기 버튼 클릭 시 이벤트
   */
  onBackButtonClick?: () => void;
}>;
