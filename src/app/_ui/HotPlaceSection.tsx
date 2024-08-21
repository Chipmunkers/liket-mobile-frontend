"use client";

import RightArrow from "@/icons/right-arrow.svg";
import { colors } from "@/utils/style";
import Link from "next/link";
import HotPlaceListItem from "@/components/HotplaceListItem";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { HotContentEntity } from "../../types/api/culture-content";
import { ScreenTYPE, stackRouterPush } from "../../utils/stackRouter";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";

const HotPlaceSection = (props: { contentList: HotContentEntity[] }) => {
  const { contentList } = props;
  const router = useRouter();

  return (
    <section>
      <div className="pl-[24px] flex flex-row mb-[8px]">
        <h2 className="text-h2">핫플차트</h2>
        <div className="text-body5 text-grey-04 flex flex-col-reverse ml-[8px]">{`업로드 ${dayjs(
          new Date()
        ).format("YYYY.MM.DD HH:00")}`}</div>
      </div>
      <CustomScrollContainer className="flex flex-row gap-[8px] w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
        {contentList.map(({ idx, name, contentList }) => {
          return (
            <div key={idx}>
              <Link
                href={`/search?genre=${idx}&open=true&orderby=like`}
                className="flex item-center"
                onClick={(e) => {
                  e.preventDefault();

                  stackRouterPush(router, {
                    path: `/search?genre=${idx}&open=true&orderby=like`,
                    screen: ScreenTYPE.SEARCH,
                  });
                }}
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
                  {contentList.map((content, index) => {
                    return (
                      <li
                        className="flex my-[13px] w-[256px]"
                        key={content.idx}
                      >
                        <div className="text-numbering1 mr-[18px] center align-middle">
                          {index + 1}
                        </div>
                        <HotPlaceListItem {...content} />
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
  );
};

export default HotPlaceSection;
