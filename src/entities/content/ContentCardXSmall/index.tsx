import Link from "next/link";
import dayjs from "dayjs";
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Else, If, Then } from "react-if";

const ContentCardXSmall = ({ content, onClick }: Props) => {
  const router = useRouter();

  return (
    <Link
      href={`/contents/${content.idx}`}
      onClick={(e) => {
        e.preventDefault();

        if (onClick) return onClick(content);

        stackRouterPush(router, {
          path: `/contents/${content.idx}`,
          screen: WEBVIEW_SCREEN.CONTENT_DETAIL,
        });
      }}
    >
      <div className="flex flex-row">
        <div className="w-[48px] h-[48px] relative shrink-0 overflow-hidden">
          <DefaultImg src={content.thumbnail} alt={`${content.title} 이미지`} />
        </div>
        <div className="flex flex-col justify-around ml-[12px]">
          <div className="text-body2 w-[150px] overflow-hidden truncate">
            {content.title}
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
      </div>
    </Link>
  );
};

export default ContentCardXSmall;
