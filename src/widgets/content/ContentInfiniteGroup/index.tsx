import { useState } from "react";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import ContentCardLarge from "@/entities/content/ContentCardLarge";
import useHandleResizeScreen from "./hooks/useHandleResizeScreen";

const ContentCardGroup = (props: Props) => {
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
            <ContentCardLarge
              content={content}
              width="100%"
              onClick={() => {
                onContentClick && onContentClick(content);
              }}
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
