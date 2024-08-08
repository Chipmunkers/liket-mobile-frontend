import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge/Badge";
import { colors } from "@/utils/style";
import Like from "@/icons/like.svg";
import ActiveLike from "@/icons/like-filled.svg";
import { ContentStateType, GenreType } from "@/types/const";
import { Content } from "../KakaoMapV2/interface/Content";
import dayjs from "dayjs";

interface MapBottomSheetCardProps {
  idx: number;
  status: ContentStateType;
  thumbnail: string;
  title: string;
  startDate: string;
  endDate: string;
  likeState: boolean;
  location: string;
  genre: GenreType;
}

export const CONTENT_CARDS_DUMMY: MapBottomSheetCardProps[] = [
  {
    idx: 1,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 2,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 3,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 4,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 5,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 6,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 7,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 8,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 9,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 10,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
  {
    idx: 11,
    status: "active",
    genre: "연극",
    thumbnail: "https://picsum.photos/seed/picsum/390/280",
    title: "성수 디올 팝업 스토어",
    location: "서울 성동구",
    startDate: "2023-01-30",
    endDate: "2023-02-23",
    likeState: false,
  },
];

const MapBottomSheetCard = (props: { content: Content }) => {
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
  );
};

export default MapBottomSheetCard;
