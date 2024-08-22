"user client";

import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import DefaultImg from "@/shared/ui/DefaultImg";
import LikeContentButton from "@/entities/content/LikeContentButton";
import { classNames } from "@/shared/helpers/classNames";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import Badge from "@/shared/ui/Badge";

const ContentCardMedium = ({ content, onClick, className }: Props) => {
  const router = useRouter();

  return (
    <div className={classNames("w-[100%] bg-white", className || "")}>
      <Link
        href={`/contents/${content.idx}`}
        className="relative flex m-4"
        onClick={(e) => {
          e.preventDefault();

          if (onClick) {
            return onClick();
          }

          stackRouterPush(router, {
            path: `/contents/${content.idx}`,
            screen: WEBVIEW_SCREEN.CONTENT_DETAIL,
          });
        }}
      >
        <div className="relative w-[72px] h-[100px] mr-[16px]">
          <DefaultImg src={content.thumbnail} />
        </div>
        <div>
          <Badge state={"active"}>진행중</Badge>
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
          <LikeContentButton idx={content.idx} likeState={content.likeState} />
        </div>
      </Link>
    </div>
  );
};

export default ContentCardMedium;
