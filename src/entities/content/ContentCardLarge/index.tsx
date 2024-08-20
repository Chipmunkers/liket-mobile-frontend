"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { classNames } from "@/shared/helpers/classNames";
import DefaultImg from "@/shared/ui/Image";
import Badge from "@/shared/ui/Badge";
import { CONTENT_STATES } from "@/shared/consts/content/state";
import { Props } from "./types";
import { getStatus } from "@/shared/helpers/getStatus";
import LikeContentButton from "@/entities/content/LikeContentButton";

const ContentCardLarge = ({ content, width, onClick }: Props) => {
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
          screen: WEBVIEW_SCREEN.CONTENT_DETAIL,
        });
      }}
    >
      <article className={classNames(width ? `w-[${width}]` : "w-[164px]")}>
        <div className="relative mb-[8px]">
          <div className="relative aspect-[164/232]">
            <DefaultImg src={content.thumbnail} />
          </div>
          <Badge
            state={getStatus(content.startDate, content.endDate)}
            className="absolute top-[8px] left-[8px]"
          >
            {CONTENT_STATES[getStatus(content.startDate, content.endDate)].name}
          </Badge>
          <div className="absolute bottom-[8px] right-[8px] h-[24px]">
            <LikeContentButton
              idx={content.idx}
              likeState={content.likeState}
            />
          </div>
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

export default ContentCardLarge;
