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
import { Else, If, Then } from "react-if";

const ContentCardMedium = ({ content, onClick, className }: Props) => {
  const router = useRouter();

  return (
    <div className={classNames("w-[100%] bg-white", className || "")}>
      <Link
        href={`/contents/${content.idx}`}
        className="relative flex"
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
        <div className="flex flex-col items-start">
          <Badge state={"active"}>진행중</Badge>
          <div className="text-body4 text-skyblue-01 mt-[4px]">
            {content.genre.name}
          </div>
          <h2 className="text-body2 mt-[4px]">{content.title}</h2>
          <div className="text-body5 text-grey-04 mt-[4px]">
            {content.location.region1Depth +
              " " +
              content.location.region2Depth}
          </div>
          <div className="text-body5 text-grey-04">
            <If condition={!!content.endDate}>
              <Then>
                {dayjs(content.startDate).format("YYYY.MM.DD")} -{" "}
                {dayjs(content.endDate).format("YYYY.MM.DD")}
              </Then>
              <Else>{dayjs(content.startDate).format("YYYY.MM.DD")} ~ </Else>
            </If>
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
