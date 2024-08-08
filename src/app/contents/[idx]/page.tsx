import Badge, { variantToText } from "@/components/Badge/Badge";
import CategoryTab from "@/components/CategoryTab";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import Like from "@/icons/like.svg";
import FilledLike from "@/icons/like-filled.svg";
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
import { getContentDetailInformation } from "@/apis/content";
import dayjs from "dayjs";
import KaKaoMap from "@/components/KaKaoMap";
import { getStatus } from "@/utils/helpers";
import ContentCarousel from "@/components/Carousel/ContentCarousel";
import ContentLikeBtn from "../../../components/ContentLikeBtn";
interface PageProps {
  params: {
    idx: string;
  };
}

export default async function Page({ params: { idx } }: PageProps) {
  const selectedTab = "상세정보";
  const {
    title,
    description,
    thumbnail,
    imgList,
    genre,
    style,
    age,
    location: {
      region1Depth,
      region2Depth,
      address,
      detailAddress,
      positionX,
      positionY,
    },
    startDate,
    endDate,
    likeState,
    openTime,
    websiteLink,
    isFee,
    isReservation,
    isPet,
    isParking,
    likeCount,
    reviewCount,
    avgStarRating,
    createdAt,
    acceptedAt,
  } = await getContentDetailInformation(idx);

  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: true,
          }}
        />
        {/* <Header.RightOption
          option={{
            search: {
              // onClick: () => {},
            },
          }}
        /> */}
      </Header>
      <main className="mb-[24px]">
        <ContentCarousel list={imgList} />
        <div className="px-[24px] py-[24px]">
          <div className="flex items-center">
            <Badge
              variant={getStatus(startDate, endDate)}
              style={{ marginRight: "9px" }}
            >
              {variantToText[getStatus(startDate, endDate)]}
            </Badge>
            <Badge variant={"hotplace"}>{variantToText["hotplace"]}</Badge>
          </div>
          <div className="mt-[16px]">
            <div className="flex justify-between">
              <div>
                <h1 className="mb-[4px]">{title}</h1>
                <div className="text-body5 text-grey-04 mt-[4px] flex">
                  <div>{`#${genre.name} #${age.name} ${style
                    .map(({ name }) => "#" + name + " ")
                    .join("")}`}</div>
                </div>
              </div>
              <ContentLikeBtn
                likeState={likeState}
                idx={idx}
                likeCount={likeCount}
              />
            </div>
            <div className="mt-[16px]">
              <div className="text-body3">
                {dayjs(startDate).format("YYYY.MM.DD")} ~{" "}
                {dayjs(endDate).format("MM.DD")}
              </div>
              <div className="text-body3">{openTime}</div>
              <div className="text-body3">
                {region1Depth} {region2Depth} {address} {detailAddress}
              </div>
              <Link href={websiteLink} className="text-skyblue-01 text-body3">
                {websiteLink}
              </Link>
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
          list={["상세정보", `리뷰 ${reviewCount}`]}
          selectedTab={selectedTab}
          onClickTab={() => {}}
          wrapperStyle={{
            marginTop: "8px",
          }}
        />
        {selectedTab === "상세정보" ? (
          <>
            <div className="py-[16px] px-[24px] whitespace-pre-wrap w-[100%] text-center text-body3">
              {description}
            </div>
            <Divider width="100%" height="8px" />
            <div className="px-[24px] py-[24px] flex-col relative">
              <div className="text-h2">위치</div>
              <div className="text-grey-04 text-body5 mt-[7px] mb-[4px]">
                {region1Depth} {region2Depth} {address} {detailAddress}
              </div>
              <div className="h-[171px] w-[100%] bg-grey-02 flex">
                <KaKaoMap />
              </div>
              <button className="center absolute right-[24px] bottom-0 text-button4 text-skyblue-03">
                카카오맵에서 길찾기
                <RightArrowIcon fill={colors["skyblue"]["03"]} />
              </button>
            </div>
          </>
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
                          안해서 못 들어갔는데 이번엔 시간 맞춰서 입장
                          성공했어요! 팡법스토어 너무 예뻐서 사진 200장은 찍은
                          것 같아요 ㅎㅎㅎ!!
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
    </>
  );
}
