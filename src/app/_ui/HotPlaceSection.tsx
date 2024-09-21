"use client";

import RightArrow from "@/icons/right-arrow.svg";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import { HotContentEntity } from "@/shared/types/api/content/HotContentEntity";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { colors } from "@/shared/style/color";
import ContentCardXSmall from "@/entities/content/ContentCardXSmall";

const HotPlaceSection = (props: { contentList: HotContentEntity[] }) => {
  const { contentList } = props;
  const router = useRouter();

  return (
    <section className="my-[24px]">
      <div className="pl-[24px] flex flex-row mb-[8px]">
        <h2 className="text-h2">핫플차트</h2>
        <div className="text-body5 text-grey-04 flex flex-col-reverse ml-[8px]">{`업로드 ${dayjs(
          new Date()
        ).format("YYYY.MM.DD HH:00")}`}</div>
      </div>
      <CustomScrollContainer className="flex flex-row gap-[8px] w-[100%] overflow-x-hidden [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
        {contentList.map(({ idx, name, contentList }) => {
          return (
            <div key={idx}>
              <Link
                href={`/search?genre=${idx}&open=true&orderby=like`}
                className="flex items-center mb-[9px]"
                onClick={(e) => {
                  e.preventDefault();

                  stackRouterPush(router, {
                    path: `/search?genre=${idx}&open=true&orderby=like`,
                    screen: WEBVIEW_SCREEN.SEARCH,
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
                      <li className="flex w-[256px] py-[8px]" key={content.idx}>
                        <div className="text-numbering1 mr-[18px] center align-middle">
                          {index + 1}
                        </div>
                        <ContentCardXSmall content={content} />
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
