import { SummaryContentEntity } from "@/types/api/culture-content";
import { classNames } from "@/utils/helpers";
import { ContentCard } from "../Card/ContentCard";
import { useEffect, useState } from "react";

const ContentCardGroup = (props: { contentList: SummaryContentEntity[] }) => {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    // 화면 너비가 342px 이하인지 체크하는 함수
    const handleResize = () => {
      setIsNarrow(window.innerWidth <= 520);
    };

    // 초기 사이즈 체크
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-between mt-[4px] px-[24px]">
      {props.contentList.map((content) => (
        <div
          className={classNames(
            "mb-[14px]",
            isNarrow ? "w-[calc(50%-7px)]" : "w-[calc(33.33%-4.7px)]"
          )}
        >
          <ContentCard
            {...content}
            width="100%"
            key={`content-card${content.idx}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ContentCardGroup;
