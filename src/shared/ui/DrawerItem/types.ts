import { EntityUiProps, StrictPropsWithChildren } from "@/shared/types/react";
import { MouseEvent } from "react";

export type Props = StrictPropsWithChildren<
  EntityUiProps<{
    /**
     * 요소 클릭 이벤트
     */
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  }>
>;
