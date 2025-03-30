"use client";

import Link from "next/link";
import ParkingIcon from "@/icons/parking.svg";
import ReservationIcon from "@/icons/reservation.svg";
import PetIcon from "@/icons/pet.svg";
import EntranceFeeIcon from "@/icons/entrance-fee.svg";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Props } from "./types";
import ContentTab from "./ui/ContentTab";
import LikeContentButton from "@/entities/content/LikeContentButton";
import { useGetCultureContentByIdx } from "./hooks/useGetContentByIdx";
import ReviewTab from "./ui/ReviewTab";
import { getStatus } from "@/shared/helpers/getStatus";
import { CONTENT_STATES } from "@/shared/consts/content/state";
import Badge from "@/shared/ui/Badge";
import CategoryTab from "@/shared/ui/CategoryTab";
import Divider from "@/shared/ui/Divider";
import ContentImgCarousel from "@/widgets/content/ContentImgCarousel";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import DetailImgCarousel from "@/shared/ui/DetailImgCarousel";
import { Else, If, Then } from "react-if";
import { DefaultLink } from "@/shared/ui/DefaultLink";

const DetailContent = (props: Props) => {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState<"content" | "review">(
    searchParams.get("tab") === "review" ? "review" : "content"
  );

  const [selectedImgIndex, setSelectedImgIndex] = useState<number>();

  useEffect(() => {
    const selectIdxQuerystring = searchParams.get("content-img-index");

    if (!selectIdxQuerystring) {
      return setSelectedImgIndex(undefined);
    }

    setSelectedImgIndex(
      isNaN(Number(selectIdxQuerystring))
        ? undefined
        : Number(selectIdxQuerystring)
    );
  }, [searchParams]);

  const { data: content } = useGetCultureContentByIdx(
    props.content.idx,
    props.content
  );

  const { safeArea } = useGetSafeArea();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main style={{ paddingBottom: safeArea.bottom + "px" }}>
        {selectedImgIndex !== undefined ? (
          <div className="fixed max-w-[600px] w-[100%] h-[100vh] z-10 top-0">
            <DetailImgCarousel
              selectIdx={selectedImgIndex}
              imgList={content.imgList}
            />
          </div>
        ) : null}
        <ContentImgCarousel list={content.imgList} />
        <div className="px-[24px] py-[24px]">
          <div className="flex items-center">
            <Badge
              state={getStatus(content.startDate, content.endDate)}
              className="mr-[9px]"
            >
              {
                CONTENT_STATES[getStatus(content.startDate, content.endDate)]
                  .name
              }
            </Badge>
            {content.likeCount >= 5 ? (
              <Badge state={"hotplace"}>
                {CONTENT_STATES["hotplace"].name}
              </Badge>
            ) : null}
          </div>
          <div className="mt-[16px]">
            <div className="flex justify-between">
              <div>
                <h1 className="mb-1 break-all overflow-hidden pr-2">
                  {content.title}
                </h1>
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
              <div className="text-body3 mb-[4px]">
                <If condition={!!content.endDate}>
                  <Then>
                    {dayjs(content.startDate).format("YYYY.MM.DD")} -{" "}
                    {dayjs(content.endDate).format("YYYY.MM.DD")}
                  </Then>
                  <Else>
                    {dayjs(content.startDate).format("YYYY.MM.DD")} ~{" "}
                  </Else>
                </If>
              </div>
              <div className="text-body3 mb-[4px]">{content.openTime}</div>
              <div className="text-body3 mb-[4px]">
                {content.location.region1Depth} {content.location.region2Depth}{" "}
                {content.location.address}{" "}
                {content.location?.detailAddress || ""}
              </div>
              {content.websiteLink && (
                <DefaultLink
                  href={content.websiteLink}
                  className="text-skyblue-01 text-body3 break-words overflow-wrap-normal"
                >
                  {content.websiteLink}
                </DefaultLink>
              )}
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
          <ReviewTab content={content} />
        )}
      </main>
    </>
  );
};

export default DetailContent;
