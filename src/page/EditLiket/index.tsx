"use client";

import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useQueryClient } from "@tanstack/react-query";
import useGetLiket from "./hooks/useGetLiket";
import useEditLiket from "./hooks/useEditLiket";
import { CreateLiketTemplate } from "@/widgets/content/CreateLiketTemplate/CreateLiketTemplate";

interface Props {
  liketIdx: string;
}

export default function EditLiketPage({ liketIdx }: Props) {
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
