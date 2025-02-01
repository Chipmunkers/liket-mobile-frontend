import SoonOpenContentSection from "./_ui/SoonOpenContentSection";
import SoonEndContentSection from "./_ui/SoonEndContentSection";
import HotStyleSection from "./_ui/HotStyleSection";
import HotAgeSection from "./_ui/HotAgeSection";
import { getSoonOpenContentsForServer } from "./_hooks/getSoonOpenContents";
import { getSoonEndContentsForServer } from "./_hooks/getSoonEndContents";
import { getBanners } from "./_hooks/getBanners";
import { getHotContentsForServer } from "./_hooks/getHotContents";
import { getHotReview } from "./_hooks/getHotReviews";
import HotPlaceSection from "./_ui/HotPlaceSection";
import BottomTab from "@/widgets/common/BottomTab";
import Header from "@/shared/ui/Header/Header";
import { HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import MainBannerCarousel from "@/app/_ui/MainBannerCarousel";
import { shuffle } from "@/shared/helpers/shuffle";
import HotReviewSection from "@/app/_ui/HotReviewSection";
import { MainFooter } from "@/app/_ui/MainFooter";
import InterestingTagAlert from "@/app/_ui/InterestingTag";

const Home = async () => {
  const { contentList: soonOpenContents } =
    await getSoonOpenContentsForServer();
  const { contentList: soonEndContents } = await getSoonEndContentsForServer();
  const { bannerList } = await getBanners();
  const hotContentList = await getHotContentsForServer();
  const reviews = await getHotReview();

  return (
    <>
      <Header checkUserAgent={true}>
        <HeaderLeft logo />
        <HeaderRight option={{ search: true, like: true }} />
      </Header>
      <main className="pb-[48px]">
        {/* 배너 */}
        <MainBannerCarousel bannerList={bannerList} />

        {/* 인기 스타일  문화생활 컨텐츠*/}
        <HotStyleSection />

        {/* 인기 연령대 문화생활 컨텐츠 */}
        <HotAgeSection />

        <Divider height="8px" width="100%" />

        {/* 핫플 차트 */}
        <HotPlaceSection contentList={hotContentList} />

        <Divider height="8px" width="100%" />

        {/* 오픈 예정 컨텐츠 */}
        <SoonOpenContentSection contentList={shuffle(soonOpenContents)} />

        {/* 종료 예정 컨텐츠 */}
        <SoonEndContentSection
          contentList={shuffle(soonEndContents)}
          reviewLength={reviews.length}
        />

        {reviews.length && <HotReviewSection reviews={reviews} />}
        <Divider height="8px" width="100%" />
        <div className="mt-[16px]">
          <MainFooter />
        </div>
      </main>
      <BottomTab shadow={true} />
      <InterestingTagAlert />
    </>
  );
};

export default Home;
