import { StrictPropsWithChildren } from "@/types/common";
import { ReactNode } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { SnapPointProps } from "react-spring-bottom-sheet/dist/types";

type CustomBottomSheetProps = StrictPropsWithChildren<
  {
    open: boolean;
    title?: string;
    defaultSnap?: number;
    snapPoints?: ({
      minHeight,
      maxHeight,
    }: SnapPointProps) => number | number[];
    onClickBackDrop?: () => void;
  },
  ReactNode
>;

/**
 * @deprecated
 */
const CustomBottomSheet = ({
  title,
  open,
  defaultSnap,
  children,
  snapPoints,
  onClickBackDrop,
}: CustomBottomSheetProps) => {
  return (
    <>
      {/* 바텀 시트 z-index가 기본적으로 4이므로, 4보다 한 단계 낮은 3으로 설정 */}
      {open && onClickBackDrop && (
        <div
          className="bg-black bg-opacity-60 fixed z-[3] top-0 bottom-0 left-0 right-0"
          onClick={onClickBackDrop}
        />
      )}
      <BottomSheet
        defaultSnap={defaultSnap}
        open={open}
        blocking={false}
        snapPoints={snapPoints}
      >
        {title && <h2 className="w-[100%] text-center text-h2">{title}</h2>}
        {children}
      </BottomSheet>
    </>
  );
};

export default CustomBottomSheet;
