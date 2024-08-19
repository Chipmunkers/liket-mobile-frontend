import { SummaryContentEntity } from "@/types/api/culture-content";
import { classNames } from "@/utils/helpers";
import { ContentCard } from "../Card/ContentCard";
import { Dispatch, SetStateAction, useState } from "react";
import useHandleResizeScreen from "./_hooks/useHandleResizeScreen";

const ContentCardGroup = (props: {
  contentList: SummaryContentEntity[];
  setTarget?: Dispatch<SetStateAction<HTMLDivElement | null>>;
  onContentClick?: (content: SummaryContentEntity) => void;
}) => {
  // * Props
  const { contentList, setTarget, onContentClick } = props;

  // * State
  const [isNarrow, setIsNarrow] = useState(false);

  // * Hooks
  useHandleResizeScreen(setIsNarrow);

  return (
    <>
      <div className="flex flex-wrap w-[100%] gap-[14px] mt-[4px] px-[24px]">
        {contentList.map((content, i) => (
          <div
            key={`content-card${content.idx}-${i}`}
            className={classNames(
              "mb-[14px]",
              isNarrow ? "w-[calc(50%-7px)]" : "w-[calc(33.33%-9.33334px)]"
            )}
          >
            <ContentCard
              content={content}
              width="100%"
              onClick={onContentClick}
            />
          </div>
        ))}
      </div>
      {setTarget ? (
        <div className="h-[10px] relative bottom-1" ref={setTarget}></div>
      ) : null}
    </>
  );
};

export default ContentCardGroup;
