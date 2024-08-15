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

export default async function Home() {
  const { contentList: soonOpenContents } =
    await getSoonOpenContentsForServer();
  const { contentList: soonEndContents } = await getSoonEndContentsForServer();
  const { bannerList } = await getBanners();
  const hotContent = await getHotContentsForServer();
  const reviews = await getHotReview();

  return (
    <>
      <Header>
        <Header.LeftOption logo />
        <Header.RightOption option={{ search: true, like: true }} />
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
        <section>
          <div className="pl-[24px] flex flex-row mb-[8px]">
            <h2 className="text-h2">핫플차트</h2>
            <div className="text-body5 text-grey-04 flex flex-col-reverse ml-[8px]">{`업로드 ${dayjs(
              new Date()
            ).format("YYYY.MM.DD HH:00")}`}</div>
          </div>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {hotContent.map(({ idx, name, contentList }) => {
              return (
                <div key={idx}>
                  <Link
                    href={`/search?genre=${idx}&open=true&orderby=like`}
                    className="flex item-center"
                  >
                    <div className="text-skyblue-01 text-body4">{name}</div>
                    <RightArrow fill={colors.skyblue["01"]} />
                  </Link>
                  {contentList.length === 0 ? (
                    <div className="text-body5 text-grey-04 mt-[8px] w-[256px]">
                      컨텐츠가 없습니다.
                    </div>
                  ) : (
                    <ul>
                      {contentList.map((dummy, index) => {
                        return (
                          <li
                            className="flex my-[13px] w-[256px]"
                            key={dummy.idx}
                          >
                            <div className="text-numbering1 mr-[18px] center align-middle">
                              {index + 1}
                            </div>
                            <HotPlaceListItem {...dummy} />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </CustomScrollContainer>
        </section>

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
}
