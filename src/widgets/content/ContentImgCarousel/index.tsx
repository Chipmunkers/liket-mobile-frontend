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
      onClickImg={(path) => {
        stackRouterPush(router, {
          path: `/img-detail?path=${path}`,
          screen: WEBVIEW_SCREEN.IMG_DETAIL,
        });
      }}
      imgAlt="컨텐츠 이미지"
    />
  );
};

export default ContentImgCarousel;
