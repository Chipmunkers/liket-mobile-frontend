import Image from "next/image";
import Link from "next/link";
import CustomImage from "./CustomImage";
import dayjs from "dayjs";

export interface HotPlaceItemProps {
  idx: number;
  title: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
}

const HotPlaceListItem = ({
  idx,
  title,
  thumbnail,
  startDate,
  endDate,
}: HotPlaceItemProps) => (
  <Link href={`/contents/${idx}`}>
    <div className="flex flex-row">
      <div className="w-[48px] h-[48px] relative shrink-0 overflow-hidden">
        <CustomImage
          src={process.env.NEXT_PUBLIC_IMAGE_SERVER + thumbnail}
          alt={`${title} thumbnail`}
          width={48}
          height={48}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col justify-around ml-[12px]">
        <div className="text-body2 w-[150px] overflow-hidden truncate">
          {title}
        </div>
        <div className="text-body5 text-grey-04">
          {dayjs(startDate).format("YYYY.MM.DD")} -{" "}
          {dayjs(endDate).format("MM.DD")}
        </div>
      </div>
    </div>
  </Link>
);

export default HotPlaceListItem;
