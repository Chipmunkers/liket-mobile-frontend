"use client";

import SkeletonItem from "@/shared/ui/SkeletonItem";
import { useGetInquiryByIdx } from "./_hooks/useGetInquiryByIdx";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import InquirySkeleton from "@/app/inquiries/[idx]/_ui/InquirySkeleton";
import InquiryCardSmall from "@/entities/inquiry/InquiryCardSmall";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import DefaultImg from "@/shared/ui/DefaultImg";
import Divider from "@/shared/ui/Divider";
import { classNames } from "@/shared/helpers/classNames";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function page({ params: { idx } }: PageProps) {
  const { data: inquiry } = useGetInquiryByIdx(Number(idx));

  if (!inquiry) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderMiddle text="문의내역" />
        </Header>
        <main className="boxShadow h-fit">
          <InquirySkeleton />
        </main>
      </>
    );
  }

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="문의내역" />
      </Header>
      <main>
        <section className="px-[24px]">
          <InquiryCardSmall
            inquiry={{ ...inquiry, isAnswered: !!inquiry.answerList[0] }}
          />
          <div className="py-[16px] border-b-[1px] border-b-grey-01">
            <div className="text-body3 h-[112px]">{inquiry.contents}</div>
          </div>
        </section>
        <section className="mt-[16px]">
          <CustomScrollContainer className="flex flex-row gap-[8px] w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {inquiry.imgList.map((imgPath) => (
              <div className="w-[80px] h-[80px] relative border-[1px] border-grey-02">
                <DefaultImg src={imgPath} alt="" />
              </div>
            ))}
          </CustomScrollContainer>
        </section>
        <Divider width="100%" height="8px" margin="24px 0px" />
        <section className="px-[24px]">
          <div className="text-h2">답변</div>
          <div
            className={classNames(
              "py-[16px] border-y-[1px] border-grey-01 mt-[8px] min-h-[132px]",

              inquiry.answerList[0] ? "" : "flex items-center justify-center"
            )}
          >
            {inquiry.answerList[0] ? (
              inquiry.answerList[0].contents
            ) : (
              <span className="text-body4 text-grey-03">
                아직 답변중입니다!
              </span>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
