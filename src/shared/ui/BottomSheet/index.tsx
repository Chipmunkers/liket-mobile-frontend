import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Props } from "./types";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { styled } from "@mui/material";

const CustomBottomSheet = ({
  title,
  isOpen,
  defaultSnap,
  children,
  snapPoints,
  onClickBackDrop,
  className,
  safeArea = 0,
  onBlur,
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
      <StyledBottomSheet
        defaultSnap={defaultSnap}
        open={isOpen}
        blocking={false}
        snapPoints={snapPoints}
        className={className || ""}
        safeArea={safeArea}
        onBlur={() => {
          onBlur && onBlur();
        }}
      >
        {title && <h2 className="w-[100%] text-center text-h2">{title}</h2>}
        {children}
      </StyledBottomSheet>
    </>
  );
};

export default CustomBottomSheet;

interface StyledBottomSheetProps {
  safeArea: number;
}

const StyledBottomSheet = styled(BottomSheet)<StyledBottomSheetProps>`
  div[data-rsbs-overlay],
  div[data-rsbs-backdrop] {
    margin: 0 auto;
    border-radius: 24px 24px 0 0;
    margin-bottom: ${(props) => props.safeArea + "px"};
  }
`;
