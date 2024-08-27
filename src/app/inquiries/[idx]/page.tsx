"use client";

import { useGetInquiryByIdx } from "./_hooks/useGetInquiryByIdx";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import InquirySkeleton from "@/app/inquiries/[idx]/_ui/InquirySkeleton";
import InquiryCardSmall from "@/entities/inquiry/InquiryCardSmall";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import DefaultImg from "@/shared/ui/DefaultImg";
import Divider from "@/shared/ui/Divider";
import { classNames } from "@/shared/helpers/classNames";
import { ButtonBase } from "@mui/material";
import { useDeleteInquiryByIdx } from "@/app/inquiries/[idx]/_hooks/useDeleteInquiryByIdx";
import useModalStore from "@/shared/store/modalStore";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function page({ params: { idx } }: PageProps) {
  const openModal = useModalStore(({ openModal }) => openModal);

  const { data: inquiry, error } = useGetInquiryByIdx(Number(idx));
  const { mutate: deleteInquiryByIdx } = useDeleteInquiryByIdx();

  if (error?.response?.status === 404 || error?.response?.status === 400) {
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
        <main className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-h1">문의내역을 찾을 수 없습니다.</span>
            <span className="text-body3 text-grey-04 mt-[16px]">
              존재하지 않거나
            </span>
            <span className="text-body3 text-grey-04">
              삭제된 문의내역입니다.
            </span>
          </div>
        </main>
      </>
    );
  }

  if (inquiry) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderMiddle text="문의내역" />
          <ButtonBase
            className="w-[48px] h-[48px] text-rosepink-01 text-body3 mr-[12px] rounded-full"
            onClick={() => {
              openModal("DeleteModal", {
                onClickPositive() {
                  deleteInquiryByIdx(Number(idx));
                },
              });
            }}
          >
            삭제
          </ButtonBase>
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
              {inquiry.imgList.map((imgPath, i) => (
                <div
                  className="w-[80px] h-[80px] relative border-[1px] border-grey-02"
                  key={`image-${i}`}
                >
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
              {inquiry.answerList[0] && inquiry.answerList[0].contents}
            </div>
          </section>
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
        <InquirySkeleton />
      </main>
    </>
  );
}
