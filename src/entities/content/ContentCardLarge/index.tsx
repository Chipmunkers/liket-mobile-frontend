"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { classNames } from "@/shared/helpers/classNames";
import DefaultImg from "@/shared/ui/DefaultImg";
import Badge from "@/shared/ui/Badge";
import { CONTENT_STATES } from "@/shared/consts/content/state";
import { Props } from "./types";
import { getStatus } from "@/shared/helpers/getStatus";
import LikeContentButton from "@/entities/content/LikeContentButton";
import { Else, If, Then } from "react-if";

const ContentCardLarge = ({ content, width, onClick, className }: Props) => {
  const router = useRouter();

  const { idx, thumbnail, startDate, endDate, likeState, genre, title } =
    content;

  return (
    <Link
      href={`/contents/${idx}`}
      className={className || ""}
      onClick={(e) => {
        e.preventDefault();

        if (onClick) {
          onClick(content);
          return;
        }

        stackRouterPush(router, {
          path: `/contents/${idx}`,
          screen: WEBVIEW_SCREEN.CONTENT_DETAIL,
        });
      }}
    >
      <article className={classNames(width ? `w-[${width}]` : "w-[164px]")}>
        <div className="relative mb-[8px]">
          <div className="relative aspect-[164/232]">
            <DefaultImg
              src={thumbnail}
              alt={`${content.title} ${genre.name} 이미지`}
            />
          </div>
          <Badge
            state={getStatus(startDate, endDate)}
            className="absolute top-[8px] left-[8px]"
          >
            {CONTENT_STATES[getStatus(startDate, endDate)].name}
          </Badge>
          <div className="absolute bottom-[8px] right-[8px] h-[24px]">
            <LikeContentButton idx={idx} likeState={likeState} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-body4 text-skyblue-01 mb-[4px]">
            {genre.name}
          </div>
          <div className="text-body2 min-h-[17px] mb-[4px]">{title}</div>
          <div className="text-body5 text-grey-04">{`${content.location.region1Depth} ${content.location.region2Depth}`}</div>
          <div className="text-body5 text-grey-04">
            <If condition={!!endDate}>
              <Then>
                {dayjs(startDate).format("YYYY.MM.DD")} -{" "}
                {dayjs(endDate).format("YYYY.MM.DD")}
              </Then>
              <Else>{dayjs(startDate).format("YYYY.MM.DD")} ~ </Else>
            </If>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ContentCardLarge;
