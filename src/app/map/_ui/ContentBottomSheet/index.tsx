"use client";

import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { Props } from "./types";
import CustomBottomSheet from "@/shared/ui/BottomSheet";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

const ContentBottomSheet = ({ contentList, open, title }: Props) => {
  const { safeArea } = useGetSafeArea();
  return (
    <CustomBottomSheet
      isOpen={true}
      defaultSnap={20}
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
      <ul>
        {contentList.map((content) => (
          <li key={content.idx} className="w-[100%] mb-[16px] px-[24px]">
            <ContentCardMedium content={content} />
          </li>
        ))}
      </ul>
    </CustomBottomSheet>
  );
};

export default ContentBottomSheet;
