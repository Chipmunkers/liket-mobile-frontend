"use client";

import { ContentEntity } from "../../types/api/culture-content";
import Badge, { variantToText } from "@/components/Badge/Badge";
import CategoryTab from "@/components/CategoryTab";
import Divider from "@/components/Divider";
import { colors } from "@/utils/style";
import Link from "next/link";
import ParkingIcon from "@/icons/parking.svg";
import ReservationIcon from "@/icons/reservation.svg";
import PetIcon from "@/icons/pet.svg";
import EntranceFeeIcon from "@/icons/entrance-fee.svg";
import RightArrowIcon from "@/icons/right-arrow.svg";
import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import ThumbIcon from "@/icons/thumb.svg";
import dayjs from "dayjs";
import KaKaoMap from "@/components/KaKaoMap";
import { getStatus } from "@/utils/helpers";
import ContentCarousel from "@/components/Carousel/ContentCarousel";
import ContentLikeBtn from "@/components/ContentLikeBtn";
import { useState } from "react";
import { useGetCultureContentByIdx } from "../../service/culture-content/hooks";
import ContentDetailInformation from "../ContentDetailInformation";

const DetailContent = (props: { content: ContentEntity }) => {
  const [selectedTab, setSelectedTab] = useState<"상세정보" | string>(
    "상세정보"
  );

  const { data: content } = useGetCultureContentByIdx(
    props.content.idx,
    props.content
  );

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
          <Badge variant={"hotplace"}>{variantToText["hotplace"]}</Badge>
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
            <ContentLikeBtn
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
              className="text-skyblue-01 text-body3"
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
        list={["상세정보", `리뷰 ${content.reviewCount}`]}
        selectedTab={selectedTab}
        onClickTab={() => {}}
        wrapperStyle={{
          marginTop: "8px",
        }}
      />
      {selectedTab === "상세정보" ? (
        <ContentDetailInformation content={content} />
      ) : (
        <>
          <div className="flex flex-col items-center mt-[16px] mb-[24px] justify-between">
            <div>
              <StarRating value={4} readOnly />
            </div>
            <div className="text-numbering1 mt-[16px]">
              4.0 <span className="text-grey-02">/ 5.0</span>
            </div>
          </div>
          <Divider width="100%" height="8px" />

          <div className="mt-[8px]">
            <button className="flex text-button3 justify-end w-[100%] pr-[24px]">
              최신순
              <BottomArrowIcon />
            </button>
            <ul>
              {[1, 2, 3, 4, 5].map((tempId) => {
                return (
                  <li
                    key={tempId}
                    className="border-solid border-b-[1px] border-grey-01"
                  >
                    <div className="px-[24px] py-[16px]">
                      <div className="flex justify-between">
                        <div className="flex mb-[8px]">
                          <div className="w-[18px] h-[18px] mr-[4px] rounded-full relative overflow-hidden">
                            <Image
                              src={"/icons/default-avatar.svg"}
                              alt="아바타 이미지"
                              fill
                              objectFit="cover"
                            />
                          </div>
                          <div className="text-body2">jjjuuu_a</div>
                        </div>
                        <button className="text-numbering2 text-skyblue-01 flex">
                          <ThumbIcon /> <span className="ml-[4px]">23</span>
                        </button>
                      </div>
                      <div className="flex justify-between mb-[9px]">
                        <div className="w-[90px] h-[16px]">
                          <StarRating readOnly value={3} />
                        </div>
                        <span className="text-body5 text-grey-04">
                          2023.09.09
                        </span>
                      </div>
                      <div className="text-body3 mt-[8px]">
                        아직 안가신분들 다들 꼭꼭 예약하세요!! 저번에 예약을
                        안해서 못 들어갔는데 이번엔 시간 맞춰서 입장 성공했어요!
                        팡법스토어 너무 예뻐서 사진 200장은 찍은 것 같아요
                        ㅎㅎㅎ!!
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default DetailContent;
