"use client";

import { useRouter } from "next/navigation";
import useEditLiket from "../../../../fsd_src/widgets/create-liket/apis/useEditLiket";
import useGetLiket from "../../../../fsd_src/widgets/create-liket/apis/useGetLiket";
import { CreateLiketTemplate } from "../../../../fsd_src/widgets/create-liket/uis/CreateLiketTemplate";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

export default function Page({
  searchParams: { liket },
}: {
  searchParams: { liket: string };
}) {
  const router = useRouter();

  const { data } = useGetLiket(liket);
  const { mutate: editLiket } = useEditLiket(liket, {
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/likets`,
        screen: WEBVIEW_SCREEN.LIKET_LIST,
        isStack: false,
      });
    },
  });

  if (!liket || !data) {
    return <></>;
  }

  return (
    <CreateLiketTemplate
      liketInformation={{
        bgImgPath: data.bgImgPath,
        bgImgInfo: data.bgImgInfo,
        imgShapes: data.imgShapes,
        textShape: data.textShape,
        size: data.size,
        description: data.description,
      }}
      reviewData={{
        author: data.author,
        title: data.cultureContent.title,
        genre: data.cultureContent.genre.name,
        starRating: data.review.starRating,
        visitTime: data.review.visitTime,
      }}
      onSave={(data) => {
        editLiket(data);
      }}
    />
  );
}
