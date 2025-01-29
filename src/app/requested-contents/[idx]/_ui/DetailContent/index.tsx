"use client";

import Link from "next/link";
import ParkingIcon from "@/icons/parking.svg";
import ReservationIcon from "@/icons/reservation.svg";
import PetIcon from "@/icons/pet.svg";
import EntranceFeeIcon from "@/icons/entrance-fee.svg";
import dayjs from "dayjs";
import { useState } from "react";
import { Props } from "./types";
import ContentTab from "./ui/ContentTab";
import LikeContentButton from "@/entities/content/LikeContentButton";
import ReviewTab from "./ui/ReviewTab";
import { getStatus } from "@/shared/helpers/getStatus";
import { CONTENT_STATES } from "@/shared/consts/content/state";
import Badge from "@/shared/ui/Badge";
import CategoryTab from "@/shared/ui/CategoryTab";
import Divider from "@/shared/ui/Divider";
import ContentImgCarousel from "@/widgets/content/ContentImgCarousel";
import { If, Then, Else } from "react-if";

const DetailContent = ({ content }: Props) => {
  const [selectedTab, setSelectedTab] = useState<"content" | "review">(
    "content"
  );

  const {
    imgList,
    startDate,
    endDate,
    acceptedAt,
    title,
    genre,
    age,
    idx,
    likeState,
    likeCount,
    openTime,
    websiteLink,
    isFee,
    isReservation,
    isPet,
    isParking,
    location,
  } = content;

  return (
    <main className="mb-[24px]">
      <ContentImgCarousel list={imgList} />
      <div className="px-[24px] py-[24px]">
        <div className="flex items-center">
          <Badge state={getStatus(startDate, endDate)} className="mr-[9px]">
            {CONTENT_STATES[getStatus(startDate, endDate)].name}
          </Badge>
          {content.likeCount >= 5 ? (
            <Badge state={"hotplace"}>{CONTENT_STATES["hotplace"].name}</Badge>
          ) : null}
          <Badge
            className="absolute right-[24px]"
            state={acceptedAt ? "active" : "waiting"}
          >
            {acceptedAt ? "등록완료" : "등록대기"}
          </Badge>
        </div>
        <div className="mt-[16px]">
          <div className="flex justify-between">
            <div>
              <h1 className="mb-[4px]">{title}</h1>
              <div className="text-body5 text-grey-04 mt-[4px] flex">
                <div>{`#${genre.name} #${age.name} ${content.style
                  .map(({ name }) => "#" + name + " ")
                  .join("")}`}</div>
              </div>
            </div>
            {acceptedAt ? (
              <LikeContentButton
                likeState={likeState}
                idx={idx}
                likeCount={likeCount}
              />
            ) : null}
          </div>
          <div className="mt-[16px]">
            <div className="text-body3">
              <If condition={!!content.endDate}>
                <Then>
                  {dayjs(content.startDate).format("YYYY.MM.DD")} -{" "}
                  {dayjs(content.endDate).format("YYYY.MM.DD")}
                </Then>
                <Else>{dayjs(content.startDate).format("YYYY.MM.DD")} ~ </Else>
              </If>
            </div>
            <div className="text-body3">{openTime}</div>
            <div className="text-body3">
              {location.region1Depth} {location.region2Depth} {location.address}{" "}
              {location?.detailAddress || ""}
            </div>
            {websiteLink && (
              <Link
                href={websiteLink}
                className="text-skyblue-01 text-body3 break-words overflow-wrap-normal"
                onClick={(e) => {
                  e.preventDefault();

                  // TODO: 모바일에서 클릭 시 갇혀버림
                }}
              >
                {websiteLink}
              </Link>
            )}
            <div className="flex gap-[16px] mt-[8px]">
              {isFee && <EntranceFeeIcon />}
              {isReservation && <ReservationIcon />}
              {isPet && <PetIcon />}
              {isParking && <ParkingIcon />}
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
        <ReviewTab idx={idx.toString()} content={content} />
      )}
    </main>
  );
};

export default DetailContent;
