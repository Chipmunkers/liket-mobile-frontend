"use client";

import { useRouter } from "next/navigation";
import useEditLiket from "../../../../fsd_src/widgets/liket/apis/useEditLiket";
import useGetLiket from "../../../../fsd_src/widgets/liket/apis/useGetLiket";
import { CreateLiketTemplate } from "../../../../fsd_src/widgets/liket/uis/CreateLiketTemplate";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useQueryClient } from "@tanstack/react-query";

export default function Page({
  searchParams: { liketIdx },
}: {
  searchParams: { liketIdx: string };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useGetLiket(liketIdx);
  const { mutate: editLiket } = useEditLiket(liketIdx, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["liket", liketIdx],
      });
      stackRouterPush(router, {
        path: `/likets`,
        screen: WEBVIEW_SCREEN.LIKET_LIST,
        isStack: false,
      });
    },
  });

  if (!liketIdx || !data) {
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
