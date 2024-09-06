"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DateAndTime } from "./_types/DateAndTime";
import DateDrawer from "./_ui/DateDrawer";
import TimeDrawer from "./_ui/TimeDrawer";
import useCheckLoginUser from "./_hooks/useCheckLoginUser";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useEditReview } from "./_hooks/useEditReview";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import EditReviewForm from "@/app/edit/review/[idx]/_ui/EditReviewForm";
import { useGetReviewByIdx } from "@/app/edit/review/[idx]/_hooks/useGetReviewByIdx";

interface PageProps {
  params: {
    idx: string;
  };
}

export default function Page({ params: { idx } }: PageProps) {
  const router = useRouter();

  // * State
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [isTimeDrawerOpen, setIsTimeDrawerOpen] = useState(false);
  const [uploadedImgs, setUploadedImgs] = useState<string[]>([]);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState("");
  const [dateInfo, setDateInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const [timeInfo, setTimeInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });

  // * Hooks
  const { mutate: writeReview } = useEditReview({
    onSuccess: () => {
      // TODO: 리뷰 자세히보기 페이지 구현 후 연결 필요
    },
  });

  useCheckLoginUser();
  const { data: review } = useGetReviewByIdx(idx);

  // * Handle

  const handleWriteReview = () => {
    const date = dateInfo.selected;
    const time = timeInfo.selected;

    if (date && time) {
      const extractedDate = date.format("YYYY-MM-DD");
      const extractedTime = time.format("HH:mm:ss");

      const visitTime = new Date(`${extractedDate}T${extractedTime}.000Z`);

      visitTime.setHours(
        visitTime.getHours() + visitTime.getTimezoneOffset() / 60
      );

      writeReview({
        idx: Number(idx),
        imgList: uploadedImgs,
        description: description,
        starRating: starRating,
        visitTime: visitTime.toISOString(),
      });
    }
  };

  const { safeArea } = useGetSafeArea();

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: { onClick: () => stackRouterBack(router) },
          }}
        />
        <HeaderMiddle text="작성" />
        <HeaderRight
          option={{
            check: {
              disabled: !(
                description.length > 1 &&
                starRating > 0 &&
                uploadedImgs.length >= 0 &&
                dateInfo.selected &&
                dateInfo.selected
              ),
              onClick: handleWriteReview,
            },
          }}
        />
      </Header>
      <main
        className="px-[24px] pt-[16px]"
        style={{
          paddingBottom: safeArea.bottom + "px",
        }}
      >
        {review && (
          <EditReviewForm
            review={review}
            starRating={starRating}
            setStarRating={setStarRating}
            description={description}
            setDescription={setDescription}
            setTimeInfo={setTimeInfo}
            setDateInfo={setDateInfo}
            dateInfo={dateInfo}
            timeInfo={timeInfo}
            setIsDateDrawerOpen={setIsDateDrawerOpen}
            setIsTimeDrawerOpen={setIsTimeDrawerOpen}
            uploadedImgs={uploadedImgs}
            setUploadedImgs={setUploadedImgs}
          />
        )}
      </main>

      {/* 방문 날짜 */}
      <DateDrawer
        isOpen={isDateDrawerOpen}
        setIsOpen={setIsDateDrawerOpen}
        date={dateInfo}
        setDate={setDateInfo}
      />

      {/* 방문 시간 */}
      <TimeDrawer
        isOpen={isTimeDrawerOpen}
        setIsOpen={setIsTimeDrawerOpen}
        time={timeInfo}
        setTime={setTimeInfo}
      />
    </>
  );
}
