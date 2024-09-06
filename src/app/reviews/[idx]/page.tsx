"use client";

import { useGetReviewByIdx } from "./_hooks/useGetReviewByIdx";
import PersonalReviewCard, {
  PersonalReviewCardSkeleton,
} from "@/entities/review/PersonalReviewCard";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { useRouter } from "next/navigation";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { ButtonBase } from "@mui/material";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useState } from "react";
import useModalStore from "@/shared/store/modalStore";
import Drawer from "@/shared/ui/Drawer";
import { useDeleteReview } from "./_hooks/useDeleteReview";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  const router = useRouter();
  const [isReviewMenuDrawerOpen, setIsReviewMenuDrawerOpen] = useState(false);
  const openModal = useModalStore(({ openModal }) => openModal);
  const { mutate: deleteReviewByIdx } = useDeleteReview({
    onSuccess() {
      stackRouterPush(router, {
        path: `/reviews?user=${review?.author.idx}`,
        screen: WEBVIEW_SCREEN.MY_REVIEW,
        isStack: false,
      });
    },
  });

  const { data: review } = useGetReviewByIdx(idx);

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="나의 리뷰" />
        <ButtonBase
          disableRipple
          className="icon-button w-[48px] h-[48px] mr-[12px]"
          onClick={() => setIsReviewMenuDrawerOpen(true)}
        >
          <MeatballIcon />
        </ButtonBase>
      </Header>
      <main className="px-[24px] mt-[16px]">
        {review ? (
          <PersonalReviewCard
            review={review}
            meatballButton={false}
            likeButton={true}
            descriptionClamp={true}
            onClickContents={() => {
              stackRouterPush(router, {
                path: `/contents/${review.cultureContent.idx}?tab=review&review=${review.idx}`,
              });
            }}
          />
        ) : (
          <PersonalReviewCardSkeleton />
        )}
        <Drawer
          open={isReviewMenuDrawerOpen}
          onClose={() => setIsReviewMenuDrawerOpen(false)}
        >
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                stackRouterPush(router, {
                  path: `/edit/review/${idx}`,
                  screen: WEBVIEW_SCREEN.EDIT_REVIEW,
                });
              }}
              className="bottom-sheet-button flex justify-start px-[24px]"
            >
              수정하기
            </ButtonBase>
          </li>
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                openModal("DeleteModal", {
                  onClickPositive() {
                    deleteReviewByIdx(Number(idx));
                  },
                });
              }}
              className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
            >
              삭제
            </ButtonBase>
          </li>
        </Drawer>
      </main>
    </>
  );
}
