import Link from "next/link";
import dayjs from "dayjs";
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";

const ContentCardXSmall = ({ content }: Props) => (
  <Link href={`/contents/${content.idx}`}>
    <div className="flex flex-row">
      <div className="w-[48px] h-[48px] relative shrink-0 overflow-hidden">
        <DefaultImg src={content.thumbnail} />
      </div>
      <div className="flex flex-col justify-around ml-[12px]">
        <div className="text-body2 w-[150px] overflow-hidden truncate">
          {content.title}
        </div>
        <div className="text-body5 text-grey-04">
          {dayjs(content.startDate).format("YYYY.MM.DD")} -{" "}
          {dayjs(content.endDate).format("MM.DD")}
        </div>
      </div>
    </div>
  </Link>
);

export default ContentCardXSmall;
