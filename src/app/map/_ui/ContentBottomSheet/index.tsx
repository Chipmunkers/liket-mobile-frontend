"use client";

import ContentCardMedium from "@/entities/content/ContentCardMedium";
import { Props } from "./types";
import CustomBottomSheet from "@/shared/ui/BottomSheet";

const ContentBottomSheet = ({ contentList, open, title }: Props) => {
  return (
    <CustomBottomSheet
      isOpen={true}
      defaultSnap={20}
      title={title}
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
