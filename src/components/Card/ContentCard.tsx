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

type ContentCardProps = {
  content: SummaryContentEntity;
  onClick?: (content: SummaryContentEntity) => void;
  width?: string;
};

export const ContentCard = (props: ContentCardProps) => {
  const { content, width, onClick } = props;

  const router = useRouter();

  return (
    <Link
      href={`/contents/${content.idx}`}
      onClick={(e) => {
        e.preventDefault();

        if (onClick) {
          onClick(content);
          return;
        }

        stackRouterPush(router, {
          path: `/contents/${content.idx}`,
          screen: ScreenTYPE.CONTENT_DETAIL,
        });
      }}
    >
      <article className={classNames(width ? `w-[${width}]` : "w-[164px]")}>
        <div className="relative mb-[8px]">
          <div className="relative aspect-[164/232]">
            <CustomImage
              src={process.env.NEXT_PUBLIC_IMAGE_SERVER + content.thumbnail}
              fallbackComponent={<FallbackContentImg />}
              width={164}
              height={232}
              alt={`${content.title}에 대한 포스터`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <Badge
            variant={getStatus(content.startDate, content.endDate)}
            style={{
              position: "absolute",
              left: "8px",
              top: "8px",
            }}
          >
            {variantToText[getStatus(content.startDate, content.endDate)]}
          </Badge>
          <ContentLikeBtn
            idx={content.idx}
            className="absolute bottom-[8px] right-[8px]"
            likeState={content.likeState}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-body4 text-skyblue-01 mb-[4px]">
            {content.genre.name}
          </div>
          <div className="text-body2 min-h-[17px] mb-[4px]">
            {content.title}
          </div>
          <div className="text-body5 text-grey-04">{`${content.location.region1Depth} ${content.location.region2Depth}`}</div>
          <div className="text-body5 text-grey-04">
            {dayjs(content.startDate).format("YYYY-MM-DD")} -{" "}
            {dayjs(content.endDate).format("MM.DD")}
          </div>
        </div>
      </article>
    </Link>
  );
};
