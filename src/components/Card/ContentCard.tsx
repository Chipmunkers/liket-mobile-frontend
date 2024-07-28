"use client";

import Like from "@/icons/like.svg";
import ActiveLike from "@/icons/like-filled.svg";
import Badge, { variantToText } from "../Badge/Badge";

import { colors } from "@/utils/style";
import Link from "next/link";
import { ContentListItem } from "@/types/content";
import { ContentStateType, GenreType } from "@/types/const";
import CustomImage from "../CustomImage";
import dayjs from "dayjs";
import FallbackContentImg from "../FallbackContentImg";
import { getStatus } from "@/utils/helpers";

export interface ContentCardProps {
  idx: number;
  status: ContentStateType;
  genre: GenreType;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  likeState: boolean;
}

export const ContentCard = ({
  idx,
  title,
  thumbnail,
  likeState,
  startDate,
  endDate,
  location,
  genre,
}: ContentListItem) => {
  const { region1Depth, region2Depth } = location;

  return (
    <Link href={`/contents/${idx}`}>
      <article className="w-[164px]">
        <div className="relative mb-[8px]">
          <div className="relative w-[164px] h-[232px]">
            <CustomImage
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail}
              fallbackComponent={<FallbackContentImg />}
              width={164}
              height={232}
              alt={`${title}에 대한 포스터`}
              style={{
                width: 164,
                height: 232,
                objectFit: "cover",
              }}
            />
          </div>
          <Badge
            variant={getStatus(startDate, endDate)}
            style={{
              position: "absolute",
              left: "8px",
              top: "8px",
            }}
          >
            {variantToText[getStatus(startDate, endDate)]}
          </Badge>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute bottom-[8px] right-[8px]"
          >
            {likeState ? (
              <ActiveLike color={colors.skyblue["01"]} />
            ) : (
              <Like color={colors.grey["02"]} />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-body4 text-skyblue-01">{genre.name}</div>
          <div className="text-body2">{title}</div>
          <div className="text-body5 text-grey-04">{`${region1Depth} ${region2Depth}`}</div>
          <div className="text-body5 text-grey-04">
            {dayjs(startDate).format("YYYY-MM-DD")} -{" "}
            {dayjs(endDate).format("MM.DD")}
          </div>
        </div>
      </article>
    </Link>
  );
};
