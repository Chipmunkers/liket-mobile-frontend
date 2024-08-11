import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge/Badge";
import dayjs from "dayjs";
import ContentLikeBtn from "../ContentLikeBtn";
import { MapContentEntity } from "../../types/api/map";

const MapBottomSheetCard = (props: { content: MapContentEntity }) => {
  const { content } = props;

  return (
    <Link
      href={`/contents/${content.idx}`}
      className="relative flex mx-[24px] mt-[24px]"
    >
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
          {content.location.region1Depth + " " + content.location.region2Depth}
        </div>
        <div className="text-body5 text-grey-04">
          {dayjs(content.startDate).format("YYYY.MM.DD")} ~{" "}
          {dayjs(content.endDate).format("MM.DD")}
        </div>
      </div>
      <ContentLikeBtn likeState={content.likeState} idx={content.idx} />
    </Link>
  );
};

export default MapBottomSheetCard;
