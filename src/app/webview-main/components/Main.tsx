"use client";

import Divider from "@/components/Divider";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import MainCarousel from "@/components/Carousel/MainCarousel";
import HotStyleSection from "../../_components/HotStyleSection";
import HotAgeSection from "../../_components/HotAgeSection";
import HotPlaceSection from "../../_components/HotPlaceSection";
import SoonOpenContentSection from "../../_components/SoonOpenContentSection";
import SoonEndContentSection from "../../_components/SoonEndContentSection";
import ReviewCard from "../../../components/Card/ReviewCard";
import {
  HotContentEntity,
  SummaryContentEntity,
} from "../../../types/api/culture-content";
import { BannerListItem } from "../../../types/banner";
import { ReviewEntity } from "../../../types/api/review";

const WebviewMain = (props: {
  soonOpenContents: SummaryContentEntity[];
  soonEndContents: SummaryContentEntity[];
  bannerList: BannerListItem[];
  hotContentList: HotContentEntity[];
  reviews: ReviewEntity[];
}) => {
  const {
    soonOpenContents,
    soonEndContents,
    bannerList,
    hotContentList,
    reviews,
  } = props;

  return (
    <>
      <main className="mb-[40px]">
        {/* 배너 */}
        <MainCarousel list={bannerList.map(({ imgPath }) => imgPath)} />

        {/* 인기 스타일  문화생활 컨텐츠*/}
        <HotStyleSection />

        {/* 인기 연령대 문화생활 컨텐츠 */}
        <HotAgeSection />

        <Divider height="8px" width="100%" margin="24px 0" />

        {/* 핫플 차트 */}
        <HotPlaceSection contentList={hotContentList} />

        <Divider height="8px" width="100%" margin="24px 0" />

        {/* 오픈 예정 컨텐츠 */}
        <SoonOpenContentSection contentList={soonOpenContents} />

        {/* 종료 예정 컨텐츠 */}
        <SoonEndContentSection contentList={soonEndContents} />

        <Divider height="8px" width="100%" margin="24px 0" />

        <section className="mb-[24px] text-h2">
          <h2 className="pl-[24px] mb-[8px]">최근 인기 리뷰</h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </CustomScrollContainer>
        </section>
      </main>
    </>
  );
};

export default WebviewMain;
