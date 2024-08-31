import Link from "next/link";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import dayjs from "dayjs";
import Badge from "@/shared/ui/Badge";

const InquiryCardSmall = ({ inquiry, onClick, className = "" }: Props) => {
  const router = useRouter();

  return (
    <Link
      className={classNames(
        className,
        "w-[100%] flex flex-col border-b-[1px] border-b-grey-01 relative"
      )}
      href={`/inquiries/${inquiry.idx}`}
      onClick={(e) => {
        e.preventDefault();

        if (onClick) return onClick(inquiry);

        stackRouterPush(router, {
          path: `/inquiries/${inquiry.idx}`,
          screen: WEBVIEW_SCREEN.INQUIRY_DETAIL,
        });
      }}
    >
      <span className="text-body4 text-rosepink-01 mt-[8px]">
        {inquiry.type.name}
      </span>
      <div className="text-body2 text-grey-black mt-[8px] w-[calc(100%-74px)] truncate">
        {inquiry.title}
      </div>
      <div className="text-body5 text-grey-04 mb-[6px] mt-[8px]">
        {dayjs(inquiry.createdAt).format("YYYY.MM.DD")}
      </div>
      <Badge
        className="absolute right-0 bottom-[50%] translate-y-[50%]"
        state={inquiry.isAnswered ? "active" : "waiting"}
      >
        {inquiry.isAnswered ? "답변완료" : "답변대기"}
      </Badge>
    </Link>
  );
};

export default InquiryCardSmall;
