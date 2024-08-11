import Divider from "@/components/Divider";
import { colors } from "@/utils/style";
import RightArrowIcon from "@/icons/right-arrow.svg";
import { ContentEntity } from "@/types/api/culture-content";

const ContentDetailInfo = (props: { content: ContentEntity }) => {
  const { content } = props;

  return (
    <>
      <div className="py-[16px] px-[24px] whitespace-pre-wrap w-[100%] text-center text-body3">
        {content.description}
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] py-[24px] flex-col relative">
        <div className="text-h2">위치</div>
        <div className="text-grey-04 text-body5 mt-[7px] mb-[4px]">
          {content.location.region1Depth} {content.location.region2Depth}{" "}
          {content.location.address} {content.location.detailAddress}
        </div>
        <div className="h-[171px] w-[100%] bg-grey-02 flex">
          {/* TODO: 맵 추가 */}
        </div>
        <button className="center absolute right-[24px] bottom-0 text-button4 text-skyblue-03">
          카카오맵에서 길찾기
          <RightArrowIcon fill={colors["skyblue"]["03"]} />
        </button>
      </div>
    </>
  );
};

export default ContentDetailInfo;
