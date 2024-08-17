"use client";

import Badge, { variantToText } from "../Badge/Badge";
import Link from "next/link";
import CustomImage from "../CustomImage";
import dayjs from "dayjs";
import FallbackContentImg from "../FallbackContentImg";
import { classNames, getStatus } from "@/utils/helpers";
import ContentLikeBtn from "../ContentLikeBtn";
import { SummaryContentEntity } from "../../types/api/culture-content";
import { useRouter } from "next/navigation";
import { ScreenTYPE, stackRouterPush } from "../../utils/stackRouter";

type ContentCardProps = SummaryContentEntity & {
  isButton?: boolean;
  onClick?: (
    contentListItem: Pick<
      SummaryContentEntity,
      "idx" | "title" | "thumbnail" | "genre"
    >
  ) => void;
  width?: string;
};

export const ContentCard = ({
  idx,
  title,
  thumbnail,
  likeState,
  startDate,
  endDate,
  location,
  genre,
  isButton = false,
  width,
  onClick,
}: ContentCardProps) => {
  const { region1Depth, region2Depth } = location;

  const router = useRouter();

  if (isButton) {
    return (
      <button
        className="h-fit"
        onClick={() =>
          onClick &&
          onClick({
            idx,
            title,
            thumbnail,
            genre,
          })
        }
      >
        <article className="">
          <div className="relative mb-[8px]">
            <div className="relative aspect-[164/232]">
              <CustomImage
                src={process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail}
                fallbackComponent={<FallbackContentImg />}
                width={164}
                height={232}
                alt={`${title}에 대한 포스터`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
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
          </div>
          <div className="flex flex-col text-left">
            <div className="text-body4 text-skyblue-01">{genre.name}</div>
            <div className="text-body2">{title}</div>
            <div className="text-body5 text-grey-04">{`${region1Depth} ${region2Depth}`}</div>
            <div className="text-body5 text-grey-04">
              {dayjs(startDate).format("YYYY-MM-DD")} -{" "}
              {dayjs(endDate).format("MM.DD")}
            </div>
          </div>
        </article>
      </button>
    );
  }

  return (
    <Link
      href={`/contents/${idx}`}
      onClick={(e) => {
        e.preventDefault();

        stackRouterPush(router, {
          path: `/contents/${idx}`,
          screen: ScreenTYPE.CONTENT_DETAIL,
        });
      }}
    >
      <article className={classNames(width ? `w-[${width}]` : "w-[164px]")}>
        <div className="relative mb-[8px]">
          <div className="relative aspect-[164/232]">
            <CustomImage
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail}
              fallbackComponent={<FallbackContentImg />}
              width={164}
              height={232}
              alt={`${title}에 대한 포스터`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
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
          <ContentLikeBtn
            idx={idx}
            className="absolute bottom-[8px] right-[8px]"
            likeState={likeState}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-body4 text-skyblue-01 mb-[4px]">
            {genre.name}
          </div>
          <div className="text-body2 min-h-[17px] mb-[4px]">{title}</div>
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
