"use client";

import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { Props } from "./types";
import CustomBottomSheet from "@/shared/ui/BottomSheet";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { memo, useRef } from "react";

const ContentBottomSheet = ({
  isClusteredIconMarkerClicked,
  contentList,
  title,
  sheetRef,
  listRef,
}: Props) => {
  const { safeArea } = useGetSafeArea();
  const maxHeightRef = useRef(0);

  return (
    <CustomBottomSheet
      skipInitialTransition
      sheetRef={sheetRef}
      isOpen
      defaultSnap={({ maxHeight }) => {
        if (isClusteredIconMarkerClicked) {
          /**
           * 처음 컴포넌트가 렌더링 될때 바텀시트가 중간까지 보여질지 결정
           * ClusteredIconMarker 클릭시 바텀시트가 중간까지 보여져야함
           * 이외의 경우에는 20
           */
          return maxHeight / 2 - 45;
        }

        return 20;
      }}
      title={title}
      safeArea={safeArea.bottom}
      snapPoints={({ maxHeight }) => {
        if (!maxHeightRef.current) {
          maxHeightRef.current = maxHeight;
        }

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
          height={maxHeightRef.current - 190 - 24}
          itemSize={116}
          width="100%"
          overscanCount={3}
        >
          {({ index, style }: ListChildComponentProps) => {
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
          }}
        </List>
      </div>
    </CustomBottomSheet>
  );
};

export default memo(ContentBottomSheet, (prevState, nextState) => {
  /**
   * INFO 매우 중요
   * memo를 사용하지 않는 경우,
   * 내 위치를 주기적으로 가져오는 로직이 좋아요 아이콘을 주기적으로 rerendering하면서 깜빡이는 현상 존재.
   * 만약 이 안의 로직이 너무 길어지는 경우 바텀시트가 의도한 대로 동작하지 않을 수 있음.
   * 예를들면 SingleIconMarker 클릭 => 지도 클릭 => ClusteredIconMarker 클릭을 하는 경우 바텀시트는 화면 절반까지 올라와야함.
   * 그런데 위 과정을 빠르게 진행하는 경우 바텀시트가 화면 절반까지 못 올라오는 경우가 존재함.
   */

  try {
    if (
      JSON.stringify(prevState.contentList) !==
      JSON.stringify(nextState.contentList)
    ) {
      return false;
    }
  } catch (error) {
    if (prevState.contentList.length !== nextState.contentList.length) {
      return false;
    }

    for (let i = 0; i < prevState.contentList.length; i++) {
      if (
        prevState.contentList[i].idx !== nextState.contentList[i].idx ||
        prevState.contentList[i].likeState !==
          nextState.contentList[i].likeState
      ) {
        return false;
      }
    }
  }

  return true;
});
