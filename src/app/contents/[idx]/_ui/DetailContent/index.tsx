"use client";

import Badge, { variantToText } from "@/components/Badge/Badge";
import CategoryTab from "@/components/CategoryTab";
import Divider from "@/components/Divider";
import Link from "next/link";
import ParkingIcon from "@/icons/parking.svg";
import ReservationIcon from "@/icons/reservation.svg";
import PetIcon from "@/icons/pet.svg";
import EntranceFeeIcon from "@/icons/entrance-fee.svg";
import dayjs from "dayjs";
import { getStatus } from "@/utils/helpers";
import ContentCarousel from "@/components/Carousel/ContentCarousel";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Props } from "./types";
import ContentTab from "@/app/contents/[idx]/_ui/DetailContent/ui/ContentTab";
import LikeContentButton from "@/entities/content/LikeContentButton";
import { useGetCultureContentByIdx } from "@/app/contents/[idx]/_ui/DetailContent/hooks/useGetContentByIdx";
import ReviewTab from "@/app/contents/[idx]/_ui/DetailContent/ui/ReviewTab";

const DetailContent = (props: Props) => {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<"content" | "review">(
    searchParams.get("tab") === "review" ? "review" : "content"
  );

  const { data: content } = useGetCultureContentByIdx(
    props.content.idx,
    props.content
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mb-[24px]">
      <ContentCarousel list={content.imgList} />
      <div className="px-[24px] py-[24px]">
        <div className="flex items-center">
          <Badge
            variant={getStatus(content.startDate, content.endDate)}
            style={{ marginRight: "9px" }}
          >
            {variantToText[getStatus(content.startDate, content.endDate)]}
          </Badge>
          {content.likeCount >= 5 ? (
            <Badge variant={"hotplace"}>{variantToText["hotplace"]}</Badge>
          ) : null}
        </div>
        <div className="mt-[16px]">
          <div className="flex justify-between">
            <div>
              <h1 className="mb-[4px]">{content.title}</h1>
              <div className="text-body5 text-grey-04 mt-[4px] flex">
                <div>{`#${content.genre.name} #${
                  content.age.name
                } ${content.style
                  .map(({ name }) => "#" + name + " ")
                  .join("")}`}</div>
              </div>
            </div>
            <LikeContentButton
              likeState={content.likeState}
              idx={content.idx}
              likeCount={content.likeCount}
            />
          </div>
          <div className="mt-[16px]">
            <div className="text-body3">
              {dayjs(content.startDate).format("YYYY.MM.DD")} ~{" "}
              {dayjs(content.endDate).format("MM.DD")}
            </div>
            <div className="text-body3">{content.openTime}</div>
            <div className="text-body3">
              {content.location.region1Depth} {content.location.region2Depth}{" "}
              {content.location.address} {content.location.detailAddress}
            </div>
            <Link
              href={content.websiteLink}
              className="text-skyblue-01 text-body3 break-words overflow-wrap-normal"
              onClick={(e) => {
                e.preventDefault();

                // TODO: 모바일에서 클릭 시 갇혀버림
              }}
            >
              {content.websiteLink}
            </Link>
            <div className="flex gap-[16px] mt-[8px]">
              {content.isFee && <EntranceFeeIcon />}
              {content.isReservation && <ReservationIcon />}
              {content.isPet && <PetIcon />}
              {content.isParking && <ParkingIcon />}
            </div>
          </div>
        </div>
      </div>
      <Divider width="100%" height="8px" />
      <CategoryTab
        small={false}
        list={["content", `review`]}
        selectedTab={selectedTab}
        customTabNames={["컨텐츠", `리뷰 ${content.reviewCount}`]}
        onClickTab={(tab) => {
          setSelectedTab(tab);
        }}
        wrapperStyle={{
          marginTop: "8px",
        }}
      />
      {selectedTab === "content" ? (
        <ContentTab content={content} />
      ) : (
        <ReviewTab idx={content.idx.toString()} content={content} />
      )}
    </main>
  );
};

export default DetailContent;
