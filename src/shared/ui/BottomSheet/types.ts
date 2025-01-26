import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";
import {
  defaultSnapProps,
  SnapPointProps,
} from "react-spring-bottom-sheet/dist/types";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 열려있는지 상태
     */
    isOpen: boolean;

    /**
     * 바텀시트 제목
     */
    title?: string;

    defaultSnap?: number | ((props: defaultSnapProps) => number);
    snapPoints?: ({
      minHeight,
      maxHeight,
    }: SnapPointProps) => number | number[];
    onClickBackDrop?: () => void;

    /**
     * safe area를 고려해야하는 만큼
     */
    safeArea?: number;

    onBlur?: () => void;
  }>
>;
