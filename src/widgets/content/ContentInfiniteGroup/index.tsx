import { useState } from "react";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import ContentCardLarge from "@/entities/content/ContentCardLarge";
import useHandleResizeScreen from "./hooks/useHandleResizeScreen";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const ContentCardGroup = (props: Props) => {
  // * Props
  const { contentList, setTarget, onContentClick } = props;

  // * State
  const [isNarrow, setIsNarrow] = useState(false);

  // * Hooks
  useHandleResizeScreen(setIsNarrow);

  const router = useRouter();

  return (
    <>
      {/* 
        target div크기가 10px이기 때문에 padding bottom이 14px임 (10 + 14 = 24)
      */}
      <div className="flex flex-wrap w-[100%] gap-[14px] px-[24px] pb-[14px]">
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
                if (onContentClick) {
                  onContentClick(content);
                  return;
                }

                stackRouterPush(router, {
                  path: "/contents/" + content.idx,
                  screen: WEBVIEW_SCREEN.CONTENT_DETAIL,
                });
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
