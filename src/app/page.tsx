import { ContentCard } from "@/components/Card/ContentCard";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import LinkableTab from "@/components/LinkableTab";
import RightArrow from "@/icons/right-arrow.svg";
import { colors } from "@/utils/style";
import Link from "next/link";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import {
  getHotAgeContents,
  getHotPlaces,
  getHotStyleContents,
  getSoonEndContents,
  getSoonOpenContents,
} from "@/apis/content";
import { Else, If, Then } from "react-if";
import HotPlaceListItem from "@/components/HotplaceListItem";
import { getBannerList } from "@/apis/banner";
import MainCarousel from "@/components/Carousel/MainCarousel";

export default async function Home() {
  const { contentList: soonOpenContents } = await getSoonOpenContents();
  const { contentList: soonEndContents } = await getSoonEndContents();
  const { contentList: hotAgeContents, age } = await getHotAgeContents();
  const { contentList: hotStyleContents, style } = await getHotStyleContents();
  const { bannerList } = await getBannerList();
  const hotPlaces = await getHotPlaces();

  return (
    <>
      <Header>
        <Header.LeftOption logo />
        {/* <Header.RightOption option={{ search: true, like: true }} /> */}
      </Header>
      <main>
        <MainCarousel list={bannerList.map(({ imgPath }) => imgPath)} />

        {/* <Carousel list={bannerList.map(({ imgPath }) => imgPath)} /> */}
        <section className="mb-[48px] mt-[24px]">
          <h2 className="pl-[24px] mb-[8px]">
            선선한 가을 날씨에{" "}
            <span className="text-skyblue-01">#{style.name}</span>
            하기 좋은 곳 🍁
          </h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            <If condition={hotStyleContents.length >= 1}>
              <Then>
                {hotStyleContents.map((data, idx) => {
                  return <ContentCard key={idx} {...data} />;
                })}
              </Then>
              <Else>
                <div className="text-body5 text-grey-04 ml-[24px]">
                  컨텐츠가 없습니다.
                </div>
              </Else>
            </If>
          </CustomScrollContainer>
        </section>
        <section>
          <h2 className="pl-[24px] mb-[8px]">
            요즘 <span className="text-skyblue-01">#{age.name}</span> Z세대가
            주목하는 곳 ✨
          </h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            <If condition={hotAgeContents.length >= 1}>
              <Then>
                {hotAgeContents.map((data, idx) => {
                  return <ContentCard key={idx} {...data} />;
                })}
              </Then>
              <Else>
                <div className="text-body5 text-grey-04 ml-[24px]">
                  컨텐츠가 없습니다.
                </div>
              </Else>
            </If>
          </CustomScrollContainer>
        </section>
        <Divider height="8px" width="100%" margin="24px 0" />
        <section>
          <div className="pl-[24px] flex flex-row mb-[8px]">
            <h2>핫플차트</h2>
            <div className="text-body5 text-grey-04 flex flex-col-reverse ml-[8px]">{`업로드 Date`}</div>
          </div>
          <CustomScrollContainer className="flex flex-row overflow-x-hidden gap-[8px] overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {hotPlaces.map(({ idx, name, contentList }) => {
              return (
                <div key={idx}>
                  <Link
                    href="/category?type=팝업스토어&orderby=famous"
                    className="flex item-center"
                  >
                    <div className="text-skyblue-01 text-body4 w-[200px]">
                      {name}
                    </div>
                    <RightArrow
                      fill={colors.skyblue["01"]}
                      style={{
                        display: "inline",
                      }}
                    />
                  </Link>
                  {contentList.length === 0 ? (
                    <div className="text-body5 text-grey-04 mt-[8px]">
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
        <section className="mb-[48px]">
          <h2 className="pl-[24px] mb-[8px]">오픈예정 컨텐츠</h2>
          <If condition={soonOpenContents.length > 0}>
            <Then>
              <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
                {soonOpenContents.map((data, index) => {
                  return (
                    <ContentCard key={index} {...data} status="willActive" />
                  );
                })}
              </CustomScrollContainer>
            </Then>
            <Else>
              <div className="text-body5 text-grey-04 ml-[24px]">
                컨텐츠가 없습니다.
              </div>
            </Else>
          </If>
        </section>
        <section className="mb-[18px]">
          <h2 className="pl-[24px] mb-[8px]">종료예정 컨텐츠</h2>
          <If condition={soonEndContents.length > 0}>
            <Then>
              <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
                {soonEndContents.map((data, index) => {
                  return <ContentCard key={index} {...data} />;
                })}
              </CustomScrollContainer>
            </Then>
            <Else>
              <div className="text-body5 text-grey-04 ml-[24px]">
                컨텐츠가 없습니다.
              </div>
            </Else>
          </If>
        </section>
        {/* <Divider height="8px" width="100%" margin="24px 0" />
        <section className="mb-[24px]">
          <h2 className="pl-[24px] mb-[8px]">최근 인기 리뷰</h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {REVIEW_CARDS_DUMMY.map((data, index) => {
              return <ReviewCard key={index} {...data} />;
            })}
          </CustomScrollContainer>
        </section> */}
      </main>
      <LinkableTab shadow />
    </>
  );
}
