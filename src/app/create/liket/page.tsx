"use client";

import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { CreateLiketTemplate } from "../../../../fsd_src/widgets/create-liket/uis/CreateLiketTemplate";
import useCreateLiket from "./_hooks/useCreateLiket";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";
import { useGetReview } from "./_hooks/useGetReview";
import { AxiosError } from "axios";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import ContentNotFound from "@/app/contents/[idx]/_ui/ContentNotFound";

export default function Page({
  searchParams: { review },
}: {
  searchParams: { review: string };
}) {
  const router = useRouter();

  const { mutate: createLiket } = useCreateLiket(review, {
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/likets`,
        screen: WEBVIEW_SCREEN.REQUESTED_CONTENT_DETAIL,
        isStack: false,
      });
    },
    onError: () => {
      customToast("라이켓 제작에 실패했어요");
    },
  });

  const { data: reviewData, error } = useGetReview(review);

  if (!review || !reviewData) {
    return <></>;
  }

  if ((error as AxiosError)?.response?.status === 404) {
    return (
      <>
        <Header>
          <HeaderLeft
            option={{
              back: true,
            }}
          />
          <HeaderRight
            option={{
              search: {},
            }}
          />
        </Header>
        <ContentNotFound />
      </>
    );
  }

  return (
    <CreateLiketTemplate
      liketInformation={{
        bgImgPath: "",
        imgShapes: [],
        description: "",
        size: 1,
      }}
      onSave={(data) => {
        createLiket(data);
      }}
      reviewData={{
        author: reviewData.author,
        starRating: reviewData.starRating,
        visitTime: reviewData.visitTime,
        title: reviewData.cultureContent.title,
        genre: reviewData.cultureContent.genre.name,
      }}
    />
  );
}
