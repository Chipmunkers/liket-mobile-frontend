"use client";

import { useRouter } from "next/navigation";
import { Props } from "./types";
import ImgCarousel from "@/shared/ui/ImgCarousel";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const ContentImgCarousel = ({ list }: Props) => {
  const router = useRouter();

  return (
    <ImgCarousel
      imgList={list}
      onClickImg={(path, i) => {
        stackRouterPush(router, {
          path:
            `/img-detail?select=${i}&` +
            list.map((path) => `path=${path}`).join("&"),
          screen: WEBVIEW_SCREEN.IMG_DETAIL,
        });
      }}
      imgAlt="컨텐츠 이미지"
    />
  );
};

export default ContentImgCarousel;
