"use client";

import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { Props } from "./types";
import CustomBottomSheet from "@/shared/ui/BottomSheet";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

const ContentBottomSheet = ({
  contentList,
  open,
  title,
  sheetRef,
  listRef,
}: Props) => {
  const { safeArea } = useGetSafeArea();

  const renderItem = ({ index, style }: ListChildComponentProps) => {
    const content = contentList[index];

    return (
      <li
        key={content.idx}
        className="w-full pb-[16px] px-[24px]"
        style={style}
      >
        <ContentCardMedium content={content} />
      </li>
    );
  };

  return (
    <CustomBottomSheet
      skipInitialTransition
      sheetRef={sheetRef}
      isOpen
      defaultSnap={({ maxHeight }) => {
        return maxHeight / 2 - 45;
      }}
      title={title}
      safeArea={safeArea.bottom}
      snapPoints={({ maxHeight }) => {
        if (open) {
          // * 처음부터 열려있는 경우
          return [maxHeight / 2 - 45, 0];
        }

        // * 처음부터 닫혀있는 경우
        return [20, maxHeight / 2 - 45, maxHeight - 68 - 48 - 74];
      }}
    >
      <div className="w-full scrollbar-hide pb-[48px]">
        <List
          ref={(ref) => {
            listRef.current = ref;
          }}
          className="windowList"
          itemCount={contentList.length}
          height={584}
          itemSize={116}
          width="100%"
          overscanCount={3}
        >
          {renderItem}
        </List>
      </div>
    </CustomBottomSheet>
  );
};

export default ContentBottomSheet;
