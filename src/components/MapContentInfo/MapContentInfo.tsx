import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge/Badge";
import { colors } from "@/utils/style";
import Like from "@/icons/like.svg";
import ActiveLike from "@/icons/like-filled.svg";
import { Content } from "../KakaoMapV2/interface/Content";
import dayjs from "dayjs";

const MapContentInfo = ({ content }: { content: Content }) => {
  return (
    <div className="w-[calc(100%-16px)] bottom-[82px] z-10 absolute left-[8px] bg-white rounded-[24px]">
      <Link href={`/contents/${content.idx}`} className="relative flex m-4">
        <div className="relative w-[72px] h-[100px] mr-[16px]">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_SERVER + content.imgList[0]}
            fill
            alt={`${content.title} 썸네일 이미지`}
          />
        </div>
        <div>
          <Badge variant={"active"}>진행중</Badge>
          <div className="text-body4 text-skyblue-01">{content.genre.name}</div>
          <h2 className="text-body2">{content.title}</h2>
          <div className="text-body5 text-grey-04">
            {content.location.region1Depth +
              " " +
              content.location.region2Depth}
          </div>
          <div className="text-body5 text-grey-04">
            {dayjs(content.startDate).format("YYYY.MM.DD")} ~{" "}
            {dayjs(content.endDate).format("MM.DD")}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute top-0 right-0"
        >
          {content.likeState ? (
            <ActiveLike color={colors.skyblue["01"]} />
          ) : (
            <Like color={colors.grey["02"]} />
          )}
        </button>
      </Link>
    </div>
  );
};

export default MapContentInfo;
