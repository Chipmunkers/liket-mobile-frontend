import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Props } from "./types";

const CustomBottomSheet = ({
  title,
  isOpen,
  defaultSnap,
  children,
  snapPoints,
  onClickBackDrop,
  className,
}: Props) => {
  return (
    <>
      {/* 바텀 시트 z-index가 기본적으로 4이므로, 4보다 한 단계 낮은 3으로 설정 */}
      {isOpen && onClickBackDrop && (
        <div
          className="bg-black bg-opacity-60 fixed z-[3] top-0 bottom-0 left-0 right-0"
          onClick={onClickBackDrop}
        />
      )}
      <BottomSheet
        defaultSnap={defaultSnap}
        open={isOpen}
        blocking={false}
        snapPoints={snapPoints}
        className={className || ""}
      >
        {title && <h2 className="w-[100%] text-center text-h2">{title}</h2>}
        {children}
      </BottomSheet>
    </>
  );
};

export default CustomBottomSheet;
