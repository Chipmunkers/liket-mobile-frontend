import { SharedUiProps, StrictPropsWithChildren } from "../../types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 선택되어있는지 여부. true일 경우 메인 색상으로 변경됨
     */
    isSelected: boolean;

    /**
     * 클릭 했을 때 동작. 없을 경우 클릭되지 않음
     */
    onClick?: () => void;
  }>,
  string
>;
