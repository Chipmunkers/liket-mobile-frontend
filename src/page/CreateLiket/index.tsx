"use client";

import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";
import { AxiosError } from "axios";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import ContentNotFound from "@/app/contents/[idx]/_ui/ContentNotFound";
import useCreateLiket from "./hooks/useCreateLiket";
import { useGetReview } from "./hooks/useGetReview";
import { CreateLiketTemplate } from "@/widgets/content/CreateLiketTemplate/CreateLiketTemplate";

export default function CreateLiketPage({ review }: { review: string }) {
  const router = useRouter();

  const { mutate: createLiket } = useCreateLiket(review, {
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/likets`,
        screen: WEBVIEW_SCREEN.LIKET_LIST,
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
