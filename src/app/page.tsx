import Divider from "@/components/Divider";
import Header from "@/components/Header";
import LinkableTab from "@/components/LinkableTab";
import RightArrow from "@/icons/right-arrow.svg";
import { colors } from "@/utils/style";
import Link from "next/link";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import HotPlaceListItem from "@/components/HotplaceListItem";
import MainCarousel from "@/components/Carousel/MainCarousel";
import SoonOpenContentSection from "./_components/SoonOpenContentSection";
import SoonEndContentSection from "./_components/SoonEndContentSection";
import HotStyleSection from "./_components/HotStyleSection";
import HotAgeSection from "./_components/HotAgeSection";
import { getSoonOpenContentsForServer } from "./_hooks/getSoonOpenContents";
import { getSoonEndContentsForServer } from "./_hooks/getSoonEndContents";
import { getBanners } from "./_hooks/getBanners";
import { getHotContentsForServer } from "./_hooks/getHotContents";
import ReviewCard from "../components/Card/ReviewCard";
import { getHotReview } from "./_hooks/getHotReviews";
import dayjs from "dayjs";
import LeftOption from "@/components/Header/LeftOption";
import RightOption from "@/components/Header/RightOption";
import { headers } from "next/headers";
import { ScreenTYPE, stackRouterPush } from "../utils/stackRouter";
import { useRouter } from "next/navigation";
import HotPlaceSection from "./_components/HotPlaceSection";

const Home = async () => {
  const { contentList: soonOpenContents } =
    await getSoonOpenContentsForServer();
  const { contentList: soonEndContents } = await getSoonEndContentsForServer();
  const { bannerList } = await getBanners();
  const hotContentList = await getHotContentsForServer();
  const reviews = await getHotReview();

  return (
    <>
      <Header
        checkUserAgent={true}
        userAgent={headers().get("user-agent") || ""}
      >
        <LeftOption logo />
        <RightOption option={{ search: true, like: true }} />
      </Header>
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
      <LinkableTab shadow />
    </>
  );
};

export default Home;
