import { SharedUiProps, StrictPropsWithChildren } from "@/shared/types/react";
import { RefObject } from "react";
import { BottomSheetRef } from "react-spring-bottom-sheet";
import {
  defaultSnapProps,
  SnapPointProps,
} from "react-spring-bottom-sheet/dist/types";

export type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 초기 바텀시트가 나타날떄 애니메이션과 함께 나타날지 설정
     */
    skipInitialTransition?: boolean;

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

    /**
     * 바텀시트 스프링 ref
     * snapPoint 수동 컨트롤시 사용
     */
    sheetRef?: RefObject<BottomSheetRef>;
  }>
>;
