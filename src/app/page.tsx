import Divider from "@/components/Divider";
import Header from "@/components/Header";
import LinkableTab from "@/components/LinkableTab";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import MainCarousel from "@/components/Carousel/MainCarousel";
import SoonOpenContentSection from "./_ui/SoonOpenContentSection";
import SoonEndContentSection from "./_ui/SoonEndContentSection";
import HotStyleSection from "./_ui/HotStyleSection";
import HotAgeSection from "./_ui/HotAgeSection";
import { getSoonOpenContentsForServer } from "./_hooks/getSoonOpenContents";
import { getSoonEndContentsForServer } from "./_hooks/getSoonEndContents";
import { getBanners } from "./_hooks/getBanners";
import { getHotContentsForServer } from "./_hooks/getHotContents";
import ReviewCard from "../components/Card/ReviewCard";
import { getHotReview } from "./_hooks/getHotReviews";
import LeftOption from "@/components/Header/LeftOption";
import RightOption from "@/components/Header/RightOption";
import HotPlaceSection from "./_ui/HotPlaceSection";
import { useEffect } from "react";

const Home = async () => {
  const { contentList: soonOpenContents } =
    await getSoonOpenContentsForServer();
  const { contentList: soonEndContents } = await getSoonEndContentsForServer();
  const { bannerList } = await getBanners();
  const hotContentList = await getHotContentsForServer();
  const reviews = await getHotReview();

  console.log(reviews);

  return (
    <>
      <Header checkUserAgent={true}>
        <LeftOption logo />
        <RightOption option={{ search: true, like: true }} />
      </Header>
      {/* 높이 값을 주면 마진 만큼 비어있는 공간으로 남게됨: 이유는 모름 */}
      <main className="mb-[48px]">
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

        {reviews.length ? (
          <>
            <Divider height="8px" width="100%" margin="24px 0" />

            <section className="mb-[24px] text-h2">
              <h2 className="pl-[24px] mb-[8px]">최근 인기 리뷰</h2>
              <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </CustomScrollContainer>
            </section>
          </>
        ) : null}
      </main>
      <LinkableTab shadow />
    </>
  );
};

export default Home;
