import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge/Badge";
import dayjs from "dayjs";
import { MapContentEntity } from "@/types/api/map";
import ContentLikeBtn from "../../../components/ContentLikeBtn";

const MapContentInfo = ({ content }: { content: MapContentEntity }) => {
  return (
    <div className="w-[calc(100%-16px)] bottom-[--bottom-tab-height] mb-[8px] z-10 absolute left-[8px] bg-white rounded-[24px]">
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
        <div className="absolute right-0">
          <ContentLikeBtn likeState={content.likeState} idx={content.idx} />
        </div>
      </Link>
    </div>
  );
};

export default MapContentInfo;
