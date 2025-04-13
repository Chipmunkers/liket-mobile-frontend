"use client";

import { useRouter } from "next/navigation";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";
import { formatDate } from "./util/formatDate";
import Badge from "@/shared/ui/Badge";
import Link from "next/link";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const ContentCardSmall = ({ content, onClick }: Props) => {
  const router = useRouter();

  return (
    <Link
      href={`/requested-contents/${content.idx}`}
      className="flex justify-between items-center border-b-[1px] w-[100%] h-[80px] border-bottom"
      onClick={(e) => {
        e.preventDefault();

        if (onClick) {
          onClick(content);
          return;
        }

        stackRouterPush(router, {
          path: `/requested-contents/${content.idx}`,
          screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        });
      }}
    >
      <div className="flex">
        <div className="w-[64px] h-[64px] mr-[12px] relative">
          <DefaultImg src={content.thumbnail} alt="컨텐츠 썸네일" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-body4 text-skyblue-01">{content.genre.name}</div>
          <h2 className="text-body2">{content.title}</h2>
          <div className="text-body5 text-grey-04">
            {formatDate(content.createdAt)}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Badge state={content.acceptedAt ? "active" : "waiting"}>
          {content.acceptedAt ? "등록완료" : "등록대기"}
        </Badge>
      </div>
    </Link>
  );
};

export default ContentCardSmall;
