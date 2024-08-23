import { ContentState } from "../../consts/content/state";
import { SharedUiProps, StrictPropsWithChildren } from "../../types/react";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 컨텐츠 상태
     *
     * @example active
     */
    state: ContentState;
  }>,
  string
>;
